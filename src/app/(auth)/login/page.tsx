'use client';

import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EthioPassLogo } from "@/components/aman-logo"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "@/firebase" 
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isPhone = /^(\+2519|09)\d{8}$/.test(identifier);
    const isFayidaId = /^\d{12}$/.test(identifier);

    if (isEmail) {
      signInWithEmailAndPassword(auth, identifier, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Successfully logged in:", user);
          router.push('/dashboard');
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          toast({
            title: "Login Failed",
            description: "Please check your email and password.",
            variant: "destructive"
          })
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (isPhone) {
        toast({
            title: "Phone Login Not Supported",
            description: "Password login with a phone number is not yet available. Please use your email address.",
            variant: "destructive"
        });
        setIsLoading(false);
    } else if (isFayidaId) {
        toast({
            title: "Fayida ID Login Not Supported",
            description: "Password login with a Fayida ID is not yet available. Please use your email address.",
            variant: "destructive"
        });
        setIsLoading(false);
    }
    else {
        toast({
            title: "Invalid Input",
            description: "Please enter a valid email, phone number, or Fayida ID.",
            variant: "destructive"
        });
        setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <EthioPassLogo />
        <CardTitle className="text-2xl mt-4">Login</CardTitle>
        <CardDescription>
          Enter your email, phone, or Fayida ID to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="identifier">Email, Phone, or Fayida ID</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="e.g. m@example.com / 09... / 123..."
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
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
              {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
            </Button>
            <Button variant="outline" className="w-full" disabled={isLoading}>
              Login with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/registration" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
