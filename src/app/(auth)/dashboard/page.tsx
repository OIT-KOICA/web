import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
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

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const userStore = useUserStore.getState();

  if (userStore.isNewUser === null) {
    // Charge l'état utilisateur si ce n'est pas déjà fait
    await userStore.setUserStatus(session.accessToken);
  }

  const { isNewUser } = userStore;

  if (isNewUser) {
    redirect("/company");
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
