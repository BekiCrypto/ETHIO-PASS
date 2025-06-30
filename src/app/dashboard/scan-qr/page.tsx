import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";

export default function ScanQrPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Scan QR Code</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Feature Not Available</CardTitle>
                    <CardDescription>The QR code scanning feature is currently under development.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center text-center py-20 space-y-4">
                    <div className="p-4 bg-muted rounded-full">
                        <QrCode className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <p className="text-lg font-semibold">Coming Soon</p>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                        We are working hard to enable QR code functionality for document sharing and verification. Please check back later.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
