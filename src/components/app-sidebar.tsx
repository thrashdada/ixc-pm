'use client';

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  LayoutDashboard,
  Building2,
  List,
  CalendarCheck2,
  ListChecks,
  PlusCircle,
  Users,
  ClipboardList,
  Bell,
  Database,
  BarChart2,
  Settings2,
  LifeBuoy,
  FileText,
  CreditCard,
  ShieldCheck,
  ShieldOff,
  LockKeyhole,
  Activity,
  ChevronDown,
  ChevronRight,
  UserCheck,
  UserCog,
  Flag,
  Search,
  AlertTriangle,
  MessageCircle,
  FileStack,
  UploadCloud,
  XCircle,
  StarHalf,
  KeyRound,
  Lock,
  Bug,
  FileBarChart2,
  PieChart,
  TrendingUp,
  Download,
  Wrench,
  Key,
  Zap,
  PauseCircle,
  Mail,
  BookOpen,
  FileInput,
  Image as ImageIcon,
  HelpCircle,
  PhoneCall,
  Eye,
  Trash2,
  Banknote,
  CheckCircle2,
  HardHat,
  Users2,
  UserPlus2,
  MessageSquare,
  Building,
  ImageDown,
  BadgeCheck,
  Camera,
  Mic,
  User,
  ChevronsUpDown,
  Check,
  LogOut,
  LucideIcon,
  TrendingDown,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Add type for sidebar section and subItem

type SidebarSubItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

type SidebarSection = {
  key: string;
  title: string;
  icon: LucideIcon;
  url?: string;
  subItems: SidebarSubItem[];
};

const sidebarSections: SidebarSection[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
    subItems: [],
  },
  {
    key: "properties",
    title: "Properties",
    icon: Building2,
    subItems: [
      { title: "All Properties", url: "/properties", icon: List },
      { title: "Units & Access Info", url: "/properties/units", icon: KeyRound },
      { title: "Maintenance Schedules", url: "/properties/maintenance", icon: CalendarCheck2 },
    ],
  },
  {
    key: "workorders",
    title: "Work Orders",
    icon: ClipboardList,
    subItems: [
      { title: "All Work Orders", url: "/dashboard/work-orders", icon: ListChecks },
      { title: "Create Work Order", url: "/dashboard/work-orders/create", icon: PlusCircle },
      { title: "Templates", url: "/dashboard/work-orders/templates", icon: FileStack },
      { title: "Approvals Needed", url: "/dashboard/work-orders/approvals", icon: CheckCircle2 },
    ],
  },
  {
    key: "contractors",
    title: "Contractors",
    icon: HardHat,
    subItems: [
      { title: "My Contractors", url: "/dashboard/contractors", icon: Users2 },
      { title: "Invite Contractors", url: "/contractors/invite", icon: UserPlus2 },
      { title: "Ratings & Performance", url: "/contractors/ratings", icon: StarHalf },
    ],
  },
  {
    key: "messages",
    title: "Messages",
    icon: MessageSquare,
    subItems: [
      { title: "Work Order Threads", url: "/messages/threads", icon: MessageCircle },
      { title: "All Messages", url: "/messages", icon: Mail },
      { title: "Templates & Quick Replies", url: "/messages/templates", icon: FileText },
    ],
  },
  {
    key: "reports",
    title: "Reports",
    icon: BarChart2,
    subItems: [
      { title: "Job Reports", url: "/reports/jobs", icon: FileBarChart2 },
      { title: "Contractor Analytics", url: "/reports/contractor-analytics", icon: PieChart },
      { title: "Maintenance Trends", url: "/reports/maintenance", icon: TrendingUp },
      { title: "Export Data", url: "/reports/export", icon: Download },
    ],
  },
  {
    key: "settings",
    title: "Settings",
    icon: Settings2,
    subItems: [
      { title: "Company Profile", url: "/settings/company", icon: Building },
      { title: "Team Members & Roles", url: "/settings/team", icon: UserCog },
      { title: "SMS Usage & Billing", url: "/settings/billing", icon: CreditCard },
      { title: "Photo/Storage Settings", url: "/settings/storage", icon: ImageDown },
    ],
  },
];

