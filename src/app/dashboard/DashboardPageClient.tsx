'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  Activity,
  PlusCircle
} from "lucide-react"

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

  return (
    <>
      <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button className="gap-2" variant="default" size="sm">
            <PlusCircle className="h-4 w-4" />
            Quick Create
          </Button>
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

function PropertyManagerDashboard() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Property Manager Overview</h2>
      </div>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Work Orders</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 urgent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contractors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">1 new this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">2 unread</p>
          </CardContent>
        </Card>
      </div>
      {/* Recent Work Orders Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Work Orders</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left font-semibold">Order #</th>
                <th className="py-2 px-4 text-left font-semibold">Property</th>
                <th className="py-2 px-4 text-left font-semibold">Status</th>
                <th className="py-2 px-4 text-left font-semibold">Contractor</th>
                <th className="py-2 px-4 text-left font-semibold">Due</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-muted/50">
                <td className="py-2 px-4">WO-1023</td>
                <td className="py-2 px-4">Maple Apartments</td>
                <td className="py-2 px-4 text-blue-600 font-medium">In Progress</td>
                <td className="py-2 px-4">J. Smith</td>
                <td className="py-2 px-4">Tomorrow</td>
              </tr>
              <tr className="border-b hover:bg-muted/50">
                <td className="py-2 px-4">WO-1022</td>
                <td className="py-2 px-4">Oak Villas</td>
                <td className="py-2 px-4 text-green-600 font-medium">Completed</td>
                <td className="py-2 px-4">A. Lee</td>
                <td className="py-2 px-4">2 days ago</td>
              </tr>
              <tr className="border-b hover:bg-muted/50">
                <td className="py-2 px-4">WO-1021</td>
                <td className="py-2 px-4">Pine Estates</td>
                <td className="py-2 px-4 text-yellow-600 font-medium">Pending</td>
                <td className="py-2 px-4">M. Patel</td>
                <td className="py-2 px-4">Friday</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
      {/* Properties List */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Managed Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" /> Maple Apartments (12 units)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 inline-block" /> Oak Villas (8 units)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500 inline-block" /> Pine Estates (15 units)
            </li>
          </ul>
        </CardContent>
      </Card>
      {/* Recent Contractor Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Contractor Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li>
              <span className="font-medium">J. Smith</span> uploaded photos for <span className="font-medium">WO-1023</span> <span className="text-muted-foreground">(1 hour ago)</span>
            </li>
            <li>
              <span className="font-medium">A. Lee</span> marked <span className="font-medium">WO-1022</span> as completed <span className="text-muted-foreground">(yesterday)</span>
            </li>
            <li>
              <span className="font-medium">M. Patel</span> sent a message <span className="text-muted-foreground">(2 days ago)</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
}

function ContractorDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Contractor Overview</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Jobs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">1 due today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Work Uploaded</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 new</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$800</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>
      {/* Add more widgets as needed */}
    </>
  );
}

function AdminDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Platform Admin Overview</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">5 new today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">2 open</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Analytics</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,000</div>
            <p className="text-xs text-muted-foreground">MTD Revenue</p>
          </CardContent>
        </Card>
      </div>
      {/* Add more widgets as needed */}
    </>
  );
}

function AccountantDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Accountant Overview</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">$2,400 total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">$7,800 total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contractor Payments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,200</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Financial Reports</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Q2 Ready</div>
            <p className="text-xs text-muted-foreground">Download available</p>
          </CardContent>
        </Card>
      </div>
      {/* Add more widgets as needed */}
    </>
  );
} 