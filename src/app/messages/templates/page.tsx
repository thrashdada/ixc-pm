import React, { Suspense } from "react";
import MessageTemplatesContent from "@/components/messages/MessageTemplatesContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

function MessageTemplatesPage() {
  return (
    <>
      <DashboardHeader title="Templates & Quick Replies" />
      <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
        <MessageTemplatesContent />
      </Suspense>
    </>
  );
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
MessageTemplatesPage.dashboardTitle = "Templates & Quick Replies";

export default MessageTemplatesPage; 