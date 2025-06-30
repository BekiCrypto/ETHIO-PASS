'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EthioPassLogo } from "@/components/aman-logo";
import { getAuth, signOut, onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { app } from '@/firebase';
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, FileText } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ConsentPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();

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

  const handleAgree = () => {
    toast({
        title: "Welcome to Ethio Pass!",
        description: "Your account is now active.",
    });
    router.push('/dashboard');
  };

  const handleDisagree = () => {
    if (!user) return;
    signOut(auth).then(() => {
        toast({
            title: "Account Not Activated",
            description: "You have been signed out. You must agree to the terms to use Ethio Pass.",
            variant: "destructive"
        });
        router.push('/');
    }).catch((error) => {
        console.error("Error signing out:", error);
        toast({
            title: "Error",
            description: "Could not sign you out. Please try again.",
            variant: "destructive"
        });
    });
  };
  
  if (loading) {
    return (
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Card className="mx-auto max-w-lg">
    <CardHeader>
        <EthioPassLogo />
        <CardTitle className="text-2xl mt-4">One Last Step</CardTitle>
        <CardDescription>
        Please review and agree to our terms and policies to continue.
        </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
        <div className="space-y-4 text-sm text-muted-foreground">
            <p>
                Ethio Pass is a service provided by the Federal Democratic Republic of Ethiopia. 
                By clicking "I Agree", you confirm that you have read, understood, and agree to be bound by our legal agreements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/terms" target="_blank" className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted transition-colors w-full">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                        <p className="font-semibold text-foreground">Terms of Service</p>
                        <p className="text-xs">Read the rules for using our service.</p>
                    </div>
                </Link>
                 <Link href="/privacy" target="_blank" className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted transition-colors w-full">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <div>
                        <p className="font-semibold text-foreground">Privacy Policy</p>
                        <p className="text-xs">Learn how we handle your data.</p>
                    </div>
                </Link>
            </div>
            <p>
                Your data is handled with the utmost security and in accordance with Ethiopian law, including the Personal Data Protection Proclamation (No. 1321/2024).
            </p>
        </div>
        
        <div className="flex flex-col sm:flex-row-reverse gap-2">
            <Button onClick={handleAgree} className="w-full">
                I Agree, Continue
            </Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full">I Disagree</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        If you do not agree to the Terms of Service and Privacy Policy, you will not be able to create an Ethio Pass account and use our services. Your account registration will be cancelled and you will be signed out.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Go Back</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDisagree} className={buttonVariants({ variant: "destructive" })}>
                        Yes, I Disagree & Sign Out
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    </CardContent>
    </Card>
  );
}
