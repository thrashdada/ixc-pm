import React, { Suspense } from "react";
import { Metadata } from "next";
import TeamMembersContent from "@/components/settings/TeamMembersContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export const metadata: Metadata = {
  title: "Team Members & Roles",
  description: "Manage your team members and their roles.",
};

function TeamMembersPage() {
  return (
    <>
      <DashboardHeader title="Team Members & Roles" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <TeamMembersContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
TeamMembersPage.dashboardTitle = "Team Members & Roles";

export default TeamMembersPage; 