import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebarWrapper } from "@/components/app-sidebar-wrapper";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebarWrapper />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
} 