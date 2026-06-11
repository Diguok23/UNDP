import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const {
      applicationId,
      positionTitle,
      salary,
      startDate,
      applicantEmail,
      applicantName,
    } = await request.json()

    if (!applicationId || !applicantEmail || !positionTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Generate offer letter HTML
    const offerLetterHtml = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://unedp-global.org/logo.jpg" alt="UNEDP Logo" style="height: 50px;" />
            <h1 style="color: #1a5f7a; margin-top: 20px;">Offer Letter</h1>
          </div>

          <p style="margin-bottom: 20px;">Dear ${applicantName},</p>

          <p style="margin-bottom: 20px;">
            We are pleased to extend an offer of employment for the position of <strong>${positionTitle}</strong> at the UN Economic Development Programme (UNEDP).
          </p>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Position Details:</h3>
            <p><strong>Position:</strong> ${positionTitle}</p>
            ${salary ? `<p><strong>Salary:</strong> ${salary}</p>` : ''}
            ${startDate ? `<p><strong>Start Date:</strong> ${startDate}</p>` : ''}
          </div>

          <p style="margin-bottom: 20px;">
            This offer is contingent upon:
          </p>
          <ul style="margin-bottom: 20px;">
            <li>Successful background check</li>
            <li>Verification of educational credentials</li>
            <li>Medical fitness clearance</li>
            <li>Reference checks</li>
          </ul>

          <p style="margin-bottom: 20px;">
            Please confirm your acceptance of this offer by replying to this email or signing the attached documents within 5 business days.
          </p>

          <p style="margin-bottom: 20px;">
            We are excited to welcome you to our team. If you have any questions, please do not hesitate to contact us at careers@unedp-global.org.
          </p>

          <p style="margin-bottom: 30px;">
            Warm regards,<br/>
            <strong>Human Resources Team</strong><br/>
            UN Economic Development Programme
          </p>

          <div style="border-top: 1px solid #ccc; padding-top: 20px; font-size: 12px; color: #666;">
            <p style="margin: 0;">
              This is an official communication from UNEDP. Please do not forward this letter to any third party without written consent.
            </p>
          </div>
        </div>
      </body>
    </html>
    `

    // Send offer letter via Resend
    const emailResponse = await resend.emails.send({
      from: 'careers@unedp-global.org',
      to: applicantEmail,
      subject: `Offer Letter - ${positionTitle} Position at UNEDP`,
      html: offerLetterHtml,
    })

    if (emailResponse.error) {
      console.error('[v0] Failed to send offer letter:', emailResponse.error)
      return NextResponse.json(
        { error: 'Failed to send offer letter' },
        { status: 500 }
      )
    }

    console.log('[v0] Offer letter sent to', applicantEmail)

    // Create offer letter record in database
    const { data: offerLetter, error: dbError } = await supabase
      .from('offer_letters')
      .insert({
        application_id: applicationId,
        position_title: positionTitle,
        salary: salary || null,
        start_date: startDate || null,
        sent_at: new Date().toISOString(),
        offer_status: 'sent',
      })
      .select()
      .single()

    if (dbError) {
      console.error('[v0] Failed to save offer letter to DB:', dbError)
      // Continue anyway - email was sent
    }

    // Update application status
    const { error: updateError } = await supabase
      .from('applications')
      .update({
        application_status: 'offered',
        offer_letter_sent_at: new Date().toISOString(),
      })
      .eq('id', applicationId)

    if (updateError) {
      console.error('[v0] Failed to update application:', updateError)
    }

    // Log email
    await supabase.from('email_logs').insert({
      application_id: applicationId,
      email_to: applicantEmail,
      subject: `Offer Letter - ${positionTitle} Position at UNEDP`,
      template_type: 'offer_letter',
      status: 'sent',
      resend_message_id: emailResponse.data?.id,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Offer letter sent successfully',
        offerId: offerLetter?.id,
        resendId: emailResponse.data?.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[v0] Offer letter endpoint error:', error)
    return NextResponse.json(
      { error: 'Failed to process offer letter' },
      { status: 500 }
    )
  }
}
