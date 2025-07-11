'use client';

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
import { usePathname } from "next/navigation";

export function PropertiesHeader() {
  const pathname = usePathname();
  
  // Get page title based on current route
  const getPageTitle = () => {
    if (pathname === "/properties") {
      return "All Properties";
    } else if (pathname === "/properties/units") {
      return "Units & Access Info";
    } else if (pathname === "/properties/maintenance") {
      return "Maintenance Schedules";
    }
    return "Properties";
  };

  // Mock notifications - property management specific
  const notifications = [
    { id: 1, text: "New maintenance request for Maple Apartments Unit 101", unread: true },
    { id: 2, text: "Access code updated for Oak Villas Unit A1", unread: true },
    { id: 3, text: "Monthly property report is ready for review", unread: false },
    { id: 4, text: "Tenant move-out scheduled for Pine Estates Unit 302", unread: true },
    { id: 5, text: "Property inspection completed for Cedar Heights", unread: false },
    { id: 6, text: "New tenant application received for Elm Gardens", unread: true },
  ];
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
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
  );
} 