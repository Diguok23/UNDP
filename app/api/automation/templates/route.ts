import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_CONTRACT_TEMPLATE, DEFAULT_OFFER_LETTER_TEMPLATE } from "@/lib/pdf-generator";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const templateType = searchParams.get("type");

    let query = supabase.from("email_templates").select("*");

    if (templateType) {
      query = query.eq("template_type", templateType);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("[v0] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ templates: data || [] });
  } catch (error) {
    console.error("[v0] Error fetching templates:", error);
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, subject, template_type, content, variables } = body;

    if (!name || !subject || !template_type || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("email_templates")
      .insert({
        name,
        subject,
        template_type,
        content,
        variables: variables || {},
      })
      .select()
      .single();

    if (error) {
      console.error("[v0] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { template: data, message: "Template created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[v0] Error creating template:", error);
    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    );
  }
}

// Get default templates
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "initialize-defaults") {
      const supabase = await createClient();

      // Check if default templates already exist
      const { data: existing } = await supabase
        .from("email_templates")
        .select("id")
        .in("template_type", ["contract", "offer_letter"]);

      if (existing && existing.length >= 2) {
        return NextResponse.json({
          message: "Default templates already exist",
          count: existing.length,
        });
      }

      // Create default templates
      const { data, error } = await supabase
        .from("email_templates")
        .insert([
          {
            name: "Employment Contract",
            subject: "Employment Contract - {{applicantName}}",
            template_type: "contract",
            content: DEFAULT_CONTRACT_TEMPLATE,
            variables: {
              applicantName: "string",
              position: "string",
              startDate: "date",
              salary: "string",
              date: "date",
            },
          },
          {
            name: "Offer Letter",
            subject: "Job Offer - {{position}} Position",
            template_type: "offer_letter",
            content: DEFAULT_OFFER_LETTER_TEMPLATE,
            variables: {
              applicantName: "string",
              position: "string",
              startDate: "date",
              salary: "string",
              location: "string",
              reportingTo: "string",
              date: "date",
            },
          },
          {
            name: "Interview Reminder",
            subject: "Reminder: Your Interview with UNEDP",
            template_type: "reminder",
            content: `Dear {{applicantName}},

We hope you're excited about your upcoming interview for the {{position}} position at UNEDP!

Interview Details:
Date: {{interviewDate}}
Time: {{interviewTime}}
Location: {{location}}

Please confirm your attendance by replying to this email.

Best regards,
UNEDP Recruitment Team`,
            variables: {
              applicantName: "string",
              position: "string",
              interviewDate: "date",
              interviewTime: "time",
              location: "string",
            },
          },
          {
            name: "Rejection Letter",
            subject: "Update on Your Application",
            template_type: "reminder",
            content: `Dear {{applicantName}},

Thank you for your interest in the {{position}} position at UNEDP. We appreciate the time you invested in our application process.

After careful consideration, we have decided to move forward with other candidates whose experience more closely matched the specific requirements of this role.

We encourage you to apply for other suitable positions in the future. Your qualifications and experience may be a good fit for other opportunities at UNEDP.

Best regards,
UNEDP Recruitment Team`,
            variables: {
              applicantName: "string",
              position: "string",
            },
          },
        ])
        .select();

      if (error) {
        console.error("[v0] Error creating default templates:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        message: "Default templates created successfully",
        templates: data,
        count: data?.length || 0,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("[v0] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
