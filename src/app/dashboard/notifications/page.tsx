import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="max-w-md">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-4 w-fit">
                    <Bell className="h-12 w-12 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <CardTitle>Your Notifications</CardTitle>
                <CardDescription>
                    This section will display important alerts and updates regarding your account. This feature is currently under construction.
                </CardDescription>
            </CardContent>
        </Card>
    </div>
  );
}
