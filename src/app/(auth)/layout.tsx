import { AppSidebar } from "@/components/auth/app-sidebar";
import AuthGuard from "@/components/auth/auth-guard-wrapper";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        {children}
        {modal}
      </SidebarProvider>
    </AuthGuard>
  );
}
