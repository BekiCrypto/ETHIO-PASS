'use client';

import { useEffect, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScannerState } from 'html5-qrcode';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { QrCode, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ScanQrPage() {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            'qr-reader', 
            { 
                qrbox: {
                    width: 250,
                    height: 250,
                },
                fps: 5,
            }, 
            false // verbose
        );

        let isScanning = true;

        const onScanSuccess = (decodedText: string) => {
            if (isScanning) {
                isScanning = false;
                setScanResult(decodedText);
                toast({
                    title: "QR Code Scanned!",
                    description: `Data: ${decodedText}`,
                });
                if (scanner.getState() === Html5QrcodeScannerState.SCANNING) {
                  scanner.clear().catch(error => console.error("Failed to clear scanner on success", error));
                }
            }
        }

        const onScanError = (errorMessage: string) => {
            // handle scan error, usually this just means no QR code is found
        }
        
        scanner.render(onScanSuccess, onScanError);
        
        return () => {
            // Cleanup function to stop the scanner when the component unmounts
            if (scanner && scanner.getState() === Html5QrcodeScannerState.SCANNING) {
                 scanner.clear().catch(error => console.error("Failed to clear scanner on unmount", error));
            }
        };
    }, [toast]);
    
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Scan QR Code</h1>
            <Card>
                <CardHeader>
                    <CardTitle>QR Code Scanner</CardTitle>
                    <CardDescription>Position a QR code within the frame to scan it.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                   {scanResult ? (
                       <Alert variant="default" className="bg-green-100 dark:bg-green-900/30 border-green-500/50">
                           <CheckCircle className="h-4 w-4 text-green-600" />
                           <AlertTitle>Scan Successful!</AlertTitle>
                           <AlertDescription className="break-all">
                               <strong>Decoded Data:</strong> {scanResult}
                           </AlertDescription>
                       </Alert>
                   ) : (
                       <div id="qr-reader" className="w-full max-w-md"></div>
                   )}
                </CardContent>
            </Card>
        </div>
    )
}
