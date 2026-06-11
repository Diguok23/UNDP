-- Create email_templates table
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('contract', 'offer_letter', 'reminder', 'custom')),
  content TEXT NOT NULL,
  variables JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create scheduled_emails table
CREATE TABLE IF NOT EXISTS scheduled_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_email TEXT NOT NULL,
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  template_id UUID NOT NULL REFERENCES email_templates(id) ON DELETE CASCADE,
  template_data JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'sent', 'failed')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create email_logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_email TEXT NOT NULL,
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  template_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'bounced')),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  error_details JSONB
);

-- Create contract_documents table
CREATE TABLE IF NOT EXISTS contract_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('contract', 'offer_letter')),
  file_url TEXT NOT NULL,
  template_id UUID REFERENCES email_templates(id) ON DELETE SET NULL,
  template_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(application_id, document_type)
);

-- Create indexes for better query performance
CREATE INDEX idx_scheduled_emails_status ON scheduled_emails(status);
CREATE INDEX idx_scheduled_emails_scheduled_at ON scheduled_emails(scheduled_at);
CREATE INDEX idx_scheduled_emails_application_id ON scheduled_emails(application_id);
CREATE INDEX idx_email_logs_application_id ON email_logs(application_id);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at);
CREATE INDEX idx_contract_documents_application_id ON contract_documents(application_id);
CREATE INDEX idx_email_templates_type ON email_templates(template_type);

-- Enable Row Level Security
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow authenticated users to manage)
CREATE POLICY "Users can view email templates" ON email_templates
  FOR SELECT USING (true);

CREATE POLICY "Users can manage scheduled emails" ON scheduled_emails
  FOR ALL USING (true);

CREATE POLICY "Users can view email logs" ON email_logs
  FOR SELECT USING (true);

CREATE POLICY "Users can manage contract documents" ON contract_documents
  FOR ALL USING (true);
