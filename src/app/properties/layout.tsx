import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebarWrapper } from "@/components/app-sidebar-wrapper";
import { PropertiesHeader } from "@/components/properties/PropertiesHeader";

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebarWrapper />
      <SidebarInset>
        <PropertiesHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
} 