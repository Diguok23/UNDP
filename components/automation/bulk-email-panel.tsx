"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  subject: string;
  template_type: string;
}

interface Application {
  id: string;
  full_name: string;
  email: string;
  status: string;
  jobs?: { title: string } | null;
}

const STATUS_FILTERS = [
  "new",
  "reviewing",
  "shortlisted",
  "interview",
  "offered",
  "rejected",
  "withdrawn",
];

export default function BulkEmailPanel() {
  const supabase = createClient();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApps, setSelectedApps] = useState<Set<string>>(new Set());
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(new Set(["interview"]));
  const [sendType, setSendType] = useState<"immediate" | "scheduled">("immediate");
  const [scheduledTime, setScheduledTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadData();
  }, [selectedStatuses]);

  async function loadData() {
    try {
      setLoading(true);

      // Load all templates
      const templatesRes = await fetch("/api/automation/templates");
      const templatesData = await templatesRes.json();
      setTemplates(templatesData.templates || []);

      // Load applications filtered by selected statuses
      const { data: apps } = await supabase
        .from("applications")
        .select(`id, full_name, email, status, jobs(title)`)
        .in("status", Array.from(selectedStatuses));

      setApplications((apps as any) || []);
      setSelectedApps(new Set()); // Clear selections when filter changes
    } catch (error) {
      console.error("[v0] Error loading data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  const handleStatusToggle = (status: string) => {
    const newStatuses = new Set(selectedStatuses);
    if (newStatuses.has(status)) {
      newStatuses.delete(status);
    } else {
      newStatuses.add(status);
    }
    setSelectedStatuses(newStatuses);
  };

  const handleSelectApp = (appId: string) => {
    const newSelected = new Set(selectedApps);
    if (newSelected.has(appId)) {
      newSelected.delete(appId);
    } else {
      newSelected.add(appId);
    }
    setSelectedApps(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApps(new Set(applications.map((a) => a.id)));
    } else {
      setSelectedApps(new Set());
    }
  };

  const handleSendEmails = async () => {
    if (selectedApps.size === 0) {
      toast.error("Please select at least one applicant");
      return;
    }

    if (!selectedTemplate) {
      toast.error("Please select a template");
      return;
    }

    if (sendType === "scheduled" && !scheduledTime) {
      toast.error("Please select a scheduled time");
      return;
    }

    try {
      setSending(true);
      const response = await fetch("/api/automation/send-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          application_ids: Array.from(selectedApps),
          template_id: selectedTemplate,
          send_type: sendType,
          scheduled_at: sendType === "scheduled" ? scheduledTime : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setSelectedApps(new Set());
        setSelectedTemplate("");
        setScheduledTime("");
      } else {
        toast.error(data.error || "Failed to send emails");
      }
    } catch (error) {
      console.error("[v0] Error sending emails:", error);
      toast.error("Failed to send emails");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Send Bulk Emails</CardTitle>
          <CardDescription>
            Send emails to multiple applicants based on status filters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template Selection */}
          <div className="space-y-2">
            <Label>Email Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a template..." />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name} - {template.subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-3">
            <Label>Filter by Application Status</Label>
            <div className="grid gap-3 sm:grid-cols-2">
              {STATUS_FILTERS.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={selectedStatuses.has(status)}
                    onCheckedChange={() => handleStatusToggle(status)}
                  />
                  <Label
                    htmlFor={`status-${status}`}
                    className="cursor-pointer capitalize font-normal"
                  >
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Send Type Selection */}
          <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
            <Label>When to Send?</Label>
            <RadioGroup value={sendType} onValueChange={(value: any) => setSendType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="immediate" id="immediate" />
                <Label htmlFor="immediate" className="cursor-pointer font-normal">
                  Send immediately
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scheduled" id="scheduled" />
                <Label htmlFor="scheduled" className="cursor-pointer font-normal">
                  Schedule for later
                </Label>
              </div>
            </RadioGroup>

            {sendType === "scheduled" && (
              <div className="mt-4 space-y-2 border-t pt-4">
                <Label htmlFor="scheduledTime">Schedule Date & Time</Label>
                <Input
                  id="scheduledTime"
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Applicant Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                Select Applicants ({selectedApps.size} selected)
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSelectAll(selectedApps.size !== applications.length)}
              >
                {selectedApps.size === applications.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
            </div>

            {applications.length > 0 ? (
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedApps.size === applications.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications.map((app) => (
                      <TableRow key={app.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedApps.has(app.id)}
                            onCheckedChange={() => handleSelectApp(app.id)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{app.full_name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {app.email}
                        </TableCell>
                        <TableCell text-sm>{(app.jobs as any)?.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {app.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <Mail className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <p className="mt-2 text-muted-foreground">
                  No applicants match the selected status filters
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={handleSendEmails}
            disabled={sending || selectedApps.size === 0 || !selectedTemplate}
            className="w-full"
            size="lg"
          >
            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {sendType === "immediate" ? "Send" : "Schedule"} Emails ({selectedApps.size})
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
