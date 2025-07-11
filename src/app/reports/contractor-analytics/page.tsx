import React, { Suspense } from "react";
import { Metadata } from "next";
import ContractorAnalyticsContent from "@/components/reports/ContractorAnalyticsContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = {
  title: "Contractor Analytics",
  description: "Analytics and insights for contractor performance and management",
};

function ContractorAnalyticsPage() {
  return (
    <>
      <DashboardHeader title="Contractor Analytics" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <ContractorAnalyticsContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ContractorAnalyticsPage.dashboardTitle = "Contractor Analytics";

export default ContractorAnalyticsPage; 