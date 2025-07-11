import React, { Suspense } from "react";
import UnitsAndAccessContent from "@/components/properties/UnitsAndAccessContent";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function UnitsAndAccessPage() {
  return (
    <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
      <UnitsAndAccessContent />
    </Suspense>
  );
} 