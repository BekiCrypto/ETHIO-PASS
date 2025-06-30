'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, MoreHorizontal, FileText, Briefcase, AlertCircle, ArrowUpDown, Scale, Building2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const filters = [
    { name: 'Professional', icon: Briefcase },
    { name: 'Legal', icon: Scale },
    { name: 'Property', icon: Building2 },
    { name: 'Others', icon: FileText },
];

const documents = [
  {
    id: 'doc-1',
    title: 'Driving License',
    issuer: 'Ministry of Interior',
    validUntil: '29 Jul 2025',
  }
];

export default function DocumentsPage() {
  const [view, setView] = useState('list');
  const [activeFilter, setActiveFilter] = useState('All Documents');

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
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {filters.map((filter) => (
              <Button 
                key={filter.name}
                variant={"secondary"}
                className="shrink-0"
                onClick={() => setActiveFilter(filter.name)}
              >
                <filter.icon className="mr-2 h-4 w-4"/>
                {filter.name}
              </Button>
            ))}
          </div>

          {/* Document List */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {`${documents.length} issued document under "All Documents"`}
            </p>
            <div className="space-y-3">
              {documents.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-4 flex justify-between items-start">
                    <div>
                      <p className="text-sm text-primary font-medium">Valid until {doc.validUntil}</p>
                      <p className="text-lg font-bold">{doc.title}</p>
                      <p className="text-muted-foreground">{doc.issuer}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mr-2 -mt-2 h-8 w-8 rounded-full">
                          <MoreVertical className="h-5 w-5" />
                          <span className="sr-only">Document options</span>
                        </Button>
                      </DropdownMenuTrigger>
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
          </div>
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
                Request a document
            </Button>
        </div>
    </div>
  );
}
