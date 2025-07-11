import React, { Suspense } from "react";
import WorkOrderApprovalsContent from "@/components/work-orders/WorkOrderApprovalsContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function WorkOrderApprovalsPage() {
  return (
    <>
      <DashboardHeader title="Work Order Approvals" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <WorkOrderApprovalsContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
WorkOrderApprovalsPage.dashboardTitle = "Work Order Approvals";

export default WorkOrderApprovalsPage; 