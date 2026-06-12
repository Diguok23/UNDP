import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { emails, subject, body, template_type } = await request.json()

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty emails array' },
        { status: 400 }
      )
    }

    if (!subject || !body) {
      return NextResponse.json(
        { error: 'Subject and body are required' },
        { status: 400 }
      )
    }

    console.log('[v0] Sending bulk emails to', emails.length, 'recipients')

    const results = {
      sent: [] as string[],
      failed: [] as Array<{ email: string; error: string }>,
    }

    for (const email of emails) {
      try {
        const response = await resend.emails.send({
          from: 'careers@unedp-global.org',
          to: email,
          subject: subject,
          html: body,
        })

        if (response.error) {
          console.error(`[v0] Failed to send to ${email}:`, response.error)
          results.failed.push({
            email,
            error: response.error?.message || 'Unknown error',
          })
        } else {
          console.log(`[v0] Sent email to ${email}:`, response.data?.id)
          results.sent.push(email)
        }
      } catch (err) {
        console.error(`[v0] Exception sending to ${email}:`, err)
        results.failed.push({
          email,
          error: err instanceof Error ? err.message : 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      success: true,
      total: emails.length,
      sent: results.sent.length,
      failed: results.failed.length,
      failures: results.failed,
    })
  } catch (error) {
    console.error('[v0] Bulk email error:', error)
    return NextResponse.json(
      { error: 'Failed to send bulk emails' },
      { status: 500 }
    )
  }
}
