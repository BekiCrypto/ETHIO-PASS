'use client';

import { ArrowLeft, RefreshCw, Pencil, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

function DetailItem({ label, value, editable = false }: { label: string, value: string, editable?: boolean }) {
  return (
    <Card className="bg-background shadow-sm">
      <CardContent className="p-3 flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-semibold">{value}</p>
        </div>
        {editable && (
          <Button variant="ghost" size="icon" className="text-primary">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function ProfilePage() {
  return (
    <div className="space-y-6 bg-muted/30 p-4 sm:rounded-lg">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="sm:hidden">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">Personal details</h1>
      </div>

      <Card className="bg-green-100/50 dark:bg-green-900/20 border-green-500/30">
        <CardContent className="p-3 flex items-start gap-3">
          <RefreshCw className="h-5 w-5 text-green-700 dark:text-green-400 mt-1 flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm text-green-800 dark:text-green-300">Is your data outdated?</p>
            <p className="text-xs text-green-700/80 dark:text-green-400/80">
              Refresh or pull down the screen to update your details as per Federal Authority for Identity, Citizenship, Customs & Port Security.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://placehold.co/80x80.png" alt="Bikila Daba Negeri" data-ai-hint="ethiopian man" />
            <AvatarFallback>BN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-lg tracking-wider">BIKILA DABA NEGERI</p>
            <p className="text-muted-foreground text-sm font-mono">784198094733189</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold px-1">Personal details</h2>
        <div className="space-y-2">
            <DetailItem label="Mobile Number" value="+251 91 527 6631" editable />
            <DetailItem label="Email Address" value="bikilad@gmail.com" editable />
            <DetailItem label="Date of Birth" value="08 Jan 1980" />
            <DetailItem label="Nationality" value="Ethiopia" />
            <DetailItem label="Gender" value="Male" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold px-1">Fayida ID</h2>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <CreditCard className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Fayida ID Number</p>
              <p className="font-semibold text-lg">784198094733189</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
