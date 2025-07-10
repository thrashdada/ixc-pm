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
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
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
  BarChart3, 
  Home, 
  Settings, 
  Users,
  FileText,
  Activity,
  LifeBuoy,
  Search,
  Folder,
  MoreHorizontal,
  BookOpen,
  UserCircle,
  ChevronsUpDown,
  User,
  CreditCard,
  Bell,
  LogOut,
  Check,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Main navigation items
const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Lifecycle",
    url: "/lifecycle",
    icon: Activity,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Folder,
  },
  {
    title: "Team",
    url: "/team",
    icon: Users,
  },
]

// Documents section items
const documentsItems = [
  {
    title: "Data Library",
    url: "/data-library",
    icon: BookOpen,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Word Assistant",
    url: "/word-assistant",
    icon: UserCircle,
  },
  {
    title: "More",
    url: "/more",
    icon: MoreHorizontal,
  },
]

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
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Documents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {documentsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
                  <Settings />
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