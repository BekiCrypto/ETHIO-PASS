'use client';

import { ArrowLeft, Edit, CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { app } from '@/firebase';
import { useRouter } from 'next/navigation';

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <Card className="bg-background shadow-sm">
      <CardContent className="p-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value || 'Not provided'}</p>
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
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
        } else {
            router.replace('/login');
        }
        setLoading(false);
    });
    return () => unsubscribe();
  }, [auth, router]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6 bg-muted/30 p-4 sm:rounded-lg">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="sm:hidden">
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline flex-grow">Personal details</h1>
        <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/settings">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
            </Link>
        </Button>
      </div>

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
        <h2 className="text-xl font-semibold px-1">Account Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <DetailItem label="Display Name" value={user.displayName || ''} />
            <DetailItem label="Email Address" value={user.email || ''} />
            <DetailItem label="Email Verified" value={user.emailVerified ? 'Yes' : 'No'} />
            <DetailItem label="Mobile Number" value={user.phoneNumber || ''} />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold px-1">Fayida ID (Example)</h2>
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
