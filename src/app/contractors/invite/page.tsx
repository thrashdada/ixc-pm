import React, { Suspense } from "react";
import InviteContractorsContent from "@/components/contractors/InviteContractorsContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function InviteContractorsPage() {
  return (
    <>
      <DashboardHeader title="Invite Contractors" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <InviteContractorsContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
InviteContractorsPage.dashboardTitle = "Invite Contractors";

export default InviteContractorsPage; 