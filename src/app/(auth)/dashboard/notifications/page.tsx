"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import {
  useGetNotifications,
  useMarkAsRead,
} from "@/lib/query/configuration-query";
import { Bell, Eye } from "lucide-react";

export default function NotificationsPage() {
  const { notifications } = useGetNotifications();
  const markAsReadNotification = useMarkAsRead();

  const markAsRead = async (id: string) => {
    try {
      await markAsReadNotification.mutateAsync(id);
    } catch (error) {
      console.error("Echec lors de la modification de la notification:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <SidebarInset>
      <div className="container mx-auto p-6">
        <Card className="shadow-md">
          <CardHeader className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-bold">📢 Notifications</h2>
            <Bell className="size-6 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {notifications?.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  Aucune notification pour le moment.
                </p>
              ) : (
                notifications?.map((notif) => (
                  <div
                    key={notif.id}
                    className={`flex flex-col items-start justify-between rounded-lg border p-4 shadow-sm transition-all md:flex-row ${
                      notif.isRead
                        ? "bg-gray-100 text-gray-500"
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notif.message}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {formatDate(notif.createdAt)}
                      </p>
                    </div>

                    <div className="mt-3 flex gap-2 md:mt-0">
                      {!notif.isRead && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(notif.id)}
                          className="text-xs"
                        >
                          ✅ Marquer comme lue
                        </Button>
                      )}

                      {notif.link && (
                        <Link href={notif.link} passHref>
                          <Button
                            variant="default"
                            size="sm"
                            className="text-xs"
                          >
                            <Eye className="mr-1 size-4" />
                            Consulter
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
