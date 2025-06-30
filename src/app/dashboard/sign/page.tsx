import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenSquare } from "lucide-react";

export default function SignPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Sign Documents</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Feature Not Available</CardTitle>
                    <CardDescription>The document signing feature is currently under development.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center py-20 space-y-4">
                    <div className="p-4 bg-muted rounded-full">
                        <PenSquare className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-semibold">Coming Soon</p>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                        We are working hard to bring you a seamless and secure digital signing experience. Please check back later.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
