import React, { Suspense } from "react";
import WorkOrderThreadsContent from "@/components/messages/WorkOrderThreadsContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function WorkOrderThreadsPage() {
  return (
    <>
      <DashboardHeader title="Work Order Threads" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <WorkOrderThreadsContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
WorkOrderThreadsPage.dashboardTitle = "Work Order Threads";

export default WorkOrderThreadsPage; 