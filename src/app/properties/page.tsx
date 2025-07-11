import React, { Suspense } from "react";
import AllPropertiesContent from "@/components/properties/AllPropertiesContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function AllPropertiesPage() {
  return (
    <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
      <AllPropertiesContent />
    </Suspense>
  );
} 