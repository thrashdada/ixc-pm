import React, { Suspense } from "react";
import WorkOrderTemplatesContent from "@/components/work-orders/WorkOrderTemplatesContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function WorkOrderTemplatesPage() {
  return (
    <>
      <DashboardHeader title="Work Order Templates" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <WorkOrderTemplatesContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
WorkOrderTemplatesPage.dashboardTitle = "Work Order Templates";

export default WorkOrderTemplatesPage; 