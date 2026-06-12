'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Mail, Plus, Edit2, Trash2 } from 'lucide-react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  body: string
  template_type: string
  is_active: boolean
  created_at: string
}

export default function EmailTemplatesPage() {
  const supabase = createClient()
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    body: '',
    template_type: 'custom',
  })

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTemplates(data || [])
    } catch (err) {
      console.error('[v0] Error loading templates:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.subject || !formData.body) {
      alert('Please fill in all fields')
      return
    }

    try {
      if (editingId) {
        // Update existing template
        const { error } = await supabase
          .from('email_templates')
          .update({
            name: formData.name,
            subject: formData.subject,
            body: formData.body,
            template_type: formData.template_type,
          })
          .eq('id', editingId)

        if (error) throw error
        alert('Template updated successfully')
      } else {
        // Create new template
        const { error } = await supabase.from('email_templates').insert({
          name: formData.name,
          subject: formData.subject,
          body: formData.body,
          template_type: formData.template_type,
          is_active: true,
        })

        if (error) throw error
        alert('Template created successfully')
      }

      setFormData({ name: '', subject: '', body: '', template_type: 'custom' })
      setEditingId(null)
      setShowForm(false)
      loadTemplates()
    } catch (err) {
      console.error('[v0] Error saving template:', err)
      alert('Failed to save template')
    }
  }

  const handleEdit = (template: EmailTemplate) => {
    setFormData({
      name: template.name,
      subject: template.subject,
      body: template.body,
      template_type: template.template_type,
    })
    setEditingId(template.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return

    try {
      const { error } = await supabase
        .from('email_templates')
        .delete()
        .eq('id', id)

      if (error) throw error
      alert('Template deleted successfully')
      loadTemplates()
    } catch (err) {
      console.error('[v0] Error deleting template:', err)
      alert('Failed to delete template')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ name: '', subject: '', body: '', template_type: 'custom' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Email Templates</h1>
          <p className="text-muted-foreground">
            Create and manage reusable email templates
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingId ? 'Edit Template' : 'Create New Template'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="name">Template Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Interview Reminder"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="template_type">Template Type</Label>
                <select
                  id="template_type"
                  value={formData.template_type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      template_type: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="offer_letter">Offer Letter</option>
                  <option value="contract">Contract</option>
                  <option value="reminder">Reminder</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Email subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="body">Email Body (HTML)</Label>
                <Textarea
                  id="body"
                  placeholder="Email content"
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  rows={10}
                  className="font-mono text-sm"
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingId ? 'Update' : 'Create'} Template
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Templates ({templates.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : templates.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">
                      {template.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {template.template_type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {template.subject.substring(0, 50)}
                      {template.subject.length > 50 ? '...' : ''}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(template.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(template)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(template.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center">
              <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No templates yet</h3>
              <p className="text-muted-foreground">
                Create email templates to reuse in bulk campaigns
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