const adminSidebarSections: SidebarSection[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
    subItems: [],
  },
  {
    key: "user-management",
    title: "User Management",
    icon: Users,
    subItems: [
      { title: "Property Managers", url: "/admin/users/pms", icon: UserCheck },
      { title: "Business Verification Queue", url: "/admin/users/verification", icon: KeyRound },
      { title: "Contractors", url: "/admin/users/contractors", icon: UserCog },
      { title: "Flagged Users", url: "/admin/users/flagged", icon: Flag },
      { title: "Team Roles & Access Logs", url: "/admin/users/roles", icon: Lock },
    ],
  },
  {
    key: "work-orders-monitor",
    title: "Work Orders Monitor",
    icon: ClipboardList,
    subItems: [
      { title: "All Work Orders", url: "/admin/work-orders", icon: FileText },
      { title: "Pending / Flagged Jobs", url: "/admin/work-orders/pending", icon: Flag },
      { title: "High Priority Issues", url: "/admin/work-orders/high-priority", icon: AlertTriangle },
      { title: "Search & Filters", url: "/admin/work-orders/search", icon: Search },
    ],
  },
  {
    key: "sms-notifications",
    title: "SMS & Notifications",
    icon: Bell,
    subItems: [
      { title: "SMS Logs", url: "/admin/sms/logs", icon: MessageCircle },
      { title: "Delivery Status", url: "/admin/sms/delivery", icon: Mail },
      { title: "Retry Queue", url: "/admin/sms/retry", icon: PauseCircle },
      { title: "Templates & Triggers", url: "/admin/sms/templates", icon: FileStack },
    ],
  },
  {
    key: "storage",
    title: "Photo & File Storage",
    icon: Database,
    subItems: [
      { title: "Photo Upload Logs", url: "/admin/storage/photos", icon: UploadCloud },
      { title: "Failed Uploads", url: "/admin/storage/failed", icon: XCircle },
      { title: "Storage Quota Dashboard", url: "/admin/storage/quota", icon: BarChart2 },
      { title: "Content Review Panel", url: "/admin/storage/review", icon: Eye },
    ],
  },
  {
    key: "analytics",
    title: "Analytics & Reports",
    icon: BarChart2,
    subItems: [
      { title: "PM & Contractor Metrics", url: "/admin/analytics/metrics", icon: PieChart },
      { title: "Work Order Trends", url: "/admin/analytics/trends", icon: TrendingUp },
      { title: "Feature Usage", url: "/admin/analytics/features", icon: Zap },
      { title: "Export Reports", url: "/admin/analytics/export", icon: Download },
    ],
  },
  {
    key: "settings",
    title: "System Settings",
    icon: Settings2,
    subItems: [
      { title: "Feature Flags", url: "/admin/settings/flags", icon: Wrench },
      { title: "API Keys & Integrations", url: "/admin/settings/api", icon: Key },
      { title: "Rate Limits & Access Controls", url: "/admin/settings/rate-limits", icon: LockKeyhole },
      { title: "Maintenance Mode", url: "/admin/settings/maintenance", icon: PauseCircle },
    ],
  },
  {
    key: "support",
    title: "Support & Feedback",
    icon: LifeBuoy,
    subItems: [
      { title: "Open Support Tickets", url: "/admin/support/tickets", icon: HelpCircle },
      { title: "Bug Reports", url: "/admin/support/bugs", icon: Bug },
      { title: "User Feedback", url: "/admin/support/feedback", icon: BookOpen },
      { title: "Internal Notes", url: "/admin/support/notes", icon: FileText },
    ],
  },
  {
    key: "billing",
    title: "Billing & Invoicing (Future)",
    icon: CreditCard,
    subItems: [
      { title: "Subscription Plans", url: "/admin/billing/plans", icon: FileText },
      { title: "Company Billing Records", url: "/admin/billing/records", icon: FileBarChart2 },
      { title: "Invoice Logs", url: "/admin/billing/invoices", icon: FileInput },
    ],
  },
  {
    key: "security",
    title: "Security & Compliance",
    icon: ShieldCheck,
    subItems: [
      { title: "Audit Logs", url: "/admin/security/audit", icon: FileText },
      { title: "Data Deletion Requests", url: "/admin/security/deletion", icon: Trash2 },
      { title: "Access Violation Alerts", url: "/admin/security/violations", icon: ShieldOff },
      { title: "Encryption & Privacy Policies", url: "/admin/security/policies", icon: Lock },
    ],
  },
  {
    key: "activity-logs",
    title: "Activity Logs",
    icon: Activity,
    subItems: [
      { title: "Admin Actions", url: "/admin/activity/admin", icon: UserCog },
      { title: "User Behavior Tracking", url: "/admin/activity/users", icon: Eye },
      { title: "System Warnings/Crashes", url: "/admin/activity/warnings", icon: AlertTriangle },
    ],
  },
];

