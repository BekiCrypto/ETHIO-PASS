import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, UserPlus, ScanFace, KeyRound, ShieldCheck, FileText, Server } from 'lucide-react';
import { AmanLogo } from '@/components/aman-logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card shadow-sm z-10">
        <AmanLogo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
            Login
          </Link>
          <Button asChild>
            <Link href="/registration">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
                  The National Digital Identity for Ethiopia
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Ethio Pass is your secure digital identity to access government and private sector services easily and safely from anywhere.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/registration">
                      Create Your Ethio Pass
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x600.png"
                width="600"
                height="600"
                alt="Ethio Pass App"
                data-ai-hint="phone app"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-card">
            <div className="container px-4 md:px-6">
                 <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Get Started in 3 Simple Steps</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Follow our straightforward process to create your digital identity and unlock a world of services.
                    </p>
                </div>
                <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3">
                    <div className="grid gap-1 text-center">
                        <div className="flex justify-center items-center mb-4">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                                <UserPlus className="h-8 w-8" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold font-headline">1. Register</h3>
                        <p className="text-muted-foreground">Quickly sign up with your basic information to begin the process.</p>
                    </div>
                    <div className="grid gap-1 text-center">
                         <div className="flex justify-center items-center mb-4">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                                <ScanFace className="h-8 w-8" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold font-headline">2. Verify Your ID</h3>
                        <p className="text-muted-foreground">Upload your document and take a selfie for AI-powered verification.</p>
                    </div>
                    <div className="grid gap-1 text-center">
                         <div className="flex justify-center items-center mb-4">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground">
                                <KeyRound className="h-8 w-8" />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold font-headline">3. Access Services</h3>
                        <p className="text-muted-foreground">Use your new digital ID to log in to services across Ethiopia.</p>
                    </div>
                </div>
            </div>
        </section>


        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12 font-headline">
              A Unified Platform for a Digital Ethiopia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title="Unified Digital Identity"
                description="A single, secure, biometric-linked digital ID for every Ethiopian citizen and resident."
              />
              <FeatureCard
                icon={<ScanFace className="h-10 w-10 text-primary" />}
                title="AI-Verified e-KYC"
                description="Prevent fraud with cutting-edge facial recognition and liveness checks for secure remote onboarding."
              />
               <FeatureCard
                icon={<KeyRound className="h-10 w-10 text-primary" />}
                title="Single Digital Access (SSO)"
                description="One secure login to access multiple government portals, banking services, healthcare, and more."
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="Developer-Friendly API"
                description="Integrate our services seamlessly with well-documented APIs for businesses and institutions."
              />
              <FeatureCard
                icon={<Server className="h-10 w-10 text-primary" />}
                title="Digital Governance Backbone"
                description="Providing a secure and interoperable foundation for all public and private sector digital services."
              />
               <FeatureCard
                icon={<UserPlus className="h-10 w-10 text-primary" />}
                title="Digital Signature"
                description="Sign documents and contracts digitally with a legally recognized and secure electronic signature."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-headline">Join Ethiopia's Digital Transformation</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Create an account to experience the future of digital identity and help build a more connected Ethiopia.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
                <Button type="submit" className="w-full" asChild size="lg">
                    <Link href="/registration">
                        Sign Up for Free
                    </Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Ethio Pass. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col items-center text-center">
        {icon}
        <CardTitle className="mt-4 font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground flex-grow">
        {description}
      </CardContent>
    </Card>
  );
}
