'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Check, CheckCircle, Star, PenLine, FilePlus2, QrCode, XCircle } from 'lucide-react';

function Action({ title, icon, href }: { title: string, icon: React.ReactNode, href: string }) {
    return (
        <Link href={href} className="flex flex-col items-center text-center justify-center gap-2 p-4 hover:bg-muted/50 transition-colors rounded-lg flex-1">
            <div className="flex items-center justify-center h-12 w-12 bg-accent/10 rounded-full">
               {icon}
            </div>
            <span className="font-semibold text-sm">{title}</span>
        </Link>
    )
}

function ActionListItem({ title, description, icon, href }: { title: string, description: string, icon: React.ReactNode, href: string }) {
    return (
        <Link href={href}>
            <Card className="hover:bg-muted/50 transition-colors shadow-sm">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent/10 rounded-lg">
                            {icon}
                        </div>
                        <div>
                            <p className="font-semibold">{title}</p>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
            </Card>
        </Link>
    )
}

export default function DashboardHomePage() {
  return (
    <div className="relative pb-24 sm:pb-0">
      {/* Curved background */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-primary rounded-b-[3rem] -z-10" />

      <main className="p-4">
        {/* Profile Card */}
        <Card className="shadow-lg">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src="https://placehold.co/80x80.png"
                    width={80}
                    height={80}
                    alt="Bikila Daba Negeri"
                    data-ai-hint="ethiopian man"
                    className="rounded-full border-4 border-background shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1 border-2 border-background">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h1 className="font-bold text-lg tracking-wide">BIKILA DABA NEGERI</h1>
                  <p className="text-sm text-primary font-medium">Verified Account</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end">
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="url(#ethio-gradient-fingerprint-dash)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3" />
                            <path d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6" />
                            <path d="M12 11v2a14 14 0 0 0 2.5 8" />
                            <path d="M8 15a18 18 0 0 0 1.8 6" />
                            <path d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95" />
                        </g>
                         <defs>
                          <linearGradient id="ethio-gradient-fingerprint-dash" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#078930' }} />
                            <stop offset="50%" style={{ stopColor: '#FCDD09' }} />
                            <stop offset="100%" style={{ stopColor: '#DA121A' }} />
                          </linearGradient>
                        </defs>
                    </svg>
                    <span className="font-bold text-sm text-primary">Ethio Pass</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary"/>
                    <span>Signature: Qualified</span>
                </div>
                <Link href="/dashboard/documents" className="flex items-center justify-between gap-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-destructive"/>
                        <span>Documents: N/A</span>
                    </div>
                    <ArrowRight className="h-4 w-4"/>
                </Link>
            </div>
          </CardContent>
        </Card>

        {/* Action Grid */}
        <div className="mt-6">
            <Card className="shadow-sm">
                <div className="flex divide-x">
                    <Action title="Sign Documents" href="#" icon={<PenLine className="h-6 w-6 text-accent"/>} />
                    <Action title="Verify Signature" href="/dashboard/verify" icon={<Check className="h-6 w-6 text-accent"/>} />
                </div>
            </Card>
        </div>

        {/* Action List */}
        <div className="mt-4 space-y-4">
            <ActionListItem title="Add Documents" description="Request official documents from an issuer" href="/dashboard/documents" icon={<FilePlus2 className="h-6 w-6 text-accent"/>} />
            <ActionListItem title="Scan QR Code" description="Use your camera to start document sharing" href="#" icon={<QrCode className="h-6 w-6 text-accent"/>} />
        </div>
        
        {/* Rate Experience */}
        <div className="mt-8 flex justify-center">
            <Button variant="secondary" className="rounded-full bg-primary/5 text-primary hover:bg-primary/10">
                <Star className="h-5 w-5 mr-2" />
                Rate your Experience
            </Button>
        </div>
      </main>
    </div>
  );
}
