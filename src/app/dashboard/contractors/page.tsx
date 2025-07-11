import React, { Suspense } from "react";
import MyContractorsContent from "@/components/contractors/MyContractorsContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function MyContractorsPage() {
  return (
    <>
      <DashboardHeader title="My Contractors" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <MyContractorsContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
MyContractorsPage.dashboardTitle = "My Contractors";

export default MyContractorsPage; 