import React, { Suspense } from "react";
import MaintenanceSchedulesContent from "@/components/properties/MaintenanceSchedulesContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function MaintenanceSchedulesPage() {
  return (
    <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
      <MaintenanceSchedulesContent />
    </Suspense>
  );
} 