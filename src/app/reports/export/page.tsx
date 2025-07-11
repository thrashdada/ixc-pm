import React, { Suspense } from "react";
import { Metadata } from "next";
import ExportDataContent from "@/components/reports/ExportDataContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = {
  title: "Export Data",
  description: "Export property management data in various formats.",
};

function ExportDataPage() {
  return (
    <>
      <DashboardHeader title="Export Data" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <ExportDataContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ExportDataPage.dashboardTitle = "Export Data";

export default ExportDataPage; 