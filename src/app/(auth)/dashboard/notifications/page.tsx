"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import {
  useGetNotifications,
  useMarkAsRead,
} from "@/lib/query/configuration-query";

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
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Notifications</h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {notifications?.map((notif) => (
                <div
                  key={notif.id}
                  className={`rounded-lg border p-2 ${
                    notif.isRead ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex-1">
                    <p>{notif.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(notif.createdAt)}
                    </p>
                  </div>
                  {!notif.isRead && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(notif.id)}
                    >
                      Marquer comme lue
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
