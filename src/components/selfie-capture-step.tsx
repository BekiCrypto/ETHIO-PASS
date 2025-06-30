'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { checkSelfieLiveness } from '@/app/dashboard/verify/actions';
import type { SelfieLivenessCheckOutput } from '@/ai/flows/selfie-liveness-check';
import { Camera, Loader2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface SelfieCaptureStepProps {
  onSuccess: (selfieDataUri: string, result: SelfieLivenessCheckOutput) => void;
  onBack: () => void;
}

export default function SelfieCaptureStep({ onSuccess, onBack }: SelfieCaptureStepProps) {
  const [image, setImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      const newStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
      setCameraError(null);
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError("Could not access camera. Please check your browser permissions.");
      toast({
        title: 'Camera Error',
        description: 'Could not access camera. Please allow camera access in your browser settings.',
        variant: 'destructive',
      });
    }
  }, [stream, toast]);

  useEffect(() => {
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
        const dataUri = canvasRef.current.toDataURL('image/jpeg');
        setImage(dataUri);
        stream?.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
  };

  const retake = () => {
    setImage(null);
    startCamera();
  };
  
  const handleSubmit = async () => {
    if (!image) return;
    setIsLoading(true);
    try {
      const result = await checkSelfieLiveness({ photoDataUri: image });
      onSuccess(image, result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: 'Liveness Check Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center space-y-6">
       <div className="relative">
         <Button variant="ghost" size="icon" className="absolute top-0 left-0" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
         </Button>
        <h2 className="text-2xl font-bold font-headline">Step 2: Liveness Check</h2>
        <p className="text-muted-foreground">Please take a clear selfie. Make sure your face is centered.</p>
      </div>

      <div className="relative w-full max-w-sm mx-auto aspect-square rounded-full overflow-hidden border-4 border-primary shadow-lg bg-muted">
        {image ? (
          <Image src={image} alt="Selfie Preview" layout="fill" objectFit="cover" />
        ) : stream ? (
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">{cameraError || "Starting camera..."}</div>
        )}
      </div>
      
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex justify-center gap-4">
        {image ? (
          <>
            <Button variant="outline" onClick={retake} disabled={isLoading}>Retake</Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                'Submit Selfie'
              )}
            </Button>
          </>
        ) : (
          <Button onClick={capture} disabled={!stream || !!cameraError} size="lg" className="rounded-full w-20 h-20">
            <Camera className="w-8 h-8" />
          </Button>
        )}
      </div>
    </div>
  );
}
