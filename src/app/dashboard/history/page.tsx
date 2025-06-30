import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History } from "lucide-react";

export default function HistoryPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="max-w-md">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-4 w-fit">
                    <History className="h-12 w-12 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <CardTitle>Activity History</CardTitle>
                <CardDescription>
                    This section will show a log of all your verification and sign-in activities. This feature is currently under construction.
                </CardDescription>
            </CardContent>
        </Card>
    </div>
  );
}