const contractorSidebarSections: SidebarSection[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
    subItems: [],
  },
  {
    key: "myjobs",
    title: "My Jobs",
    icon: ClipboardList,
    subItems: [
      { title: "Active Jobs", url: "/contractor/jobs/active", icon: ListChecks },
      { title: "Pending Acceptance", url: "/contractor/jobs/pending", icon: CheckCircle2 },
      { title: "Completed Jobs", url: "/contractor/jobs/completed", icon: BadgeCheck },
      { title: "Declined / Canceled", url: "/contractor/jobs/declined", icon: XCircle },
    ],
  },
  {
    key: "upload",
    title: "Upload Center",
    icon: Camera,
    subItems: [
      { title: "Upload Photos", url: "/contractor/upload/photos", icon: UploadCloud },
      { title: "Submit Invoice", url: "/contractor/upload/invoice", icon: FileInput },
      { title: "Mark as Completed", url: "/contractor/upload/complete", icon: CheckCircle2 },
    ],
  },
  {
    key: "messages",
    title: "Messages",
    icon: MessageSquare,
    subItems: [
      { title: "Job Messages", url: "/contractor/messages/jobs", icon: Mail },
      { title: "Voice Notes", url: "/contractor/messages/voice", icon: Mic },
      { title: "Quick Replies", url: "/contractor/messages/quick-replies", icon: FileStack },
    ],
  },
  {
    key: "profile",
    title: "Profile & Settings",
    icon: UserCog,
    subItems: [
      { title: "My Profile", url: "/contractor/profile", icon: User },
      { title: "Certifications & Insurance", url: "/contractor/profile/certifications", icon: BadgeCheck },
      { title: "Bank Details", url: "/contractor/profile/bank", icon: Banknote },
    ],
  },
  {
    key: "history",
    title: "History",
    icon: FileText,
    subItems: [
      { title: "Work History", url: "/contractor/history", icon: FileText },
      { title: "Ratings & Feedback", url: "/contractor/history/ratings", icon: StarHalf },
      { title: "Before/After Portfolio", url: "/contractor/history/portfolio", icon: ImageIcon },
    ],
  },
  {
    key: "support",
    title: "Support",
    icon: LifeBuoy,
    subItems: [
      { title: "FAQ / Help Center", url: "/contractor/support/faq", icon: HelpCircle },
      { title: "Contact Support", url: "/contractor/support/contact", icon: PhoneCall },
    ],
  },
];

