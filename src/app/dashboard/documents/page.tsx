'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, ArrowUpDown, MoreHorizontal, FileText, User, Briefcase, MoreVertical } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Documents</h1>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search Documents</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowUpDown className="h-5 w-5" />
            <span className="sr-only">Sort Documents</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontal className="h-5 w-5" />
            <span className="sr-only">More Options</span>
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="issued" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="issued">Issued</TabsTrigger>
          <TabsTrigger value="uploaded">Uploaded</TabsTrigger>
        </TabsList>
        
        <TabsContent value="issued" className="space-y-4">
          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button>
              <FileText className="mr-2 h-4 w-4"/>
              All Documents
            </Button>
            <Button variant="secondary">
              <User className="mr-2 h-4 w-4"/>
              Personal
            </Button>
            <Button variant="secondary">
               <Briefcase className="mr-2 h-4 w-4"/>
              Professional
            </Button>
          </div>

          {/* Document Count */}
          <p className="text-sm text-muted-foreground">
            1 issued document under "All Documents"
          </p>

          {/* Document Card */}
          <Card>
            <CardContent className="p-4 flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-accent font-medium">Valid until 29 Jul 2025</p>
                <h3 className="text-lg font-bold">Driving License</h3>
                <p className="text-sm text-muted-foreground">Ministry of Interior</p>
              </div>
              <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">Document Options</span>
              </Button>
            </CardContent>
          </Card>

        </TabsContent>
        
        <TabsContent value="uploaded">
            <div className="flex flex-col items-center justify-center text-center py-24">
                <p className="text-muted-foreground">
                You have not uploaded any documents.
                </p>
            </div>
        </TabsContent>
      </Tabs>
      
      {/* Footer Button - mobile only */}
       <div className="sm:hidden fixed bottom-[calc(theme(spacing.16)_+_theme(spacing.4))] left-4 right-4 z-30">
            <Button className="w-full h-12 text-base font-semibold shadow-lg">
                Request a document
            </Button>
        </div>
    </div>
  );
}
