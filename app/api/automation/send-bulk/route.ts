import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BulkEmailRequest {
  application_ids: string[];
  template_id: string;
  send_type: "immediate" | "scheduled";
  scheduled_at?: string;
  template_data?: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const body: BulkEmailRequest = await request.json();
    const { application_ids, template_id, send_type, scheduled_at, template_data } = body;

    // Validation
    if (!application_ids || application_ids.length === 0) {
      return NextResponse.json(
        { error: "No applications selected" },
        { status: 400 }
      );
    }

    if (!template_id) {
      return NextResponse.json(
        { error: "Template not selected" },
        { status: 400 }
      );
    }

    if (send_type === "scheduled" && !scheduled_at) {
      return NextResponse.json(
        { error: "Scheduled time not provided" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get template
    const { data: template, error: templateError } = await supabase
      .from("email_templates")
      .select("*")
      .eq("id", template_id)
      .single();

    if (templateError || !template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    // Get applications
    const { data: applications, error: appError } = await supabase
      .from("applications")
      .select(`
        id,
        full_name,
        email,
        status,
        jobs(title, location)
      `)
      .in("id", application_ids);

    if (appError || !applications || applications.length === 0) {
      return NextResponse.json(
        { error: "Applications not found" },
        { status: 404 }
      );
    }

    // Process emails
    let sentCount = 0;
    let scheduledCount = 0;
    const errors: any[] = [];

    for (const app of applications) {
      try {
        const mergedData = {
          applicantName: app.full_name,
          position: (app.jobs as any)?.title || "Position",
          location: (app.jobs as any)?.location || "Location",
          status: app.status,
          ...template_data,
        };

        const emailContent = populateTemplate(template.content, mergedData);
        const subject = populateTemplate(template.subject, mergedData);

        if (send_type === "immediate") {
          // Send immediately
          const emailResult = await resend.emails.send({
            from: "careers@unedp-global.org",
            to: app.email,
            subject: subject,
            html: emailContent,
          });

          if (emailResult.error) {
            errors.push({
              applicationId: app.id,
              email: app.email,
              error: emailResult.error.message,
            });
          } else {
            // Log the sent email
            await supabase.from("email_logs").insert({
              recipient_email: app.email,
              application_id: app.id,
              subject: subject,
              template_type: template.template_type,
              status: "sent",
            });

            sentCount++;
          }
        } else {
          // Schedule for later
          const scheduledDate = new Date(scheduled_at || new Date().toISOString());
          const { error: scheduleError } = await supabase
            .from("scheduled_emails")
            .insert({
              recipient_email: app.email,
              application_id: app.id,
              template_id: template.id,
              template_data: mergedData,
              scheduled_at: scheduledDate.toISOString(),
              status: "scheduled",
            });

          if (scheduleError) {
            errors.push({
              applicationId: app.id,
              email: app.email,
              error: scheduleError.message,
            });
          } else {
            scheduledCount++;
          }
        }
      } catch (error: any) {
        errors.push({
          applicationId: app.id,
          email: app.email,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `${send_type === "immediate" ? "Sent" : "Scheduled"} ${
        send_type === "immediate" ? sentCount : scheduledCount
      } email(s)`,
      sentCount,
      scheduledCount,
      totalAttempted: applications.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("[v0] Error in bulk email:", error);
    return NextResponse.json(
      { error: "Failed to process bulk email" },
      { status: 500 }
    );
  }
}

function populateTemplate(
  template: string,
  data: Record<string, any>
): string {
  let html = template;

  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    html = html.replace(regex, String(value || ""));
  });

  html = html.replace(/{{[^}]+}}/g, "");

  return html;
}
