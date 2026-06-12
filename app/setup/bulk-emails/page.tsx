'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Mail, Send, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function BulkEmailsPage() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState('interview')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSendBulkEmail = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!subject.trim() || !body.trim()) {
      alert('Please fill in both subject and body')
      return
    }

    setSending(true)
    try {
      const supabase = createClient()
      // Fetch applications with selected status
      const { data: applications, error } = await supabase
        .from('applications')
        .select('email')
        .eq('status', status)

      if (error) throw error

      const emails = applications?.map((app: any) => app.email) || []

      if (emails.length === 0) {
        alert(`No applications found with status "${status}"`)
        setSending(false)
        return
      }

      // Send bulk email
      const response = await fetch('/api/send-bulk-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emails,
          subject,
          body,
          template_type: 'custom',
        }),
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error)

      setResult({
        success: true,
        total: data.total,
        sent: data.sent,
        failed: data.failed,
        failures: data.failures,
      })

      // Clear form
      setSubject('')
      setBody('')
    } catch (err) {
      console.error('[v0] Error sending bulk email:', err)
      setResult({
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Send Bulk Emails</h1>
        <p className="text-muted-foreground">
          Send emails to multiple candidates at once
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Compose Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSendBulkEmail} className="space-y-4">
              <div>
                <Label htmlFor="status">Target Candidates by Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Email subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="body">Email Body</Label>
                <Textarea
                  id="body"
                  placeholder="Email content (supports HTML)"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                  required
                />
              </div>

              <Button type="submit" disabled={sending} className="w-full">
                <Send className="mr-2 h-4 w-4" />
                {sending ? 'Sending...' : 'Send Bulk Email'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Email Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Use HTML for better formatting</p>
              <p>• Keep subject lines clear and concise</p>
              <p>• Test emails before sending to large groups</p>
              <p>• Include an unsubscribe option</p>
            </CardContent>
          </Card>

          {result && (
            <Card
              className={
                result.success ? 'border-green-200' : 'border-red-200'
              }
            >
              <CardHeader>
                <CardTitle className="text-sm">
                  {result.success ? 'Sent!' : 'Error'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                {result.success ? (
                  <div className="space-y-2">
                    <p className="text-green-700">
                      Successfully sent: {result.sent} / {result.total}
                    </p>
                    {result.failed > 0 && (
                      <>
                        <p className="text-red-700">Failed: {result.failed}</p>
                        <ul className="text-xs text-muted-foreground space-y-1 mt-2">
                          {result.failures?.map(
                            (failure: any, idx: number) => (
                              <li key={idx}>
                                {failure.email}: {failure.error}
                              </li>
                            )
                          )}
                        </ul>
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-red-700">{result.error}</p>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
