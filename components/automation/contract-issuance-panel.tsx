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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, Download } from "lucide-react";
import { toast } from "sonner";

interface Template {
  id: string;
  name: string;
  template_type: string;
}

interface Application {
  id: string;
  full_name: string;
  email: string;
  status: string;
  jobs?: { title: string } | null;
}

interface ContractData {
  startDate: string;
  salary: string;
  location: string;
  reportingTo: string;
}

export default function ContractIssuancePanel() {
  const supabase = createClient();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApps, setSelectedApps] = useState<Set<string>>(new Set());
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [documentType, setDocumentType] = useState<"contract" | "offer_letter">("offer_letter");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [contractData, setContractData] = useState<ContractData>({
    startDate: "",
    salary: "",
    location: "",
    reportingTo: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      // Load templates
      const templatesRes = await fetch(
        `/api/automation/templates?type=${documentType}`
      );
      const templatesData = await templatesRes.json();
      setTemplates(templatesData.templates || []);

      // Load applications with "offered" or "interview" status
      const { data: apps } = await supabase
        .from("applications")
        .select(`id, full_name, email, status, jobs(title)`)
        .in("status", ["shortlisted", "interview", "offered"]);

      setApplications((apps as any) || []);
    } catch (error) {
      console.error("[v0] Error loading data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

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

  const handleGenerateContracts = async () => {
    if (selectedApps.size === 0) {
      toast.error("Please select at least one applicant");
      return;
    }

    if (!selectedTemplate) {
      toast.error("Please select a template");
      return;
    }

    if (!contractData.startDate || !contractData.salary) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setGenerating(true);
      let successCount = 0;
      let errorCount = 0;

      for (const appId of selectedApps) {
        try {
          const response = await fetch("/api/automation/generate-contract", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              application_id: appId,
              template_id: selectedTemplate,
              document_type: documentType,
              template_data: contractData,
            }),
          });

          if (response.ok) {
            successCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          console.error("[v0] Error generating contract:", error);
          errorCount++;
        }
      }

      toast.success(
        `Generated ${successCount} ${documentType === "contract" ? "contract" : "offer letter"}(s)${
          errorCount > 0 ? ` (${errorCount} failed)` : ""
        }`
      );

      // Reset selections
      setSelectedApps(new Set());
      setSelectedTemplate("");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Contracts & Offer Letters</CardTitle>
          <CardDescription>
            Create and send employment contracts or offer letters to selected applicants
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Template and Type Selection */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Document Type</Label>
              <Select
                value={documentType}
                onValueChange={(value: any) => {
                  setDocumentType(value);
                  setSelectedTemplate("");
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="offer_letter">Offer Letter</SelectItem>
                  <SelectItem value="contract">Employment Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Template</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template..." />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contract Details */}
          <div className="rounded-lg border bg-muted/30 p-4">
            <h3 className="mb-4 font-medium">Document Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={contractData.startDate}
                  onChange={(e) =>
                    setContractData({ ...contractData, startDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Salary *</Label>
                <Input
                  id="salary"
                  placeholder="e.g., $60,000"
                  value={contractData.salary}
                  onChange={(e) =>
                    setContractData({ ...contractData, salary: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., New York, NY"
                  value={contractData.location}
                  onChange={(e) =>
                    setContractData({ ...contractData, location: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportingTo">Reporting To</Label>
                <Input
                  id="reportingTo"
                  placeholder="e.g., HR Manager"
                  value={contractData.reportingTo}
                  onChange={(e) =>
                    setContractData({ ...contractData, reportingTo: e.target.value })
                  }
                />
              </div>
            </div>
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
              <div className="rounded-lg border">
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
                <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <p className="mt-2 text-muted-foreground">
                  No applicants available for contract issuance
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={handleGenerateContracts}
            disabled={generating || selectedApps.size === 0 || !selectedTemplate}
            className="w-full"
            size="lg"
          >
            {generating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Generate {documentType === "contract" ? "Contracts" : "Offer Letters"} (
            {selectedApps.size})
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
