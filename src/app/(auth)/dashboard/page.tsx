"use client";

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import useUserStore from "@/lib/stores/user-store";
import DashboardHeader from "@/components/auth/dashboard-header";
import DashboardCards from "@/components/auth/dashboard-cards";
import { useEffect } from "react";
import CreateCompanyModal from "@/components/auth/company/create-company-modal";

export default function DashboardPage() {
  const { isNewUser, setUserStatus } = useUserStore();

  useEffect(() => {
    if (isNewUser === null) {
      // Charger le statut utilisateur si nécessaire
      setUserStatus();
    }
  }, [isNewUser, setUserStatus]);

  if (isNewUser) {
    return <CreateCompanyModal />;
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Accueil</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <DashboardCards />
      </div>
    </SidebarInset>
  );
}
