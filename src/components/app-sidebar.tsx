'use client';

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
  ClipboardList,
  HardHat,
  MessageSquare,
  BarChart2,
  Settings2,
  ChevronDown,
  ChevronRight,
  List,
  KeyRound,
  CalendarCheck2,
  ListChecks,
  PlusCircle,
  FileStack,
  CheckCircle2,
  Users2,
  UserPlus2,
  StarHalf,
  MessageCircle,
  Mail,
  FileText,
  FileBarChart2,
  PieChart,
  TrendingUp,
  Download,
  Building,
  UserCog,
  CreditCard,
  ImageDown,
  ChevronsUpDown,
  Check,
  User,
  Bell,
  LifeBuoy,
  Search,
  LogOut,
  Camera,
  UploadCloud,
  XCircle,
  FileInput,
  BadgeCheck,
  History,
  Image as ImageIcon,
  Mic,
  PhoneCall,
  HelpCircle,
  Banknote,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const sidebarSections = [
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
      { title: "All Work Orders", url: "/work-orders", icon: ListChecks },
      { title: "Create Work Order", url: "/work-orders/create", icon: PlusCircle },
      { title: "Templates", url: "/work-orders/templates", icon: FileStack },
      { title: "Approvals Needed", url: "/work-orders/approvals", icon: CheckCircle2 },
    ],
  },
  {
    key: "contractors",
    title: "Contractors",
    icon: HardHat,
    subItems: [
      { title: "My Contractors", url: "/contractors", icon: Users2 },
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
      { title: "Contractor Analytics", url: "/reports/contractors", icon: PieChart },
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

const contractorSidebarSections = [
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
    icon: History,
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

const roles = [
  { key: "pm", name: "Property Manager", sub: "Manage properties", shortcut: "⌘1" },
  { key: "contractor", name: "Contractor", sub: "Receive jobs", shortcut: "⌘2" },
  { key: "admin", name: "Platform Admin", sub: "System admin", shortcut: "⌘3" },
  { key: "accountant", name: "Accountant", sub: "Billing & payments", shortcut: "⌘4" },
];

export function AppSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlRole = searchParams.get("role");
  const initialRole = roles.find(r => r.key === urlRole) || roles[0];
  const [currentRole, setCurrentRole] = useState(initialRole);
  const [expandedSection, setExpandedSection] = useState<string | null>("dashboard");

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
  const sidebarSectionsToUse = currentRole.key === 'contractor' ? contractorSidebarSections : sidebarSections;
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
                <>
                  <SidebarMenuItem key={section.key}>
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
                  </SidebarMenuItem>
                  {section.subItems.length > 0 && expandedSection === section.key && (
                    <div className="ml-8">
                      {section.subItems.map((sub) => (
                        <SidebarMenuItem key={sub.title}>
                          <SidebarMenuButton asChild tooltip={sub.title}>
                            <Link href={sub.url} className="flex items-center">
                              {sub.icon && <sub.icon className="h-4 w-4 mr-2" />}
                              <span>{sub.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  )}
                </>
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