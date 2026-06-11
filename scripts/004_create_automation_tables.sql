-- Automation tables for contracts, offer letters, and email management

-- Add new columns to applications table for tracking
ALTER TABLE applications ADD COLUMN IF NOT EXISTS offer_letter_sent_at timestamptz;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS offer_letter_signed_at timestamptz;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS contract_sent_at timestamptz;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS contract_signed_at timestamptz;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS application_status text default 'new' check (application_status in ('new', 'reviewing', 'shortlisted', 'interview', 'offered', 'rejected', 'withdrawn', 'offer_accepted', 'contract_sent', 'contract_signed'));

-- Email templates table
CREATE TABLE IF NOT EXISTS email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  template_type text NOT NULL CHECK (template_type IN ('offer_letter', 'contract', 'reminder', 'custom')),
  variables text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Email logs table for tracking sent emails
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  email_to text NOT NULL,
  email_from text DEFAULT 'careers@unedp-global.org',
  subject text NOT NULL,
  template_type text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  status text DEFAULT 'sent' CHECK (status IN ('sent', 'bounced', 'failed')),
  error_message text,
  resend_message_id text
);

-- Contracts table
CREATE TABLE IF NOT EXISTS contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE NOT NULL,
  contract_type text NOT NULL CHECK (contract_type IN ('employment', 'consultant', 'temporary')),
  contract_url text,
  sent_at timestamptz,
  signed_at timestamptz,
  signed_by text,
  contract_status text DEFAULT 'draft' CHECK (contract_status IN ('draft', 'sent', 'signed', 'executed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Offer letters table
CREATE TABLE IF NOT EXISTS offer_letters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE NOT NULL,
  position_title text NOT NULL,
  salary text,
  start_date date,
  offer_url text,
  sent_at timestamptz,
  accepted_at timestamptz,
  rejected_at timestamptz,
  offer_status text DEFAULT 'draft' CHECK (offer_status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bulk email campaigns table
CREATE TABLE IF NOT EXISTS email_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  recipient_filter text, -- JSON filter for applications (e.g., {"status": "interview"})
  scheduled_at timestamptz,
  sent_at timestamptz,
  total_recipients integer DEFAULT 0,
  successfully_sent integer DEFAULT 0,
  failed integer DEFAULT 0,
  campaign_status text DEFAULT 'draft' CHECK (campaign_status IN ('draft', 'scheduled', 'in_progress', 'completed', 'failed')),
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE offer_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Admin access only
CREATE POLICY "admin_all_email_templates" ON email_templates FOR ALL USING (true);
CREATE POLICY "admin_all_email_logs" ON email_logs FOR ALL USING (true);
CREATE POLICY "admin_all_contracts" ON contracts FOR ALL USING (true);
CREATE POLICY "admin_all_offer_letters" ON offer_letters FOR ALL USING (true);
CREATE POLICY "admin_all_email_campaigns" ON email_campaigns FOR ALL USING (true);
