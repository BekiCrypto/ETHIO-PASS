'use client';

import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EthioPassLogo } from "@/components/aman-logo"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function RegistrationPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Successfully created account:", user);
        toast({
          title: "Account Created",
          description: "Your account has been successfully created. Please login.",
        });
        router.push('/login');
      })
      .catch((error) => {
        console.error("Error creating account:", error);
        toast({
          title: "Sign Up Failed",
          description: error.message,
          variant: "destructive"
        })
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <EthioPassLogo />
        <CardTitle className="text-2xl mt-4">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input 
                id="full-name" 
                placeholder="Abebe Bikila" 
                required 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin" /> : 'Create an account'}
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
