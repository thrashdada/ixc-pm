import React, { Suspense } from "react";
import CreateWorkOrderContent from "@/components/work-orders/CreateWorkOrderContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function CreateWorkOrderPage() {
  return (
    <>
      <DashboardHeader title="Create Work Order" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <CreateWorkOrderContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
CreateWorkOrderPage.dashboardTitle = "Create Work Order";

export default CreateWorkOrderPage; 