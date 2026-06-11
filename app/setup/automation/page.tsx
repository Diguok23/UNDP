import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, FileText, Clock } from "lucide-react";
import ContractIssuancePanel from "@/components/automation/contract-issuance-panel";
import BulkEmailPanel from "@/components/automation/bulk-email-panel";
import TemplateManagementPanel from "@/components/automation/template-management-panel";

export default function AutomationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Email & Contract Automation</h1>
        <p className="text-muted-foreground">
          Manage templates, send bulk emails, and issue contracts or offer letters to applicants
        </p>
      </div>

      <Tabs defaultValue="contracts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Contracts & Offers</span>
            <span className="sm:hidden">Contracts</span>
          </TabsTrigger>
          <TabsTrigger value="bulk-email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Bulk Email</span>
            <span className="sm:hidden">Email</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Templates</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="mt-6">
          <ContractIssuancePanel />
        </TabsContent>

        <TabsContent value="bulk-email" className="mt-6">
          <BulkEmailPanel />
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <TemplateManagementPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
