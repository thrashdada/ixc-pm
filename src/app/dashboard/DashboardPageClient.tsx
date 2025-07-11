'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  Bell
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import PropertyManagerDashboard from "@/components/dashboard/PropertyManagerDashboard";
import ContractorDashboard from "@/components/dashboard/ContractorDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import AccountantDashboard from "@/components/dashboard/AccountantDashboard";

const ROLES = ["pm", "contractor", "admin", "accountant"] as const;
type Role = typeof ROLES[number];

export default function DashboardPageClient() {
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

  // Mock notifications - general content applicable to all roles
  const notifications = [
    { id: 1, text: "System maintenance scheduled for tonight at 2 AM", unread: true },
    { id: 2, text: "New security update available", unread: true },
    { id: 3, text: "Weekly report is ready for download", unread: false },
    { id: 4, text: "Your profile has been updated successfully", unread: false },
    { id: 5, text: "Backup completed successfully", unread: false },
    { id: 6, text: "New feature available: Enhanced photo upload", unread: true },
  ];
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative rounded-full p-2 hover:bg-muted focus:outline-none">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-red-600 text-white rounded-full" variant="destructive">
                    {unreadCount}
                  </Badge>
                )}
                <span className="sr-only">View notifications</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length === 0 ? (
                <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
              ) : (
                notifications.map((n) => (
                  <DropdownMenuItem key={n.id} className={n.unread ? "font-semibold" : ""}>
                    {n.text}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </header>
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