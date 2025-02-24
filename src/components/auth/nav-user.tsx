"use client";

import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useUserStore from "@/lib/stores/user-store";
import React, { useEffect, useState } from "react";
import { useGetNotifications } from "@/lib/query/configuration-query";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data: session } = useSession();
  const router = useRouter();
  const { user } = useUserStore();
  const { notifications } = useGetNotifications();

  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    if (notifications) {
      setHasUnread(notifications.some((notif) => !notif.isRead));
    }
  }, [notifications]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage
                  src={session?.user?.image ?? "#"}
                  alt={user?.username ?? "..."}
                />
                <AvatarFallback className="rounded-lg">
                  {user?.username.substring(0, 1) ?? "..."}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.username ?? "..."}
                </span>
                <span className="truncate text-xs">{user?.email ?? "..."}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage
                    src={session?.user?.image ?? "#"}
                    alt={user?.username ?? "..."}
                  />
                  <AvatarFallback className="rounded-lg">
                    {user?.username?.substring(0, 1) ?? "..."}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.username ?? "..."}
                  </span>
                  <span className="truncate text-xs">
                    {user?.email ?? "..."}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/account")}
              >
                <BadgeCheck />
                Compte
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/notifications")}
              >
                <div className="relative">
                  <Bell />
                  {hasUnread && (
                    <span className="absolute -right-1 -top-1 size-2 rounded-full bg-red-500"></span>
                  )}
                </div>
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut />
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
