"use client";

import * as React from "react";
import { LibraryBig, Package } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { useGetCompany } from "@/lib/query/configuration-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useToast } from "@/hooks/use-toast";
import useUserStore from "@/lib/stores/user-store";

const dashboardMenuLink = {
  productNavMain: [
    {
      title: "Produit",
      url: "/dashboard/products",
      icon: Package,
      isActive: true,
    },
  ],
  supportNavMain: [
    {
      title: "Article",
      url: "/dashboard/articles",
      icon: LibraryBig,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { company: fetchedCompany, error } = useGetCompany();
  const company = useUserStore((state) => state.company);
  const { setCompany } = useUserStore();
  const { toast } = useToast();

  // Charger la compagnie depuis l'API uniquement si elle n'existe pas déjà dans le store
  React.useEffect(() => {
    if (!company && fetchedCompany) {
      setCompany(fetchedCompany);
    }
  }, [company, fetchedCompany, setCompany]);

  // Gérer les erreurs et afficher un message Toast
  React.useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          "Impossible de charger les informations de votre compagnie.",
      });
    }
  }, [error, toast]);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Avatar>
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_API_PATH_URL}/image/${company?.avatar}`}
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
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {company && company.serviceType === "PRODUCT_VENDOR" ? (
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
