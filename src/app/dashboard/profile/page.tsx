'use client';

import { ArrowLeft, RefreshCw, Pencil, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { app } from '@/firebase';

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

const getInitials = (name?: string | null) => {
  if (!name) return "U";
  const parts = name.split(" ");
  if (parts.length > 1 && parts[0] && parts[parts.length - 1]) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

export default function ProfilePage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
        }
        setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center text-center">
        <p>Could not load user profile. Please try logging in again.</p>
      </div>
    );
  }

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
            <AvatarImage src={user.photoURL || "https://placehold.co/80x80.png"} alt={user.displayName || "User"} data-ai-hint="person" />
            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-lg tracking-wider">{user.displayName?.toUpperCase() || 'USER NAME'}</p>
            <p className="text-muted-foreground text-sm font-mono">{user.uid}</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold px-1">Personal details</h2>
        <div className="space-y-2">
            <DetailItem label="Mobile Number" value={user.phoneNumber || "Not provided"} editable />
            <DetailItem label="Email Address" value={user.email || "Not provided"} editable />
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
