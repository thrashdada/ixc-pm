import React, { Suspense } from "react";
import AllMessagesContent from "@/components/messages/AllMessagesContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function AllMessagesPage() {
  return (
    <>
      <DashboardHeader title="All Messages" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <AllMessagesContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
AllMessagesPage.dashboardTitle = "All Messages";

export default AllMessagesPage; 