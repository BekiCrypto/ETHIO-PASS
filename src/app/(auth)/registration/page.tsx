'use client';

import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox";
import { EthioPassLogo } from "@/components/aman-logo"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function RegistrationPage() {
  const [fullName, setFullName] = useState('');
  const [fayidaId, setFayidaId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();

  const handleSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    
    if (!agreed) {
        toast({
            title: "Agreement Required",
            description: "You must agree to the Terms of Service and Privacy Policy.",
            variant: "destructive"
        });
        setIsLoading(false);
        return;
    }

    const phoneRegex = /^(\+2519|09)\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
        toast({
            title: "Invalid Phone Number",
            description: "Please enter a valid Ethiopian phone number (e.g., 0912345678 or +251912345678).",
            variant: "destructive"
        });
        setIsLoading(false);
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Successfully created account:", user);
        // In a real application, you would save the full name, phone number, and Fayida ID
        // to a database (like Firestore) associated with user.uid here.
        router.push('/consent');
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
              <Label htmlFor="fayida-id">Fayida ID (Optional)</Label>
              <Input
                id="fayida-id"
                placeholder="123456789012"
                value={fayidaId}
                onChange={(e) => setFayidaId(e.target.value)}
                disabled={isLoading}
              />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                type="tel"
                placeholder="0912345678"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
             <div className="flex items-center space-x-2">
              <Checkbox id="terms" onCheckedChange={(checked) => setAgreed(Boolean(checked))} />
              <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                  I agree to the <Link href="/terms" target="_blank" className="underline text-foreground hover:text-primary">Terms of Service</Link> and <Link href="/privacy" target="_blank" className="underline text-foreground hover:text-primary">Privacy Policy</Link>.
              </Label>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !agreed}>
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
