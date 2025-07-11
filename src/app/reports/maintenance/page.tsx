import React, { Suspense } from "react";
import { Metadata } from "next";
import MaintenanceTrendsContent from "@/components/reports/MaintenanceTrendsContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = {
  title: "Maintenance Trends",
  description: "Analytics and trends for property maintenance activities",
};

function MaintenanceTrendsPage() {
  return (
    <>
      <DashboardHeader title="Maintenance Trends" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <MaintenanceTrendsContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
MaintenanceTrendsPage.dashboardTitle = "Maintenance Trends";

export default MaintenanceTrendsPage; 