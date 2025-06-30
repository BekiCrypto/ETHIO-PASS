import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <Card className="max-w-md">
            <CardHeader>
                <div className="mx-auto bg-muted rounded-full p-4 w-fit">
                    <FileText className="h-12 w-12 text-muted-foreground" />
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <CardTitle>Your Documents</CardTitle>
                <CardDescription>
                    This section will securely store and manage your verified digital documents. This feature is currently under construction.
                </CardDescription>
            </CardContent>
        </Card>
    </div>
  );
}
