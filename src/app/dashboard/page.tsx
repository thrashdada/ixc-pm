export const dynamic = "force-dynamic";

import { Suspense } from "react";
import DashboardPageClient from "./DashboardPageClient";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingSkeleton type="dashboard" />}>
      <DashboardPageClient />
    </Suspense>
  );
} 