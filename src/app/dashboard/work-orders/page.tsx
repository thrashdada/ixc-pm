import React, { Suspense } from "react";
import AllWorkOrdersContent from "@/components/work-orders/AllWorkOrdersContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function AllWorkOrdersPage() {
  return (
    <>
      <DashboardHeader title="Work Orders" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <AllWorkOrdersContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
AllWorkOrdersPage.dashboardTitle = "Work Orders";

export default AllWorkOrdersPage; 