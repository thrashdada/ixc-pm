import React, { Suspense } from "react";
import ContractorRatingsContent from "@/components/contractors/ContractorRatingsContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function ContractorRatingsPage() {
  return (
    <>
      <DashboardHeader title="Contractor Ratings & Performance" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <ContractorRatingsContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ContractorRatingsPage.dashboardTitle = "Contractor Ratings & Performance";

export default ContractorRatingsPage; 