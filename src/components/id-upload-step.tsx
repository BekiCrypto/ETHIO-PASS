'use client';

import { useState, useRef, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { verifyEthiopianId } from '@/app/dashboard/verify/actions';
import type { EthiopianOCRVerificationOutput } from '@/ai/flows/ethiopian-ocr-verification';
import { UploadCloud, Loader2, FileImage } from 'lucide-react';
import Image from 'next/image';

interface IdUploadStepProps {
  onSuccess: (dataUri: string, result: EthiopianOCRVerificationOutput) => void;
}

export default function IdUploadStep({ onSuccess }: IdUploadStepProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file || !preview) {
      toast({
        title: 'No file selected',
        description: 'Please select an image of your ID.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await verifyEthiopianId({ photoDataUri: preview });
      onSuccess(preview, result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        title: 'Verification Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-headline">Step 1: Verify Your Identity</h2>
        <p className="text-muted-foreground">Upload a clear photo of your National ID, Passport, or Driver's License.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <Image src={preview} alt="ID Preview" width={300} height={200} className="mx-auto rounded-md object-contain h-48 w-auto" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <UploadCloud className="h-12 w-12" />
              <p className="font-semibold">Click to upload or drag and drop</p>
              <p className="text-sm">PNG, JPG, or WEBP</p>
            </div>
          )}
          <Input 
            ref={fileInputRef}
            type="file" 
            accept="image/png, image/jpeg, image/webp" 
            onChange={handleFileChange} 
            className="hidden"
            id="id-upload"
          />
        </div>

        {file && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted p-2 rounded-md">
            <FileImage className="h-4 w-4" />
            <span>{file.name}</span>
          </div>
        )}

        <Button type="submit" disabled={!file || isLoading} className="w-full max-w-xs mx-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verifying...
            </>
          ) : (
            'Verify and Continue'
          )}
        </Button>
      </form>
    </div>
  );
}
