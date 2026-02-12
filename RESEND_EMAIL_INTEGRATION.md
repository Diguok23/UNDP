# Resend Email Integration - Application Confirmation

## Overview
Automated confirmation emails are now sent to applicants when they submit job applications. The system uses Resend to deliver professional emails from `careers@unedp.org` with instructions on how to proceed.

## What Was Implemented

### 1. Email API Endpoint
**Location:** `/app/api/send-application-email/route.ts`

- **Method:** POST
- **Purpose:** Sends confirmation emails to applicants after successful application submission
- **Payload:**
  ```json
  {
    "applicantName": "John Doe",
    "applicantEmail": "john@example.com",
    "jobTitle": "Programme Support Assistant",
    "deadline": "Monday, February 17, 2025"
  }
  ```

### 2. Email Template Features
The confirmation email includes:

#### Header
- UNEDP branding (logo and organization name)
- Professional styling with responsive design

#### Content Sections
1. **Welcome Message** - Thanks applicant for applying
2. **Video Submission Instructions**
   - Requires 5-minute video submission
   - Supports Loom and Google Drive platforms
   - Clear instructions to make links shareable ("Anyone with the link")
   - Video content guidelines

3. **Supporting Documents Section**
   - ID/Passport requirement
   - Education certificates
   - Certificates of experience/training
   - Any other relevant professional documents
   - Instructions to email to careers@unedp.org

4. **3-Day Deadline Banner**
   - Clearly highlighted deadline (3 days from submission date)
   - Prominent visual styling to catch attention
   - Warning that late applications may not be reviewed

5. **Footer**
   - Copyright information
   - Clarification about email purpose

### 3. Application Form Updates
**Location:** `/components/careers/application-form.tsx`

#### Changes Made:
1. **Email Sending Logic**
   - Calculates 3-day deadline automatically
   - Formats deadline in user-friendly format (e.g., "Monday, February 17, 2025")
   - Calls `/api/send-application-email` endpoint after successful database insertion
   - Graceful error handling - application proceeds even if email fails

2. **Success Message Enhancement**
   - New info box explaining the video and document requirements
   - 3-day deadline reminder
   - Visual hierarchy with icons and colors

3. **Privacy Policy Update**
   - Changed "UNEDF" to "UNEDP" for consistency

## Environment Variables Required

Ensure you have added the following to your environment variables:
- `RESEND_API_KEY` - Your Resend API key from resend.com/api-keys

## How It Works

### Applicant Journey:
1. User fills out application form on `/careers/[job-slug]`
2. User clicks "Submit Application"
3. Application data is saved to Supabase `applications` table
4. Confirmation email is sent to applicant's email address
5. Success screen displays with additional instructions
6. Applicant receives email with:
   - Video submission guidelines
   - Document requirements
   - 3-day deadline
   - Email address to send documents to (careers@unedp.org)

### Email Sending Process:
1. Application form triggers POST to `/api/send-application-email`
2. Deadline is calculated (current date + 3 days)
3. Email is formatted as HTML
4. Resend API sends email from careers@unedp.org
5. Application continues regardless of email delivery status

## Email Customization

The email template can be customized by editing `/app/api/send-application-email/route.ts`:

- **Job Title:** Automatically inserted from application form
- **Applicant Name:** Personalized greeting
- **Deadline:** Dynamically calculated 3 days from submission
- **Styling:** CSS-in-email styling (modify the `<style>` section)
- **Content:** Update HTML sections for different instructions

## Testing

To test the email integration:

1. Go to `/careers` and select a job posting
2. Fill out the application form with a test email
3. Submit the application
4. Check the test email inbox for the confirmation email
5. Verify all links are functional and deadline is correct

## Email Delivery Considerations

- **Sender:** careers@unedp.org (must be verified in Resend)
- **Rate Limiting:** Resend free tier allows 100 emails/day
- **Bounce Handling:** Invalid email addresses will bounce
- **Tracking:** Optional - can enable Resend tracking for open rates

## Future Enhancements

Potential improvements:
1. Add email template versioning in database
2. Track email delivery status in applications table
3. Send reminder emails if documents not received by deadline
4. Create email templates for different job levels/types
5. Add email delivery analytics dashboard

## Troubleshooting

### Email Not Sending?
1. Verify `RESEND_API_KEY` is set in environment variables
2. Check that `careers@unedp.org` is verified in Resend dashboard
3. Review browser console and server logs for errors
4. Check applicant email is valid format

### Email Styling Issues?
- Email clients have varying CSS support
- Test in multiple email clients (Gmail, Outlook, etc.)
- Critical styling is inline, fallbacks included

### Deadline Calculation Wrong?
- Deadline uses server time zone (UTC by default)
- Adjust the deadline calculation logic if different timezone needed
