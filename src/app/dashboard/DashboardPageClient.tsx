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
  PlusCircle,
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

  // Mock notifications
  const notifications = [
    { id: 1, text: "New job accepted by contractor", unread: true },
    { id: 2, text: "Photo uploaded for WO-1023", unread: true },
    { id: 3, text: "Job WO-1022 completed", unread: false },
    { id: 4, text: "Tenant note added to WO-1021", unread: false },
    { id: 5, text: "Contractor has a question", unread: true },
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {/* A. Work Order Overview */}
      <Card className="col-span-1 xl:col-span-1">
        <CardHeader>
          <CardTitle>Work Order Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">En Route</span>
              <span className="text-blue-600 font-bold">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">In Progress</span>
              <span className="text-yellow-600 font-bold">5</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Completed</span>
              <span className="text-green-600 font-bold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-red-600">Priority Alerts</span>
              <span className="text-red-600 font-bold">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Pending Reviews</span>
              <span className="font-bold">4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">New Contractor Invoices</span>
              <span className="font-bold">1</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* B. Today's Schedule / Activity Feed */}
      <Card className="col-span-1 xl:col-span-1">
        <CardHeader>
          <CardTitle>Today&apos;s Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500 inline-block" />
              9:00 AM - WO-1023 (En Route)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500 inline-block" />
              10:30 AM - WO-1024 (In Progress)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
              1:00 PM - WO-1025 (Complete)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-gray-400 inline-block" />
              3:00 PM - WO-1026 (Scheduled)
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* D. Performance Snapshot */}
      <Card className="col-span-1 xl:col-span-1">
        <CardHeader>
          <CardTitle>Performance Snapshot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span>Avg. Response Time</span>
              <span className="font-bold">1.2h</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Completion Rate</span>
              <span className="font-bold">92%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Most Active Contractors</span>
              <span className="font-bold">J. Smith, A. Lee</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Maintenance Spend</span>
              <span className="font-bold">$3,200</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* E. Quick Access Panels */}
      <Card className="col-span-1 xl:col-span-2">
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-semibold mb-1">Properties With Open Jobs</div>
              <ul className="space-y-1">
                <li>Maple Apartments (2 jobs)</li>
                <li>Oak Villas (1 job)</li>
                <li>Pine Estates (1 job)</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-1">Frequent Contractors</div>
              <ul className="space-y-1">
                <li>J. Smith</li>
                <li>A. Lee</li>
                <li>M. Patel</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button size="sm" variant="default">Create New Work Order</Button>
            <Button size="sm" variant="outline">Invite Contractor</Button>
          </div>
        </CardContent>
      </Card>

      {/* F. Quick Communication */}
      <Card className="col-span-1 xl:col-span-1">
        <CardHeader>
          <CardTitle>Quick Communication</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li><a href="#" className="text-blue-600 hover:underline">Ongoing Job Messages</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">PM-wide Inbox</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Message Templates</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Emergency Contacts</a></li>
          </ul>
        </CardContent>
      </Card>

      {/* G. Checklist / Tasks */}
      <Card className="col-span-1 xl:col-span-1">
        <CardHeader>
          <CardTitle>Checklist / Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>3 jobs pending sign-off</li>
            <li>2 properties missing access info</li>
            <li>Contractor needs approval</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function ContractorDashboard() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {/* A. Active Jobs Overview */}
      <Card className="col-span-1 xl:col-span-1">
        <CardHeader>
          <CardTitle>Active Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">In Progress</span>
              <span className="text-blue-600 font-bold">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Pending Acceptance</span>
              <span className="text-yellow-600 font-bold">1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Completed</span>
              <span className="text-green-600 font-bold">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Declined / Canceled</span>
              <span className="text-gray-500 font-bold">0</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* B. Recent Updates */}
      <Card className="col-span-1 xl:col-span-1">
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>WO-1023: New message from PM</li>
            <li>WO-1024: Photo approved</li>
            <li>WO-1025: Marked as completed</li>
            <li>WO-1026: Invoice paid</li>
          </ul>
        </CardContent>
      </Card>

      {/* C. Next Steps */}
      <Card className="col-span-1 xl:col-span-1">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>Accept job WO-1027</li>
            <li>Upload photos for WO-1023</li>
            <li>Submit invoice for WO-1025</li>
          </ul>
        </CardContent>
      </Card>

      {/* D. Quick Access Panels */}
      <Card className="col-span-1 xl:col-span-2">
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-semibold mb-1">Upload Center</div>
              <ul className="space-y-1">
                <li><a href="#" className="text-blue-600 hover:underline">Upload Photos</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Submit Invoice</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Mark as Completed</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-1">Messages</div>
              <ul className="space-y-1">
                <li><a href="#" className="text-blue-600 hover:underline">Job Messages</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Voice Notes</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Quick Replies</a></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* E. Profile, History, Support */}
      <Card className="col-span-1 xl:col-span-2">
        <CardHeader>
          <CardTitle>Profile, History &amp; Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="font-semibold mb-1">Profile & Settings</div>
              <ul className="space-y-1">
                <li><a href="#" className="text-blue-600 hover:underline">My Profile</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Certifications & Insurance</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Bank Details</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-1">History</div>
              <ul className="space-y-1">
                <li><a href="#" className="text-blue-600 hover:underline">Work History</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Ratings & Feedback</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Before/After Portfolio</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-1">Support</div>
              <ul className="space-y-1">
                <li><a href="#" className="text-blue-600 hover:underline">FAQ / Help Center</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Contact Support</a></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
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