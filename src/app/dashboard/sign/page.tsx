'use client';

import { useState, useRef, ChangeEvent } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { PenSquare, Upload, Eraser, Download } from 'lucide-react';
import Image from 'next/image';

export default function SignPage() {
    const [doc, setDoc] = useState<string | null>(null);
    const [signedDoc, setSignedDoc] = useState<string | null>(null);
    const sigPad = useRef<SignatureCanvas>(null);
    const { toast } = useToast();

    const handleDocUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setDoc(event.target?.result as string);
                setSignedDoc(null); // Reset signed doc on new upload
            };
            reader.readAsDataURL(file);
        }
    };

    const clearSignature = () => {
        sigPad.current?.clear();
    };

    const applySignature = () => {
        if (!doc) {
            toast({ title: 'No Document', description: 'Please upload a document first.', variant: 'destructive' });
            return;
        }
        if (sigPad.current?.isEmpty()) {
            toast({ title: 'No Signature', description: 'Please provide a signature.', variant: 'destructive' });
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const docImage = new (window.Image)();
        docImage.src = doc;
        docImage.onload = () => {
            canvas.width = docImage.width;
            canvas.height = docImage.height;
            ctx.drawImage(docImage, 0, 0);
            
            // Draw signature
            const sigImage = new (window.Image)();
            sigImage.src = sigPad.current?.getTrimmedCanvas().toDataURL('image/png') || '';
            sigImage.onload = () => {
                // Draw signature at bottom right, scaled down
                const sigRatio = sigImage.width / sigImage.height;
                const sigHeight = canvas.height * 0.15;
                const sigWidth = sigHeight * sigRatio;
                const sigX = canvas.width - sigWidth - (canvas.width * 0.05);
                const sigY = canvas.height - sigHeight - (canvas.height * 0.05);
                
                ctx.drawImage(sigImage, sigX, sigY, sigWidth, sigHeight);
                setSignedDoc(canvas.toDataURL('image/png'));
                toast({ title: 'Signature Applied', description: 'You can now download the signed document.' });
            };
        };
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Sign Documents</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Document Preview</CardTitle>
                            <CardDescription>Your uploaded or signed document will appear here.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center bg-muted min-h-[400px] lg:min-h-[600px] p-4">
                            {signedDoc ? (
                                <Image src={signedDoc} alt="Signed Document" width={800} height={1100} className="max-w-full max-h-full object-contain" />
                            ) : doc ? (
                                <Image src={doc} alt="Document to be signed" width={800} height={1100} className="max-w-full max-h-full object-contain" />
                            ) : (
                                <div className="text-center text-muted-foreground p-8">
                                    <PenSquare className="h-16 w-16 mx-auto mb-4" />
                                    <p>Please upload a document to begin.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>1. Upload Document</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input id="doc-upload" type="file" accept="image/*" onChange={handleDocUpload} />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>2. Draw Signature</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                           <div className="rounded-md border border-input bg-white">
                            <SignatureCanvas 
                                ref={sigPad}
                                penColor='black'
                                canvasProps={{ className: 'w-full h-[150px]' }}
                            />
                           </div>
                           <Button variant="outline" size="sm" onClick={clearSignature} className="w-full">
                                <Eraser className="mr-2 h-4 w-4" /> Clear
                           </Button>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>3. Apply & Download</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                           <Button onClick={applySignature} className="w-full" disabled={!doc}>
                                Apply Signature
                           </Button>
                           <Button variant="secondary" className="w-full" disabled={!signedDoc} asChild>
                               <a href={signedDoc || '#'} download="signed-document.png">
                                   <Download className="mr-2 h-4 w-4" /> Download
                               </a>
                           </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
