'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, MoreHorizontal, FileText, User, Briefcase, AlertCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function DocumentsPage() {
  const [view, setView] = useState('list');
  const [sortBy, setSortBy] = useState('documentName');

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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">More Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={view} onValueChange={setView}>
                <DropdownMenuRadioItem value="list">List view (default)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="type">Type view</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                <DropdownMenuRadioItem value="documentName">Sort by document name (default)</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="issuerName">Sort by issuer name</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

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
            No issued documents under "All Documents"
          </p>
        </TabsContent>
        
        <TabsContent value="uploaded">
            <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
                <div className="p-4 bg-muted rounded-full">
                    <AlertCircle className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-semibold">No uploaded documents yet</p>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    You can add a document by tapping "Upload a document"
                  </p>
                </div>
            </div>
        </TabsContent>
      </Tabs>
      
      {/* Footer Button - mobile only */}
       <div className="sm:hidden fixed bottom-[calc(theme(spacing.16)_+_theme(spacing.4))] left-4 right-4 z-30">
            <Button className="w-full h-12 text-base font-semibold shadow-lg bg-foreground text-background hover:bg-foreground/90">
                Upload a document
            </Button>
        </div>
    </div>
  );
}
