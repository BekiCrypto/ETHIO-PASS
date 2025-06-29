'use client';

import { useState } from 'react';
import IdUploadStep from '@/components/id-upload-step';
import SelfieCaptureStep from '@/components/selfie-capture-step';
import VerificationResultStep from '@/components/verification-result-step';
import type { EthiopianOCRVerificationOutput } from '@/ai/flows/ethiopian-ocr-verification';
import type { SelfieLivenessCheckOutput } from '@/ai/flows/selfie-liveness-check';
import { Card, CardContent } from '@/components/ui/card';

type Step = 'ID_UPLOAD' | 'SELFIE_CAPTURE' | 'RESULTS';

export default function VerifyPage() {
  const [step, setStep] = useState<Step>('ID_UPLOAD');
  const [idImageData, setIdImageData] = useState<string | null>(null);
  const [ocrResult, setOcrResult] = useState<EthiopianOCRVerificationOutput | null>(null);
  const [livenessResult, setLivenessResult] = useState<SelfieLivenessCheckOutput | null>(null);

  const handleIdUploadSuccess = (dataUri: string, result: EthiopianOCRVerificationOutput) => {
    setIdImageData(dataUri);
    setOcrResult(result);
    setStep('SELFIE_CAPTURE');
  };

  const handleSelfieCaptureSuccess = (result: SelfieLivenessCheckOutput) => {
    setLivenessResult(result);
    setStep('RESULTS');
  };

  const handleStartOver = () => {
    setStep('ID_UPLOAD');
    setIdImageData(null);
    setOcrResult(null);
    setLivenessResult(null);
  };
  
  const handleBackToIdUpload = () => {
    setStep('ID_UPLOAD');
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
        <Card className="w-full max-w-2xl">
            <CardContent className="p-6">
                {step === 'ID_UPLOAD' && (
                    <IdUploadStep onSuccess={handleIdUploadSuccess} />
                )}
                {step === 'SELFIE_CAPTURE' && (
                    <SelfieCaptureStep onSuccess={handleSelfieCaptureSuccess} onBack={handleBackToIdUpload} />
                )}
                {step === 'RESULTS' && ocrResult && livenessResult && (
                    <VerificationResultStep 
                        ocrResult={ocrResult} 
                        livenessResult={livenessResult}
                        idImageData={idImageData}
                        onStartOver={handleStartOver} 
                    />
                )}
            </CardContent>
        </Card>
    </div>
  );
}
