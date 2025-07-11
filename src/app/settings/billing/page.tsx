import React, { Suspense } from "react";
import { Metadata } from "next";
import SmsBillingContent from "@/components/settings/SmsBillingContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = {
  title: "SMS Usage & Billing",
  description: "View your SMS usage, billing, and manage your plan.",
};

function SmsBillingPage() {
  return (
    <>
      <DashboardHeader title="SMS Usage & Billing" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <SmsBillingContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
SmsBillingPage.dashboardTitle = "SMS Usage & Billing";

export default SmsBillingPage; 