'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyManagerDashboard from "@/components/dashboard/PropertyManagerDashboard";
import ContractorDashboard from "@/components/dashboard/ContractorDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import AccountantDashboard from "@/components/dashboard/AccountantDashboard";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

const ROLES = ["pm", "contractor", "admin", "accountant"] as const;
type Role = typeof ROLES[number];

function DashboardPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlRole = searchParams.get("role");
  const initialRole: Role = ROLES.includes(urlRole as Role) ? (urlRole as Role) : "pm";
  const [role, setRole] = useState<Role>(initialRole);

  // Update URL when role changes
  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (role !== urlRole) {
      params.set("role", role);
      router.replace(`?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  // Update state if URL changes (e.g. back/forward navigation)
  useEffect(() => {
    if (urlRole && ROLES.includes(urlRole as Role) && urlRole !== role) {
      setRole(urlRole as Role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlRole]);

  return (
    <>
      <DashboardHeader title="Dashboard" />
      <div className="flex-1 space-y-4 p-8 pt-6 bg-muted/50">
        {role === "pm" && (
          <PropertyManagerDashboard />
        )}
        {role === "contractor" && (
          <ContractorDashboard />
        )}
        {role === "admin" && (
          <AdminDashboard />
        )}
        {role === "accountant" && (
          <AccountantDashboard />
        )}
      </div>
    </>
  )
}

// Set the dashboard title for the layout header
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
DashboardPageClient.dashboardTitle = "Dashboard";

export default DashboardPageClient; 