const accountantSidebarSections: SidebarSection[] = [
  {
    key: "dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/dashboard",
    subItems: [],
  },
  {
    key: "billing",
    title: "Billing & Invoicing",
    icon: CreditCard,
    subItems: [
      { title: "Invoice Management", url: "/accountant/invoices", icon: FileText },
      { title: "Payment Processing", url: "/accountant/payments", icon: CreditCard },
      { title: "Payment History", url: "/accountant/payments/history", icon: FileBarChart2 },
      { title: "Failed Payments", url: "/accountant/payments/failed", icon: XCircle },
    ],
  },
  {
    key: "financial",
    title: "Financial Reports",
    icon: BarChart2,
    subItems: [
      { title: "Revenue Reports", url: "/accountant/reports/revenue", icon: TrendingUp },
      { title: "Expense Reports", url: "/accountant/reports/expenses", icon: TrendingDown },
      { title: "Profit & Loss", url: "/accountant/reports/pnl", icon: PieChart },
      { title: "Cash Flow", url: "/accountant/reports/cashflow", icon: BarChart2 },
    ],
  },
  {
    key: "tax",
    title: "Tax & Compliance",
    icon: FileText,
    subItems: [
      { title: "Tax Reports", url: "/accountant/tax/reports", icon: FileText },
      { title: "1099 Management", url: "/accountant/tax/1099", icon: FileInput },
      { title: "Tax Liability", url: "/accountant/tax/liability", icon: AlertTriangle },
      { title: "Compliance Status", url: "/accountant/tax/compliance", icon: CheckCircle2 },
    ],
  },
  {
    key: "contractors",
    title: "Contractor Payments",
    icon: Users2,
    subItems: [
      { title: "Payment Approvals", url: "/accountant/contractors/approvals", icon: CheckCircle2 },
      { title: "Payment History", url: "/accountant/contractors/history", icon: FileBarChart2 },
      { title: "Payment Methods", url: "/accountant/contractors/methods", icon: CreditCard },
      { title: "Tax Documents", url: "/accountant/contractors/tax", icon: FileText },
    ],
  },
  {
    key: "analytics",
    title: "Analytics",
    icon: BarChart2,
    subItems: [
      { title: "Financial Metrics", url: "/accountant/analytics/metrics", icon: PieChart },
      { title: "Trend Analysis", url: "/accountant/analytics/trends", icon: TrendingUp },
      { title: "KPI Dashboard", url: "/accountant/analytics/kpi", icon: BarChart2 },
      { title: "Export Data", url: "/accountant/analytics/export", icon: Download },
    ],
  },
  {
    key: "settings",
    title: "Financial Settings",
    icon: Settings2,
    subItems: [
      { title: "Payment Methods", url: "/accountant/settings/payments", icon: CreditCard },
      { title: "Tax Settings", url: "/accountant/settings/tax", icon: FileText },
      { title: "Invoice Templates", url: "/accountant/settings/templates", icon: FileStack },
      { title: "Billing Preferences", url: "/accountant/settings/billing", icon: Settings2 },
    ],
  },
];

const roles = [
  { key: "pm", name: "Property Manager", sub: "Manage properties", shortcut: "⌘1" },
  { key: "contractor", name: "Contractor", sub: "Receive jobs", shortcut: "⌘2" },
  { key: "admin", name: "Platform Admin", sub: "System admin", shortcut: "⌘3" },
  { key: "accountant", name: "Accountant", sub: "Billing & payments", shortcut: "⌘4" },
];

