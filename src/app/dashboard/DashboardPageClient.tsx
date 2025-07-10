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
  Bell,
  Download,
  ClipboardList,
  LifeBuoy,
  ShieldCheck,
  AlertTriangle,
  ShieldOff,
  BarChart2,
  Settings2,
  Database,
  FileText,
  Building2,
  MessageCircle,
  UploadCloud,
  CheckCircle2,
  StarHalf,
  FileInput
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

function PropertyManagerDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Property Manager Overview</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Work Order
          </Button>
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Invite Contractor
          </Button>
        </div>
      </div>

      {/* A. Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Work Orders</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">3 en route, 5 in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 with open jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contractors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 active today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Priority Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">2</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      {/* B. Work Order Management */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Work Order Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-2">Status Breakdown</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>En Route</span>
                    <span className="font-semibold text-blue-600">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>In Progress</span>
                    <span className="font-semibold text-yellow-600">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed</span>
                    <span className="font-semibold text-green-600">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Review</span>
                    <span className="font-semibold text-orange-600">4</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Performance Metrics</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Avg. Response Time</span>
                    <span className="font-semibold">1.2h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completion Rate</span>
                    <span className="font-semibold text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Invoices</span>
                    <span className="font-semibold text-orange-600">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Spend</span>
                    <span className="font-semibold">$8,450</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View All Work Orders</Button>
              <Button size="sm" variant="outline">Create New Order</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>9:00 AM - WO-1023 (En Route)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>10:30 AM - WO-1024 (In Progress)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>1:00 PM - WO-1025 (Complete)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>3:00 PM - WO-1026 (Scheduled)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>5:00 PM - WO-1027 (Priority)</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-3">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* C. Property & Contractor Management */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Properties Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Maple Apartments</span>
                  <span className="font-semibold">2 open jobs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Oak Villas</span>
                  <span className="font-semibold">1 open job</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pine Estates</span>
                  <span className="font-semibold">1 open job</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Elm Gardens</span>
                  <span className="font-semibold text-green-600">All clear</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm">
                  <div className="font-semibold">Maintenance Summary</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• 4 properties with active work</div>
                    <div>• 8 properties maintenance-free</div>
                    <div>• 2 emergency requests today</div>
                  </div>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              Property Management
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contractor Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>J. Smith (Plumbing)</span>
                  <span className="font-semibold text-green-600">4.8★</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>A. Lee (Electrical)</span>
                  <span className="font-semibold text-green-600">4.6★</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>M. Patel (HVAC)</span>
                  <span className="font-semibold text-yellow-600">4.2★</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>R. Johnson (General)</span>
                  <span className="font-semibold text-green-600">4.7★</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm">
                  <div className="font-semibold">Active Contractors</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• 3 contractors on-site today</div>
                    <div>• 2 pending job assignments</div>
                    <div>• 1 contractor available</div>
                  </div>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              Contractor Management
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>WO-1025 completed</span>
                <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>New work order created</span>
                <span className="text-xs text-muted-foreground ml-auto">15m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Contractor arrived on-site</span>
                <span className="text-xs text-muted-foreground ml-auto">1h ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Priority alert: WO-1027</span>
                <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Invoice submitted</span>
                <span className="text-xs text-muted-foreground ml-auto">3h ago</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* D. Communication & Tasks */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Communication Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Unread Messages</span>
                  <span className="font-semibold text-blue-600">5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ongoing Conversations</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Emergency Contacts</span>
                  <span className="font-semibold">12</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Quick Actions</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Send bulk message to contractors</div>
                    <div>• Create message template</div>
                    <div>• Update emergency contacts</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Messages</Button>
              <Button size="sm" variant="outline">Send Message</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks & Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pending Approvals</span>
                  <span className="font-semibold text-orange-600">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Missing Access Info</span>
                  <span className="font-semibold text-red-600">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Contractor Approvals</span>
                  <span className="font-semibold text-yellow-600">1</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Priority Items</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Review WO-1027 photos</div>
                    <div>• Approve contractor invoice</div>
                    <div>• Update property access codes</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View All Tasks</Button>
              <Button size="sm" variant="outline">Mark Complete</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* E. Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Property Management Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <PlusCircle className="h-6 w-6 mb-2" />
              <span className="text-sm">Create Work Order</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">Invite Contractor</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Building2 className="h-6 w-6 mb-2" />
              <span className="text-sm">Property Management</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <ClipboardList className="h-6 w-6 mb-2" />
              <span className="text-sm">Work Orders</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <MessageCircle className="h-6 w-6 mb-2" />
              <span className="text-sm">Messages</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <BarChart2 className="h-6 w-6 mb-2" />
              <span className="text-sm">Reports</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Settings2 className="h-6 w-6 mb-2" />
              <span className="text-sm">Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Bell className="h-6 w-6 mb-2" />
              <span className="text-sm">Notifications</span>
            </Button>
          </div>
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
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <UploadCloud className="h-4 w-4 mr-2" />
            Upload Photos
          </Button>
          <Button variant="outline" size="sm">
            <FileInput className="h-4 w-4 mr-2" />
            Submit Invoice
          </Button>
        </div>
      </div>

      {/* A. Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 in progress, 1 pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,450</div>
            <p className="text-xs text-muted-foreground">3 invoices pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <StarHalf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">4.8★</div>
            <p className="text-xs text-muted-foreground">Based on 24 reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* B. Job Management */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Job Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-2">Job Status</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>In Progress</span>
                    <span className="font-semibold text-blue-600">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Acceptance</span>
                    <span className="font-semibold text-yellow-600">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed</span>
                    <span className="font-semibold text-green-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Declined/Canceled</span>
                    <span className="font-semibold text-gray-500">0</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Performance Metrics</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Avg. Completion Time</span>
                    <span className="font-semibold">2.3 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Acceptance Rate</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Invoices</span>
                    <span className="font-semibold text-orange-600">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monthly Earnings</span>
                    <span className="font-semibold">$4,200</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View All Jobs</Button>
              <Button size="sm" variant="outline">Job History</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>WO-1025: Invoice paid</span>
                <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>WO-1026: New message</span>
                <span className="text-xs text-muted-foreground ml-auto">15m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>WO-1027: Job assigned</span>
                <span className="text-xs text-muted-foreground ml-auto">1h ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>WO-1024: Photos approved</span>
                <span className="text-xs text-muted-foreground ml-auto">2h ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>WO-1023: Started work</span>
                <span className="text-xs text-muted-foreground ml-auto">3h ago</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-3">
              View All Updates
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* C. Upload Center & Payments */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upload Center</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Photos Pending</span>
                  <span className="font-semibold text-orange-600">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Invoices Pending</span>
                  <span className="font-semibold text-yellow-600">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completed Uploads</span>
                  <span className="font-semibold text-green-600">12</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Quick Actions</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Upload job photos</div>
                    <div>• Submit invoice</div>
                    <div>• Mark job complete</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Upload Photos</Button>
              <Button size="sm" variant="outline">Submit Invoice</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Pending Payment</span>
                  <span className="font-semibold">$2,450</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Paid This Month</span>
                  <span className="font-semibold text-green-600">$4,200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Next Payment</span>
                  <span className="font-semibold">$780</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Payment History</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• WO-1025: $450 (paid)</div>
                    <div>• WO-1024: $320 (pending)</div>
                    <div>• WO-1023: $780 (pending)</div>
                  </div>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              Payment History
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Messages & Communication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Unread Messages</span>
                  <span className="font-semibold text-blue-600">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Active Conversations</span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Voice Notes</span>
                  <span className="font-semibold">2</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Recent Messages</div>
                  <div className="text-xs text-muted-foreground mt-1">
                                         <div>• PM: &quot;Photos look great!&quot;</div>
                     <div>• PM: &quot;When will you finish?&quot;</div>
                     <div>• System: &quot;Invoice approved&quot;</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View Messages</Button>
              <Button size="sm" variant="outline">Send Message</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* D. Profile & Support */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile & Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Profile Completion</span>
                  <span className="font-semibold text-green-600">95%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Certifications</span>
                  <span className="font-semibold">3 active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Insurance Status</span>
                  <span className="font-semibold text-green-600">Valid</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bank Details</span>
                  <span className="font-semibold text-green-600">Verified</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Quick Actions</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Update profile information</div>
                    <div>• Renew certifications</div>
                    <div>• Update bank details</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Edit Profile</Button>
              <Button size="sm" variant="outline">View Certifications</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support & Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Open Support Tickets</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>FAQ Articles</span>
                  <span className="font-semibold">24 available</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Training Videos</span>
                  <span className="font-semibold">8 available</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Help Resources</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• How to upload photos</div>
                    <div>• Invoice submission guide</div>
                    <div>• Contact support team</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Help Center</Button>
              <Button size="sm" variant="outline">Contact Support</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* E. Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Contractor Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <UploadCloud className="h-6 w-6 mb-2" />
              <span className="text-sm">Upload Photos</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <FileInput className="h-6 w-6 mb-2" />
              <span className="text-sm">Submit Invoice</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <CheckCircle2 className="h-6 w-6 mb-2" />
              <span className="text-sm">Mark Complete</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <ClipboardList className="h-6 w-6 mb-2" />
              <span className="text-sm">My Jobs</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <MessageCircle className="h-6 w-6 mb-2" />
              <span className="text-sm">Messages</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              <span className="text-sm">Payments</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Settings2 className="h-6 w-6 mb-2" />
              <span className="text-sm">Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <LifeBuoy className="h-6 w-6 mb-2" />
              <span className="text-sm">Support</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function AdminDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Platform Admin Overview</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            System Status
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* A. Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Work Orders</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">23 pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
            <LifeBuoy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">2 high priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Good</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* B. User Management & Security */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-2">User Types</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Property Managers</span>
                    <span className="font-semibold">342</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contractors</span>
                    <span className="font-semibold">891</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accountants</span>
                    <span className="font-semibold">14</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Verification Status</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Pending Verification</span>
                    <span className="font-semibold text-orange-600">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flagged Users</span>
                    <span className="font-semibold text-red-600">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recently Active</span>
                    <span className="font-semibold text-green-600">156</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View All Users</Button>
              <Button size="sm" variant="outline">Verification Queue</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950/20 rounded">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <div className="text-sm">
                  <div className="font-semibold">Failed Login Attempts</div>
                  <div className="text-xs text-muted-foreground">3 users in last hour</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                <ShieldOff className="h-4 w-4 text-yellow-600" />
                <div className="text-sm">
                  <div className="font-semibold">Suspicious Activity</div>
                  <div className="text-xs text-muted-foreground">1 user flagged</div>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-950/20 rounded">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <div className="text-sm">
                  <div className="font-semibold">System Secure</div>
                  <div className="text-xs text-muted-foreground">No threats detected</div>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-3">
              View Security Logs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* C. System Monitoring & Analytics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">$24,500</div>
                <p className="text-xs text-muted-foreground">Monthly Revenue</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Active Work Orders</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completed This Month</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg. Response Time</span>
                  <span className="font-semibold">2.3h</span>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">CPU Usage</span>
                  <span className="text-sm font-semibold">67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Memory Usage</span>
                  <span className="text-sm font-semibold">42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Storage</span>
                  <span className="text-sm font-semibold">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              System Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>New user registration</span>
                <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Work order completed</span>
                <span className="text-xs text-muted-foreground ml-auto">5m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Support ticket opened</span>
                <span className="text-xs text-muted-foreground ml-auto">12m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Failed login attempt</span>
                <span className="text-xs text-muted-foreground ml-auto">15m ago</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Payment processed</span>
                <span className="text-xs text-muted-foreground ml-auto">23m ago</span>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* D. Support & Maintenance */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Open Tickets</span>
                <span className="font-semibold">7</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>High Priority</span>
                  <span className="text-red-600 font-semibold">2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Medium Priority</span>
                  <span className="text-yellow-600 font-semibold">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Low Priority</span>
                  <span className="text-green-600 font-semibold">2</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Recent Tickets</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Payment processing issue (2h ago)</div>
                    <div>• Photo upload failed (4h ago)</div>
                    <div>• Account verification request (6h ago)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View All Tickets</Button>
              <Button size="sm" variant="outline">Create Ticket</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Last Backup</span>
                  <span className="font-semibold">2 hours ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Next Scheduled</span>
                  <span className="font-semibold">22 hours</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Database Size</span>
                  <span className="font-semibold">2.4 GB</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Upcoming Maintenance</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Security patches (Tomorrow 2AM)</div>
                    <div>• Database optimization (Sunday 3AM)</div>
                    <div>• Feature deployment (Next week)</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Maintenance Log</Button>
              <Button size="sm" variant="outline">Schedule Maintenance</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* E. Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Administrative Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">User Management</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <ShieldCheck className="h-6 w-6 mb-2" />
              <span className="text-sm">Security Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <BarChart2 className="h-6 w-6 mb-2" />
              <span className="text-sm">Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Settings2 className="h-6 w-6 mb-2" />
              <span className="text-sm">System Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <LifeBuoy className="h-6 w-6 mb-2" />
              <span className="text-sm">Support Center</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Database className="h-6 w-6 mb-2" />
              <span className="text-sm">Storage Management</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Bell className="h-6 w-6 mb-2" />
              <span className="text-sm">Notifications</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Download className="h-6 w-6 mb-2" />
              <span className="text-sm">Export Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function AccountantDashboard() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Financial Overview</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Button variant="outline" size="sm">
            <BarChart2 className="h-4 w-4 mr-2" />
            Financial Reports
          </Button>
        </div>
      </div>

      {/* A. Key Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,450</div>
            <p className="text-xs text-muted-foreground">12 invoices pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,800</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contractor Payouts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$15,200</div>
            <p className="text-xs text-muted-foreground">8 contractors due</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">Over-budget jobs</p>
          </CardContent>
        </Card>
      </div>

      {/* B. Invoice Management */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Invoice Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="font-semibold mb-2">Invoice Status</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Pending Review</span>
                    <span className="font-semibold text-orange-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Approved</span>
                    <span className="font-semibold text-green-600">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rejected/Flagged</span>
                    <span className="font-semibold text-red-600">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Paid This Month</span>
                    <span className="font-semibold text-blue-600">18</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-semibold mb-2">Amount Summary</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Pending Amount</span>
                    <span className="font-semibold">$8,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Approved Amount</span>
                    <span className="font-semibold">$12,300</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rejected Amount</span>
                    <span className="font-semibold text-red-600">$1,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Processed</span>
                    <span className="font-semibold">$21,950</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">View All Invoices</Button>
              <Button size="sm" variant="outline">Process Payments</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded">
                <div className="text-sm">
                  <div className="font-semibold">WO-1025</div>
                  <div className="text-xs text-muted-foreground">Plumbing Repair</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$450</div>
                  <div className="text-xs text-green-600">Approved</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded">
                <div className="text-sm">
                  <div className="font-semibold">WO-1026</div>
                  <div className="text-xs text-muted-foreground">Electrical Work</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$780</div>
                  <div className="text-xs text-yellow-600">Pending</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-950/20 rounded">
                <div className="text-sm">
                  <div className="font-semibold">WO-1027</div>
                  <div className="text-xs text-muted-foreground">HVAC Service</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">$320</div>
                  <div className="text-xs text-red-600">Rejected</div>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-3">
              View Invoice History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* C. Job Costs & Budgets */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Job Costs Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-bold">$18,750</div>
                <p className="text-xs text-muted-foreground">Total Job Costs This Month</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>On Budget</span>
                  <span className="font-semibold text-green-600">15 jobs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Over Budget</span>
                  <span className="font-semibold text-red-600">3 jobs</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Under Budget</span>
                  <span className="font-semibold text-blue-600">8 jobs</span>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              View All Job Costs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Budgets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Maple Apartments</span>
                    <span className="text-sm font-semibold">$4,200 / $5,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Oak Villas</span>
                    <span className="text-sm font-semibold">$6,800 / $6,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '113%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Pine Estates</span>
                    <span className="text-sm font-semibold">$3,100 / $4,500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '69%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              Budget Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Plumbing</span>
                  <span className="font-semibold">$4,200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Electrical</span>
                  <span className="font-semibold">$3,800</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>HVAC</span>
                  <span className="font-semibold">$2,900</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>General Maintenance</span>
                  <span className="font-semibold">$7,850</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm">
                  <div className="font-semibold">Monthly Comparison</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• Plumbing: +15% vs last month</div>
                    <div>• Electrical: -8% vs last month</div>
                    <div>• HVAC: +22% vs last month</div>
                  </div>
                </div>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full mt-4">
              Export Cost Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* D. Contractor Payments */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contractor Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Ready to Pay</span>
                <span className="font-semibold">$15,200</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>J. Smith Plumbing</span>
                  <span className="font-semibold">$4,200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>A. Lee Electrical</span>
                  <span className="font-semibold">$3,800</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>M. Patel HVAC</span>
                  <span className="font-semibold">$2,900</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>R. Johnson General</span>
                  <span className="font-semibold">$4,300</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Payment Status</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• 4 contractors ready for payment</div>
                    <div>• 2 pending bank verification</div>
                    <div>• Last payment: 3 days ago</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Process Payments</Button>
              <Button size="sm" variant="outline">Payment History</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Available Reports</div>
                  <div className="text-xs text-muted-foreground mt-2 space-y-1">
                    <div>• Monthly Financial Summary</div>
                    <div>• Contractor Payment Report</div>
                    <div>• Property Budget Analysis</div>
                    <div>• Tax & Compliance Report</div>
                    <div>• Invoice Processing Report</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <div className="font-semibold">Export Options</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <div>• CSV for accounting software</div>
                    <div>• PDF for records</div>
                    <div>• Excel for analysis</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline">Generate Reports</Button>
              <Button size="sm" variant="outline">Export Data</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* E. Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Financial Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <CreditCard className="h-6 w-6 mb-2" />
              <span className="text-sm">Process Invoices</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">Contractor Payments</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <BarChart2 className="h-6 w-6 mb-2" />
              <span className="text-sm">Financial Reports</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Download className="h-6 w-6 mb-2" />
              <span className="text-sm">Export Data</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <AlertTriangle className="h-6 w-6 mb-2" />
              <span className="text-sm">Budget Alerts</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-sm">Invoice History</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Settings2 className="h-6 w-6 mb-2" />
              <span className="text-sm">Account Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Bell className="h-6 w-6 mb-2" />
              <span className="text-sm">Notifications</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
} 