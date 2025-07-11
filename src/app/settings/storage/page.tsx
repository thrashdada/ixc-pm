import React, { Suspense } from "react";
import { Metadata } from "next";
import StorageSettingsContent from "@/components/settings/StorageSettingsContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = {
  title: "Photo/Storage Settings",
  description: "Manage your photo upload and storage preferences.",
};

function StorageSettingsPage() {
  return (
    <>
      <DashboardHeader title="Photo/Storage Settings" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <StorageSettingsContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
StorageSettingsPage.dashboardTitle = "Photo/Storage Settings";

export default StorageSettingsPage; 