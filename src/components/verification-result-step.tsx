'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { EthiopianOCRVerificationOutput } from '@/ai/flows/ethiopian-ocr-verification';
import type { SelfieLivenessCheckOutput } from '@/ai/flows/selfie-liveness-check';
import { CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface VerificationResultStepProps {
  ocrResult: EthiopianOCRVerificationOutput;
  livenessResult: SelfieLivenessCheckOutput;
  idImageData: string | null;
  onStartOver: () => void;
}

export default function VerificationResultStep({ ocrResult, livenessResult, idImageData, onStartOver }: VerificationResultStepProps) {
  const isLivenessSuccess = livenessResult.isLive && livenessResult.confidence > 0.7;

  return (
    <div className="text-center space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-headline">Verification Complete</h2>
        <p className="text-muted-foreground">Here are the results of your identity verification.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <CheckCircle2 className="text-primary"/> OCR Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {idImageData && (
                <div className="relative h-40 w-full">
                    <Image src={idImageData} alt="ID Document" layout="fill" objectFit="contain" className="rounded-md"/>
                </div>
            )}
            <div className="p-4 bg-muted rounded-md text-left max-h-48 overflow-auto">
                <p className="text-sm whitespace-pre-wrap font-mono">{ocrResult.extractedData}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
                {isLivenessSuccess ? <CheckCircle2 className="text-accent"/> : <AlertTriangle className="text-destructive"/>}
                Liveness Check
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
                {isLivenessSuccess ? (
                    <Badge className="bg-accent text-accent-foreground text-lg">Live Person Detected</Badge>
                ) : (
                    <Badge variant="destructive" className="text-lg">Liveness Check Failed</Badge>
                )}
            </div>
            <p className="text-sm text-muted-foreground">
                Confidence: {Math.round(livenessResult.confidence * 100)}%
            </p>
            <p className="text-xs text-muted-foreground px-4">
                This AI-powered check helps prevent fraud by ensuring the selfie is from a real, live person.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="text-left">
        <CardHeader>
            <CardTitle>Overall Status</CardTitle>
            <CardDescription>Based on the checks, the overall verification status is below.</CardDescription>
        </CardHeader>
        <CardContent>
            {isLivenessSuccess ? (
                 <div className="flex items-center gap-2 text-accent">
                    <CheckCircle2 />
                    <p className="font-bold text-lg">Verification Approved</p>
                 </div>
            ) : (
                <div className="flex items-center gap-2 text-destructive">
                    <AlertTriangle />
                    <p className="font-bold text-lg">Verification Rejected</p>
                </div>
            )}
        </CardContent>
      </Card>

      <Button onClick={onStartOver}>
        <RefreshCw className="mr-2 h-4 w-4"/> Start Over
      </Button>
    </div>
  );
}
