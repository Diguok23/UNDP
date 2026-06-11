import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { put } from "@vercel/blob";
import { generatePDFBuffer } from "@/lib/pdf-generator";

interface ContractRequest {
  application_id: string;
  template_id: string;
  document_type: "contract" | "offer_letter";
  template_data: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContractRequest = await request.json();
    const { application_id, template_id, document_type, template_data } = body;

    // Validation
    if (!application_id || !template_id || !document_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Get application
    const { data: application, error: appError } = await supabase
      .from("applications")
      .select("*, jobs(title)")
      .eq("id", application_id)
      .single();

    if (appError || !application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

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

    // Merge template data with application data
    const mergedData = {
      applicantName: application.full_name,
      position: (application.jobs as any)?.title || "Position",
      date: new Date().toLocaleDateString(),
      startDate: template_data.startDate || new Date().toLocaleDateString(),
      salary: template_data.salary || "TBD",
      location: template_data.location || "TBD",
      reportingTo: template_data.reportingTo || "Management",
      ...template_data,
    };

    // Generate PDF
    console.log("[v0] Generating PDF with data:", mergedData);
    const pdfBuffer = await generatePDFBuffer(
      template.content,
      mergedData,
      `${document_type}-${application.full_name.replace(/\s+/g, "-")}.pdf`
    );

    // Upload to Vercel Blob
    const fileName = `contracts/${application_id}/${document_type}-${Date.now()}.pdf`;
    const blob = await put(fileName, Buffer.from(pdfBuffer), { access: "public" });

    console.log("[v0] PDF uploaded to Blob:", blob.url);

    // Store contract document record
    const { data: contractDoc, error: docError } = await supabase
      .from("contract_documents")
      .upsert(
        {
          application_id,
          document_type,
          file_url: blob.url,
          template_id,
          template_data: mergedData,
        },
        { onConflict: "application_id,document_type" }
      )
      .select()
      .single();

    if (docError) {
      console.error("[v0] Error storing contract document:", docError);
      return NextResponse.json(
        { error: "Failed to store contract document" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${document_type} generated successfully`,
      contract: contractDoc,
      download_url: blob.url,
    });
  } catch (error) {
    console.error("[v0] Error generating contract:", error);
    return NextResponse.json(
      { error: "Failed to generate contract" },
      { status: 500 }
    );
  }
}

// Get generated contracts for an application
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("application_id");

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data: contracts, error } = await supabase
      .from("contract_documents")
      .select("*")
      .eq("application_id", applicationId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ contracts: contracts || [] });
  } catch (error) {
    console.error("[v0] Error fetching contracts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contracts" },
      { status: 500 }
    );
  }
}
