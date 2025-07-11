import React, { Suspense } from "react";
import JobReportsContent from "@/components/reports/JobReportsContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function JobReportsPage() {
  return (
    <>
      <DashboardHeader title="Job Reports" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <JobReportsContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
JobReportsPage.dashboardTitle = "Job Reports";

export default JobReportsPage; 