import React, { Suspense } from "react";
import { Metadata } from "next";
import CompanyProfileContent from "@/components/settings/CompanyProfileContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = {
  title: "Company Profile",
  description: "Manage your company information and branding.",
};

function CompanyProfilePage() {
  return (
    <>
      <DashboardHeader title="Company Profile" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <CompanyProfileContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
CompanyProfilePage.dashboardTitle = "Company Profile";

export default CompanyProfilePage; 