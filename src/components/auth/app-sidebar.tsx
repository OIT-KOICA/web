"use client";

import * as React from "react";
import {
  LibraryBig,
  Package,
  CalendarCheck,
  Megaphone,
  Plus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  useGetCompany,
  useGetUserCompanies,
  useSwitchActiveCompany,
} from "@/lib/query/configuration-query";
import useStore from "@/lib/stores/store";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const dashboardMenuLink = {
  productNavMain: [
    {
      title: "Produit",
      url: "/dashboard/products",
      icon: Package,
      isActive: true,
    },
    {
      title: "Annonces",
      url: "/dashboard/adds",
      icon: Megaphone,
      isActive: true,
    },
  ],
  supportNavMain: [
    {
      title: "Documentation",
      url: "/dashboard/articles",
      icon: LibraryBig,
      isActive: true,
    },
    {
      title: "Evènement",
      url: "/dashboard/events",
      icon: CalendarCheck,
      isActive: true,
    },
    {
      title: "Annonces",
      url: "/dashboard/adds",
      icon: Megaphone,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { companies, company, setCompany, setCompanies } = useStore();
  const { companies: userCompanies } = useGetUserCompanies();
  const switchCompany = useSwitchActiveCompany();
  const { refetch } = useGetCompany();

  React.useEffect(() => {
    if (!userCompanies) return;

    // L'utilisateur n'a aucune compagnie enregistrée
    if (userCompanies.length === 0) return;

    // Aucune compagnie active dans le store : on force la 1ère et on la switch côté serveur
    if (!company && userCompanies.length > 0) {
      const defaultCompany = userCompanies[0];
      switchCompany.mutate({ companyId: defaultCompany.id });
      refetch();
      return;
    }

    // Sinon on met simplement à jour la liste sans reswitch inutile
    setCompanies(userCompanies);
  }, [userCompanies]);

  const handleSwitchCompany = async (companyId: string) => {
    try {
      await switchCompany.mutateAsync({ companyId });

      const { data: updatedCompany } = await refetch();

      if (updatedCompany) {
        setCompany(updatedCompany);
      } else {
        console.warn(
          "Impossible de charger la compagnie active après le switch"
        );
      }
      // 👇 Optionnel : reload la page si nécessaire
      // router.refresh();
    } catch (error) {
      console.error("Erreur lors du changement de compagnie :", error);
    }
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                    <Avatar>
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/media/download/image/${company?.avatar}`}
                        alt={company?.name}
                      />
                      <AvatarFallback>
                        {company?.name.charAt(2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {(company && company.name) ?? "Entreprise inconnue"}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Changer de compagnie</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {companies.map((comp) => (
                  <DropdownMenuItem
                    key={comp.id}
                    onClick={() => handleSwitchCompany(comp.id)}
                  >
                    {comp.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/company/create")}
                >
                  <Plus className="mr-2 size-4" />
                  Nouvelle compagnie
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {company && company.serviceType === "COMMERCANT" ? (
          <NavMain title="Outils" items={dashboardMenuLink.productNavMain} />
        ) : (
          <NavMain title="Outils" items={dashboardMenuLink.supportNavMain} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
