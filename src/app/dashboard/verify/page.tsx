'use client';

import { useState } from 'react';
import IdUploadStep from '@/components/id-upload-step';
import SelfieCaptureStep from '@/components/selfie-capture-step';
import VerificationResultStep from '@/components/verification-result-step';
import type { EthiopianOCRVerificationOutput } from '@/ai/flows/ethiopian-ocr-verification';
import type { SelfieLivenessCheckOutput } from '@/ai/flows/selfie-liveness-check';
import type { BiometricMatchOutput } from '@/ai/flows/biometric-matching';
import { Card, CardContent } from '@/components/ui/card';
import { performBiometricMatch } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { EthioPassLogo } from '@/components/aman-logo';

type Step = 'ID_UPLOAD' | 'SELFIE_CAPTURE' | 'RESULTS';

export default function VerifyPage() {
  const [step, setStep] = useState<Step>('ID_UPLOAD');
  const [idImageData, setIdImageData] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<EthiopianOCRVerificationOutput | null>(null);
  const [livenessResult, setLivenessResult] = useState<SelfieLivenessCheckOutput | null>(null);
  const [matchResult, setMatchResult] = useState<BiometricMatchOutput | null>(null);
  const [selfieImageData, setSelfieImageData] = useState<string | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const { toast } = useToast();

  const handleIdUploadSuccess = (dataUri: string, result: EthiopianOCRVerificationOutput) => {
    setIdImageData(dataUri);
    setOcrResult(result);
    setStep('SELFIE_CAPTURE');
  };

  const handleSelfieCaptureSuccess = async (selfieDataUri: string, result: SelfieLivenessCheckOutput) => {
    setLivenessResult(result);
    setSelfieImageData(selfieDataUri);
    setIsMatching(true);

    if (!idImageData) {
      toast({ title: 'Error', description: 'ID image data is missing.', variant: 'destructive' });
      setIsMatching(false);
      return;
    }

    try {
      const match = await performBiometricMatch({ idPhotoDataUri: idImageData, selfiePhotoDataUri: selfieDataUri });
      setMatchResult(match);
      setStep('RESULTS');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during matching.";
      toast({
        title: 'Biometric Match Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsMatching(false);
    }
  };

  const handleStartOver = () => {
    setStep('ID_UPLOAD');
    setIdImageData(null);
    setOcrResult(null);
    setLivenessResult(null);
    setMatchResult(null);
    setSelfieImageData(null);
  };
  
  const handleBackToIdUpload = () => {
    setStep('ID_UPLOAD');
  }

  const renderContent = () => {
    if (isMatching) {
        return (
            <div className="flex flex-col items-center justify-center space-y-6 p-12">
                <EthioPassLogo />
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <div className="text-center">
                    <h3 className="text-xl font-semibold">Performing Biometric Match...</h3>
                    <p className="text-muted-foreground">Comparing your selfie with the ID document.</p>
                </div>
            </div>
        )
    }
    
    switch (step) {
        case 'ID_UPLOAD':
            return <IdUploadStep onSuccess={handleIdUploadSuccess} />;
        case 'SELFIE_CAPTURE':
            return <SelfieCaptureStep onSuccess={handleSelfieCaptureSuccess} onBack={handleBackToIdUpload} />;
        case 'RESULTS':
            return ocrResult && livenessResult && matchResult && (
                <VerificationResultStep 
                    ocrResult={ocrResult} 
                    livenessResult={livenessResult}
                    matchResult={matchResult}
                    idImageData={idImageData}
                    selfieImageData={selfieImageData}
                    onStartOver={handleStartOver} 
                />
            );
        default:
            return null;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
        <Card className="w-full max-w-4xl">
            <CardContent className="p-6">
                {renderContent()}
            </CardContent>
        </Card>
    </div>
  );
}
