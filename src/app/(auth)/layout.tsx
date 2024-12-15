import { AppSidebar } from "@/components/auth/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
      {modal}
    </SidebarProvider>
  );
}
