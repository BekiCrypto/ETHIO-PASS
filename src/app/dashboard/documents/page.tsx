'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, MoreHorizontal, FileText, Briefcase, MoreVertical, User, Upload, CheckCircle, AlertCircle, Loader2, FilePlus2, PencilRuler } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { verifyDocumentAuthenticity } from './actions';
import Image from 'next/image';
import type { DocumentAuthenticityCheckOutput } from '@/ai/flows/document-authenticity-check';

const issuedDocFilters = [
    { name: 'All Documents', icon: FileText },
    { name: 'Personal', icon: User },
    { name: 'Professional', icon: Briefcase },
];

const issuedDocuments = [
  { id: 1, title: 'National ID Card', issuer: 'Federal NID Agency', validUntil: '15 Jan 2030', type: 'Personal' },
  { id: 2, title: "Driver's License", issuer: 'Transport Authority', validUntil: '22 Oct 2028', type: 'Personal' },
  { id: 3, title: 'University Degree', issuer: 'Addis Ababa University', validUntil: 'N/A', type: 'Professional' },
];

const docTypes = ['Personal', 'Professional', 'Legal', 'Property', 'Financial', 'Other'];

type VerificationStatus = 'Verified' | 'Unverified' | 'Needs Review';

interface UploadedDocument {
  id: number;
  title: string;
  type: string;
  dataUri: string;
  verification: DocumentAuthenticityCheckOutput;
  date: string;
  status: VerificationStatus;
}


