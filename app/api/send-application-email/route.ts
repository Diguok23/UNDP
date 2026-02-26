import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ApplicationEmailRequest {
  applicantName: string;
  applicantEmail: string;
  jobTitle: string;
  deadline: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ApplicationEmailRequest = await request.json();
    const { applicantName, applicantEmail, jobTitle, deadline } = body;

    console.log(
      "[v0] Sending confirmation email to:",
      applicantEmail,
      "for job:",
      jobTitle
    );

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background: #f9fafb;
      border-radius: 8px;
      padding: 40px;
      margin: 20px 0;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #1e40af;
      margin-bottom: 10px;
    }
    .title {
      font-size: 24px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 20px;
    }
    .content {
      background: white;
      padding: 30px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .section {
      margin: 25px 0;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 12px;
    }
    .instruction {
      background: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
    }
    .instruction-text {
      margin: 10px 0;
      font-size: 14px;
      line-height: 1.6;
    }
    .video-section {
      background: #f0fdf4;
      border-left: 4px solid #22c55e;
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
    }
    .deadline {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
      font-weight: 600;
      color: #92400e;
    }
    .documents-section {
      background: #fce7f3;
      border-left: 4px solid #ec4899;
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
    }
    .email-link {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 600;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #6b7280;
    }
    .button {
      display: inline-block;
      background: #3b82f6;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      margin: 20px 0;
    }
    ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    li {
      margin: 8px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">UNEDP</div>
      <div style="font-size: 12px; color: #6b7280;">UN Economic Development Programme</div>
    </div>
    
    <div class="title">Application Received!</div>
    
    <div class="content">
      <p>Dear ${applicantName},</p>
      
      <p>Thank you for applying for the <strong>${jobTitle}</strong> position at UNEDP. We truly appreciate your interest in joining our team!</p>
      
      <div class="section">
        <div class="section-title">Next Steps: Video Submission Required</div>
        <p>Due to the high volume of applications we receive, we are unable to schedule one-on-one interviews. Instead, we kindly ask you to submit a <strong>5-minute video</strong> showcasing your qualifications and motivation for this role.</p>
        
        <div class="video-section">
          <div style="font-weight: 600; margin-bottom: 10px;">📹 Video Recording Instructions:</div>
          <div class="instruction-text">
            <strong>Recording Options:</strong>
            <ul>
              <li><strong>Loom:</strong> Visit <a href="https://loom.com" class="email-link">loom.com</a> to record your video (free option available)</li>
              <li><strong>Google Drive:</strong> Use Google Drive video recording feature or upload a pre-recorded video</li>
            </ul>
            <strong>Important:</strong> Please ensure the link is set to "Anyone with the link can view" so we can access it without requesting additional permissions.
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Supporting Documents</div>
        <div class="documents-section">
          <p>Please email the following documents to <a href="mailto:careers@unedp.org" class="email-link">careers@unedp.org</a>:</p>
          <ul>
            <li>Valid ID or Passport</li>
            <li>Education Certificates (Degree, Diploma, etc.)</li>
            <li>Certificates of Experience or Training</li>
            <li>Any other relevant professional documents</li>
            <li><strong>Link to your 5-minute video</strong> (Loom or Google Drive)</li>
          </ul>
          <p style="margin-top: 15px; font-size: 14px;">When sending your documents, please include "Application for ${jobTitle}" in the email subject line.</p>
        </div>
      </div>
      
      <div class="deadline">
        <strong>⏰ Important Deadline:</strong><br>
        Please submit your video and documents by <strong>${deadline}</strong>. Applications received after this date may not be reviewed.
      </div>
      
      <div class="section">
        <p><strong>What to Include in Your Video:</strong></p>
        <ul>
          <li>Brief introduction (name, current role, background)</li>
          <li>Why you're interested in this position</li>
          <li>Key qualifications relevant to the role</li>
          <li>What you can contribute to UNEDP</li>
          <li>Any additional information you'd like us to know</li>
        </ul>
      </div>
      
      <p style="margin-top: 30px;">We appreciate your effort and will carefully review all submissions. The most suitable candidates will be contacted for further discussions.</p>
      
      <p>If you have any questions, please don't hesitate to reach out to us at <a href="mailto:careers@unedp.org" class="email-link">careers@unedp.org</a>.</p>
      
      <p>Best regards,<br>
      <strong>UNEDP Recruitment Team</strong><br>
      UN Economic Development Programme</p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} UN Economic Development Programme (UNEDP). All rights reserved.</p>
      <p>This email was sent because you submitted an application for a position at UNEDP. If you did not submit an application, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
    `;

    const response = await resend.emails.send({
      from: "careers@unedp.org",
      to: applicantEmail,
      subject: `Application Confirmation - ${jobTitle}`,
      html: emailHtml,
    });

    if (response.error) {
      console.error("[v0] Resend error:", response.error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    console.log("[v0] Email sent successfully:", response.data.id);
    return NextResponse.json(
      { success: true, messageId: response.data.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("[v0] Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send confirmation email" },
      { status: 500 }
    );
  }
}
