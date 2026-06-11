"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Edit2, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  subject: string;
  template_type: string;
  content: string;
  variables: Record<string, string>;
  created_at: string;
}

const TEMPLATE_TYPES = [
  { value: "contract", label: "Contract" },
  { value: "offer_letter", label: "Offer Letter" },
  { value: "reminder", label: "Reminder" },
  { value: "custom", label: "Custom" },
];

export default function TemplateManagementPanel() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    template_type: "custom",
    content: "",
  });

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    try {
      setLoading(true);
      const res = await fetch("/api/automation/templates");
      const data = await res.json();
      setTemplates(data.templates || []);
    } catch (error) {
      console.error("[v0] Error loading templates:", error);
      toast.error("Failed to load templates");
    } finally {
      setLoading(false);
    }
  }

  const handleInitializeDefaults = async () => {
    try {
      setInitializing(true);
      const res = await fetch("/api/automation/templates?action=initialize-defaults", {
        method: "PATCH",
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        loadTemplates();
      } else {
        toast.error(data.error || "Failed to initialize templates");
      }
    } catch (error) {
      console.error("[v0] Error:", error);
      toast.error("Failed to initialize templates");
    } finally {
      setInitializing(false);
    }
  };

  const handleCreateTemplate = async () => {
    if (!formData.name || !formData.subject || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const res = await fetch("/api/automation/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Template created successfully");
        setFormData({
          name: "",
          subject: "",
          template_type: "custom",
          content: "",
        });
        setShowNewDialog(false);
        loadTemplates();
      } else {
        toast.error(data.error || "Failed to create template");
      }
    } catch (error) {
      console.error("[v0] Error creating template:", error);
      toast.error("Failed to create template");
    }
  };

  const filteredTemplates = templates.filter(
    (t) => selectedType === "all" || t.template_type === selectedType
  );

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>
              Manage email templates for contracts, offer letters, and reminders
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleInitializeDefaults}
              variant="outline"
              disabled={initializing || templates.length >= 2}
            >
              {initializing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Initialize Defaults
            </Button>
            <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Template
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Template</DialogTitle>
                  <DialogDescription>
                    Create a new email template with custom content and variables
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Template Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Welcome Email"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Template Type *</Label>
                    <Select
                      value={formData.template_type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, template_type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TEMPLATE_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Email Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="e.g., Welcome to {{companyName}}"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Use {'{{variableName}}'} for dynamic content
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Email Content *</Label>
                    <Textarea
                      id="content"
                      placeholder={'Enter email content... Use {{variableName}} for dynamic content'}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      rows={8}
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowNewDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateTemplate}>
                      Create Template
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Filter */}
      <div className="flex gap-2">
        <Label className="flex items-center">Template Type:</Label>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {TEMPLATE_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredTemplates.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTemplates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge className="mt-2" variant="outline">
                      {template.template_type}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Subject
                  </p>
                  <p className="mt-1 text-sm">{template.subject}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    Preview
                  </p>
                  <div className="mt-2 rounded bg-muted p-3 text-sm max-h-32 overflow-y-auto">
                    {template.content.substring(0, 200)}...
                  </div>
                </div>
                {Object.keys(template.variables).length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Variables
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {Object.keys(template.variables).map((key) => (
                        <Badge key={key} variant="secondary">
                          {key}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No templates found</p>
            <Button
              onClick={handleInitializeDefaults}
              className="mt-4"
              variant="outline"
            >
              Create Default Templates
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
