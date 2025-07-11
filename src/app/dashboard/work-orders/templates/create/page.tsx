import React, { Suspense } from "react";
import CreateTemplateContent from "@/components/work-orders/CreateTemplateContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function CreateTemplatePage() {
  return (
    <>
      <DashboardHeader title="Create Template" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <CreateTemplateContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
CreateTemplatePage.dashboardTitle = "Create Template";

export default CreateTemplatePage; 