'use client';

import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AmanLogo } from "@/components/aman-logo"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { app } from "@/firebase" 
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
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
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <AmanLogo />
        <CardTitle className="text-2xl mt-4">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
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