export default function DocumentsPage() {
  const [activeFilter, setActiveFilter] = useState('All Documents');
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [currentFile, setCurrentFile] = useState<{ file: File, dataUri: string } | null>(null);
  const [newDocInfo, setNewDocInfo] = useState({ title: '', type: '' });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUri = e.target?.result as string;
        setCurrentFile({ file, dataUri });
        setNewDocInfo({ title: file.name.split('.').slice(0, -1).join('.'), type: '' });
        setIsDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerifyAndSave = async () => {
    if (!currentFile || !newDocInfo.title || !newDocInfo.type) {
        toast({ title: "Incomplete Information", description: "Please provide a title and type for the document.", variant: "destructive" });
        return;
    }

    setIsVerifying(true);
    setIsDialogOpen(false);

    try {
        const result = await verifyDocumentAuthenticity({
            photoDataUri: currentFile.dataUri,
            documentType: newDocInfo.type,
        });

        let status: VerificationStatus;
        let toastDescription: string;

        if (result.isAuthentic) {
            status = 'Verified';
            toastDescription = `Document '${newDocInfo.title}' has been successfully verified.`;
        } else if (result.confidence > 0.4) { // Threshold for needing human review
            status = 'Needs Review';
            toastDescription = `Our AI could not confirm authenticity. Your document has been sent for manual review by DARS.`;
        } else {
            status = 'Unverified';
            toastDescription = `Our AI has flagged this document as potentially unauthentic.`;
        }

        const newDocument: UploadedDocument = {
            id: Date.now(),
            title: newDocInfo.title,
            type: newDocInfo.type,
            dataUri: currentFile.dataUri,
            verification: result,
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            status: status,
        };

        setUploadedDocuments(prev => [newDocument, ...prev]);
        toast({ title: "Verification Complete", description: toastDescription });
    } catch (error) {
        toast({ title: "Verification Failed", description: "Could not verify the document. Please try again.", variant: "destructive" });
    } finally {
        setIsVerifying(false);
        setCurrentFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }
  };

  const filteredIssuedDocuments = issuedDocuments.filter(doc => activeFilter === 'All Documents' || doc.type === activeFilter);

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'Verified':
        return <Badge variant="default" className="bg-accent text-accent-foreground whitespace-nowrap"><CheckCircle className="mr-1 h-3 w-3" /> Verified</Badge>;
      case 'Needs Review':
        return <Badge variant="secondary" className="whitespace-nowrap"><PencilRuler className="mr-1 h-3 w-3" /> Needs Review</Badge>;
      case 'Unverified':
      default:
        return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" /> Unverified</Badge>;
    }
  };

  const EmptyUploadedState = () => (
    <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
      <div className="p-4 bg-muted rounded-full">
        <FilePlus2 className="h-10 w-10 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-semibold">No uploaded documents</p>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Upload and verify documents to store them securely in your digital wallet.
        </p>
        <Button onClick={handleUploadClick}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Your First Document
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col h-full space-y-4">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-headline">Documents</h1>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleUploadClick}>Upload Document</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <Tabs defaultValue="issued" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="issued">Issued</TabsTrigger>
            <TabsTrigger value="uploaded">Uploaded</TabsTrigger>
          </TabsList>
          
          <TabsContent value="issued" className="space-y-4">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
              {issuedDocFilters.map((filter) => (
                <Button 
                  key={filter.name}
                  variant={activeFilter === filter.name ? 'default' : 'secondary'}
                  className="shrink-0"
                  onClick={() => setActiveFilter(filter.name)}
                >
                  <filter.icon className="mr-2 h-4 w-4"/>
                  {filter.name}
                </Button>
              ))}
            </div>
            <div>
              {filteredIssuedDocuments.length > 0 ? (
                <>
                  <p className="text-sm text-muted-foreground mb-2">
                    {`${filteredIssuedDocuments.length} issued document(s) under "${activeFilter}"`}
                  </p>
                  <div className="space-y-3">
                    {filteredIssuedDocuments.map((doc) => (
                      <Card key={doc.id}>
                        <CardContent className="p-4 flex justify-between items-start">
                          <div>
                            <p className="text-sm text-primary font-medium">Valid until {doc.validUntil}</p>
                            <p className="text-lg font-bold">{doc.title}</p>
                            <p className="text-muted-foreground">{doc.issuer}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="-mr-2 -mt-2 h-8 w-8 rounded-full"><MoreVertical className="h-5 w-5" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Share Document</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">Revoke</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-10"><p>No issued documents found.</p></div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="uploaded">
              {isVerifying ? (
                 <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-lg font-semibold">Verifying Document...</p>
                    <p className="text-muted-foreground text-sm">Our AI is analyzing your document for authenticity.</p>
                 </div>
              ) : uploadedDocuments.length === 0 ? (
                <EmptyUploadedState />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {uploadedDocuments.map(doc => (
                        <Card key={doc.id} className="flex flex-col">
                            <CardHeader>
                               <div className="flex items-start justify-between">
                                  <CardTitle className="text-base font-bold pr-2">{doc.title}</CardTitle>
                                  {getStatusBadge(doc.status)}
                               </div>
                            </CardHeader>
                            <CardContent className="flex-grow flex flex-col justify-between">
                                <div className="relative w-full h-40 bg-muted rounded-md mb-4 overflow-hidden">
                                  <Image src={doc.dataUri} alt={doc.title} layout="fill" objectFit="contain" />
                                </div>
                                <div className="space-y-1 text-sm">
                                    <p><span className="font-semibold">Type:</span> {doc.type}</p>
                                    <p><span className="font-semibold">Uploaded:</span> {doc.date}</p>
                                    <p className="text-xs text-muted-foreground pt-1">{doc.verification.reasoning}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
              )}
          </TabsContent>
        </Tabs>
        
        <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,.pdf" />

        <div className="sm:hidden fixed bottom-[calc(theme(spacing.16)_+_theme(spacing.4))] left-4 right-4 z-30">
          <Button onClick={handleUploadClick} className="w-full h-12 text-base font-semibold shadow-lg bg-foreground text-background hover:bg-foreground/90">
            <Upload className="mr-2 h-5 w-5" />
            Upload a document
          </Button>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Document Details</DialogTitle>
                <DialogDescription>Provide some details about the document you are uploading.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="doc-title">Document Title</Label>
                    <Input id="doc-title" value={newDocInfo.title} onChange={(e) => setNewDocInfo(p => ({...p, title: e.target.value}))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="doc-type">Document Type</Label>
                    <Select value={newDocInfo.type} onValueChange={(value) => setNewDocInfo(p => ({...p, type: value}))}>
                        <SelectTrigger id="doc-type">
                            <SelectValue placeholder="Select a type..." />
                        </SelectTrigger>
                        <SelectContent>
                            {docTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleVerifyAndSave} disabled={isVerifying}>
                    {isVerifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Verify and Save
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