export function AppSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const urlRole = searchParams.get("role");
  const initialRole = roles.find(r => r.key === urlRole) || roles[0];
  const [currentRole, setCurrentRole] = useState(initialRole);
  const [expandedSection, setExpandedSection] = useState<string | null>("dashboard");
  const { state: sidebarState } = useSidebar();

  function handleRoleSwitch(role: typeof roles[number]) {
    setCurrentRole(role);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("role", role.key);
    router.replace(`/dashboard?${params.toString()}`);
  }

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("demo-auth");
      router.replace("/login");
    }
  }
  // Choose sidebar sections based on role
  const sidebarSectionsToUse = currentRole.key === 'contractor' ? contractorSidebarSections : currentRole.key === 'admin' ? adminSidebarSections : currentRole.key === 'accountant' ? accountantSidebarSections : sidebarSections;

  // Sync expandedSection with current route
  React.useEffect(() => {
    // Find the section whose url or subItem url matches the current pathname
    let foundSection: string | null = null;
    for (const section of sidebarSectionsToUse) {
      if (section.url && pathname === section.url) {
        foundSection = section.key;
        break;
      }
      if (section.subItems.some(sub => pathname === sub.url)) {
        foundSection = section.key;
        break;
      }
    }
    setExpandedSection(foundSection || "dashboard");
  }, [pathname, currentRole]);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <Image 
            src="/incoxchange-logomark.svg" 
            alt="incoXchange" 
            width={28} 
            height={28} 
          />
          <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
            incoXchange
          </span>
        </div>
        {/* Account Type Switcher Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 mt-2 transition-colors hover:bg-background focus:outline-none group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:py-0 group-data-[collapsible=icon]:mt-0">
              <Avatar className="h-8 w-8 rounded-lg group-data-[collapsible=icon]:mx-auto" >
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">{currentRole.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0 text-left group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold text-base leading-tight">{currentRole.name}</span>
                <span className="truncate text-xs text-muted-foreground leading-tight">{currentRole.sub}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56 rounded-lg" side="bottom" align="start" sideOffset={4}>
            <DropdownMenuLabel>Account Type</DropdownMenuLabel>
            {roles.map((role) => (
              <DropdownMenuItem
                key={role.key}
                onClick={() => handleRoleSwitch(role)}
                className="flex items-center gap-2"
              >
                <Avatar className="h-6 w-6 rounded-md">
                  <AvatarFallback className="rounded-md bg-primary text-primary-foreground">{role.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="flex-1 truncate">{role.name}</span>
                {currentRole.key === role.key && <Check className="ml-2 h-4 w-4 text-primary" />}
                <span className="ml-auto text-xs text-muted-foreground">{role.shortcut}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      
      <SidebarContent className="overflow-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarSectionsToUse.map((section) => (
                <React.Fragment key={section.key}>
                  <SidebarMenuItem>
                    {section.url && section.subItems.length === 0 ? (
                      <SidebarMenuButton asChild tooltip={section.title} data-active={expandedSection === section.key}>
                        <Link href={section.url} className="flex items-center w-full">
                          <section.icon className="h-4 w-4" />
                          <span className="ml-2 flex-1 text-left">{section.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        tooltip={section.title}
                        data-active={expandedSection === section.key}
                        onClick={() =>
                          setExpandedSection(
                            expandedSection === section.key ? null : section.key
                          )
                        }
                      >
                        <button type="button" className="flex items-center w-full">
                          <section.icon className="h-4 w-4" />
                          <span className="ml-2 flex-1 text-left">{section.title}</span>
                          {section.subItems.length > 0 && (
                            expandedSection === section.key ? (
                              <ChevronDown className="ml-auto h-4 w-4" />
                            ) : (
                              <ChevronRight className="ml-auto h-4 w-4" />
                            )
                          )}
                        </button>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                  {section.subItems.length > 0 && expandedSection === section.key && (
                    <div
                      className="ml-8 transition-all group-data-[collapsible=icon]:ml-0 group-data-[collapsible=icon]:bg-sidebar-accent group-data-[collapsible=icon]:text-sidebar-accent-foreground group-data-[collapsible=icon]:rounded-md"
                    >
                      {section.subItems.map((sub) => (
                        <SidebarMenuItem key={`${section.key}-${sub.title}`}>
                          <SidebarMenuButton asChild tooltip={sub.title}>
                            <Link href={sub.url} className="flex items-center">
                              {sub.icon && <sub.icon className="h-4 w-4 mr-2" />}
                              <span className={sidebarState === "collapsed" ? "inline" : ""}>{sub.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    {/* Use initials for demo user */}
                    <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">DE</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Demo User</span>
                    <span className="truncate text-xs">demo@incoxchange.com</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">DE</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Demo User</span>
                      <span className="truncate text-xs">demo@incoxchange.com</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings2 />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy />
                  Get Help
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Search />
                  Search
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
} 