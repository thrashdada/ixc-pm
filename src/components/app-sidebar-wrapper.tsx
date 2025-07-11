'use client';

import { Suspense } from "react";
import { AppSidebar } from "./app-sidebar";
import { LoadingSkeleton } from "./ui/loading-skeleton";

function SidebarContent() {
  return <AppSidebar />;
}

export function AppSidebarWrapper() {
  return (
    <Suspense fallback={<LoadingSkeleton type="list" />}>
      <SidebarContent />
    </Suspense>
  );
} 