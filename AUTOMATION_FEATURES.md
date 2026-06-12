# Automation Features - Implementation Summary

## Overview
Implemented a comprehensive HR automation system for managing contracts, offer letters, email campaigns, and applicant tracking with integrated Resend email delivery.

## Database Schema (scripts/004_create_automation_tables.sql)

### New Tables Created:
1. **email_templates** - Reusable email templates for offers, contracts, reminders
2. **email_logs** - Log all sent emails with status tracking and Resend IDs
3. **contracts** - Employment contract management with signatures tracking
4. **offer_letters** - Offer letter tracking with acceptance/rejection status
5. **email_campaigns** - Bulk email campaigns with recipient filtering and analytics

### Application Table Extensions:
- `offer_letter_sent_at` - When offer letter was sent
- `offer_letter_signed_at` - When offer letter was signed
- `contract_sent_at` - When contract was sent
- `contract_signed_at` - When contract was signed
- `application_status` - Enhanced status tracking (new, reviewing, shortlisted, interview, offered, rejected, withdrawn, offer_accepted, contract_sent, contract_signed)

## API Endpoints

### 1. Send Bulk Email (`/app/api/send-bulk-email/route.ts`)
**POST** `/api/send-bulk-email`
- Send identical emails to multiple recipients
- Parameters: emails array, subject, body, template_type
- Returns: sent count, failed count, failure details
- Uses Resend for email delivery from `careers@unedp-global.org`

### 2. Send Offer Letter (`/app/api/send-offer-letter/route.ts`)
**POST** `/api/send-offer-letter`
- Generate and send professional offer letters
- Parameters: applicationId, positionTitle, salary, startDate, applicantEmail, applicantName
- Creates records in offer_letters table
- Updates application status to 'offered'
- Logs email in email_logs table
- Returns: offer ID, Resend message ID

## Admin Pages

### 1. Offer Letters Management (`/app/setup/offer-letters/page.tsx`)
- View all offer letters with status (draft, sent, accepted, rejected, expired)
- Status summary cards (draft, sent, accepted, rejected counts)
- Send draft offer letters via button
- Track acceptance/rejection status
- View applicant email and position details

### 2. Bulk Emails (`/app/setup/bulk-emails/page.tsx`)
- Compose emails for groups of candidates
- Filter by application status (new, reviewing, shortlisted, interview, offered, rejected)
- HTML email support
- Send bulk emails with delivery tracking
- View results: total sent, failures, error messages for failed sends
- Email tips sidebar

### 3. Email Templates (`/app/setup/email-templates/page.tsx`)
- Create/edit/delete reusable email templates
- Template types: offer_letter, contract, reminder, custom
- Store subject and HTML body
- Template listing with creation dates
- Mark templates active/inactive

### 4. Contracts Management (`/app/setup/contracts/page.tsx`)
- View all contracts with status (draft, sent, signed, executed)
- Status summary cards
- Track contract type (employment, consultant, temporary)
- View sent and signed dates
- Contract signature tracking

## Features in Applications Detail Page

### Quick Actions Section Enhancement
- "Send Offer Letter" button appears when status is "interview"
- Prompts for position title, salary (optional), start date (optional)
- Automatically sends to applicant email
- Updates application tracking fields

## Automation Workflow

### Offer Letter Flow:
1. Admin reviews application details
2. Changes status to "interview"
3. Clicks "Send Offer Letter" from Quick Actions
4. Enters position details in prompts
5. System generates professional HTML email
6. Email sent via Resend to applicant
7. Records created in offer_letters and email_logs tables
8. Application status updated to "offered"

### Bulk Email Flow:
1. Navigate to Bulk Emails page
2. Select target candidate status group
3. Compose subject and body (HTML supported)
4. Click "Send Bulk Email"
5. System fetches all matching applicants
6. Sends individual emails via Resend
7. Displays results with success/failure counts

### Email Template Flow:
1. Create templates via Email Templates page
2. Define template name, type, subject, body
3. Save template for reuse
4. Can edit or delete existing templates

## Sidebar Navigation Updates

Added to `/app/setup/layout.tsx` sidebar links:
- "Offer Letters" - `/setup/offer-letters`
- "Bulk Emails" - `/setup/bulk-emails`
- "Email Templates" - `/setup/email-templates`
- "Contracts" (ready for implementation) - `/setup/contracts`

## Email Configuration

- **From Email:** careers@unedp-global.org
- **Service:** Resend (using `RESEND_API_KEY` env var)
- **Email Formatting:** Professional HTML templates
- **Logging:** All sent emails logged with delivery status

## Security & RLS

- All automation tables protected with Row Level Security
- Admin-only access policies (users can only access with authenticated admin status)
- Email logs tied to application records
- Audit trail for all sent emails

## Future Enhancements Ready

1. Contract generation and sending (API ready, UI page created)
2. Email reminders with scheduled delivery
3. Bulk campaign status dashboard
4. Email template variables and dynamic content
5. Integration with document signing services (e.g., DocuSign)
6. Application status change notifications
7. Interview reminder automations
8. Rejection email templates
9. Multi-language email support
10. Email delivery bounce handling and retry logic

## Dependencies

- Resend API for email delivery
- Supabase for database and storage
- Next.js API routes for backend
- React client components for admin UI
- shadcn/ui components for UI consistency
