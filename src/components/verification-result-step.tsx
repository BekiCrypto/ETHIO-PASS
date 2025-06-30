'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { EthiopianOCRVerificationOutput } from '@/ai/flows/ethiopian-ocr-verification';
import type { SelfieLivenessCheckOutput } from '@/ai/flows/selfie-liveness-check';
import type { BiometricMatchOutput } from '@/ai/flows/biometric-matching';
import { CheckCircle2, AlertTriangle, RefreshCw, UserCheck, UserX } from 'lucide-react';
import { Progress } from './ui/progress';

interface VerificationResultStepProps {
  ocrResult: EthiopianOCRVerificationOutput;
  livenessResult: SelfieLivenessCheckOutput;
  matchResult: BiometricMatchOutput;
  idImageData: string | null;
  selfieImageData: string | null;
  onStartOver: () => void;
}

export default function VerificationResultStep({ 
    ocrResult, 
    livenessResult, 
    matchResult,
    idImageData, 
    selfieImageData,
    onStartOver 
}: VerificationResultStepProps) {
  const isLivenessSuccess = livenessResult.isLive && livenessResult.confidence > 0.7;
  const isMatchSuccess = matchResult.match && matchResult.confidence > 0.7;
  const isOverallSuccess = isLivenessSuccess && isMatchSuccess;

  return (
    <div className="text-center space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-headline">Verification Complete</h2>
        <p className="text-muted-foreground">Here are the results of your identity verification.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="text-primary"/> Document Details (OCR)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {idImageData && (
                <div className="relative h-40 w-full">
                    <Image src={idImageData} alt="ID Document" layout="fill" objectFit="contain" className="rounded-md"/>
                </div>
            )}
            <div className="p-3 bg-muted rounded-md text-left max-h-40 overflow-auto">
                <p className="text-xs whitespace-pre-wrap font-mono">{ocrResult.extractedData}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {isLivenessSuccess ? <CheckCircle2 className="text-accent"/> : <AlertTriangle className="text-destructive"/>}
                    Liveness Check
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-center">
                    {isLivenessSuccess ? (
                        <Badge className="bg-accent text-accent-foreground">Live Person Detected</Badge>
                    ) : (
                        <Badge variant="destructive">Liveness Check Failed</Badge>
                    )}
                </div>
                <p className="text-sm text-muted-foreground text-center">
                    Confidence: {Math.round(livenessResult.confidence * 100)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {isMatchSuccess ? <UserCheck className="text-accent"/> : <UserX className="text-destructive"/>}
                    Biometric Match
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <div className="flex items-center justify-center">
                    {isMatchSuccess ? (
                        <Badge className="bg-accent text-accent-foreground">Faces Match</Badge>
                    ) : (
                        <Badge variant="destructive">Faces Do Not Match</Badge>
                    )}
                </div>
                <div>
                  <div className='flex justify-between text-sm mb-1'>
                    <span className='text-muted-foreground'>Confidence</span>
                    <span>{Math.round(matchResult.confidence * 100)}%</span>
                  </div>
                  <Progress value={matchResult.confidence * 100} className="h-2"/>
                </div>
                <p className="text-xs text-muted-foreground pt-1">{matchResult.reasoning}</p>
              </CardContent>
            </Card>
        </div>
      </div>

      <Card className="text-left">
        <CardHeader>
            <CardTitle>Overall Status</CardTitle>
            <CardDescription>Based on the checks, the overall verification status is below.</CardDescription>
        </CardHeader>
        <CardContent>
            {isOverallSuccess ? (
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
        <RefreshCw className="mr-2 h-4 w-4"/> Start New Verification
      </Button>
    </div>
  );
}
