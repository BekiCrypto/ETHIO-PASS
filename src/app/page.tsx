import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ScanSearch, UserCheck, Server, FileText, KeyRound, PenSquare } from 'lucide-react';
import { AmanLogo } from '@/components/aman-logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card shadow-sm">
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
                Unlocking Ethiopia's Digital Future, Together.
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Aman ID is Ethiopia's national digital identity platform, providing citizens and residents with secure and seamless access to government and private services.
              </p>
              <Button size="lg" asChild>
                <Link href="/dashboard/verify">
                  Verify Your ID Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12 font-headline">
              A Unified Platform for a Digital Ethiopia
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<ScanSearch className="h-10 w-10 text-primary" />}
                title="Unified Digital Identity"
                description="Effortlessly create a unique, biometric-linked digital ID using national documents like IDs, passports, and driver's licenses."
              />
              <FeatureCard
                icon={<UserCheck className="h-10 w-10 text-primary" />}
                title="AI-Verified e-KYC"
                description="Prevent fraud with cutting-edge facial recognition and liveness checks, enabling secure remote onboarding."
              />
               <FeatureCard
                icon={<KeyRound className="h-10 w-10 text-primary" />}
                title="Single Digital Access (SSO)"
                description="One secure login to access multiple government portals, banking services, healthcare, and more."
              />
              <FeatureCard
                icon={<PenSquare className="h-10 w-10 text-primary" />}
                title="Digital Signature"
                description="Sign documents and contracts digitally with a legally recognized and secure electronic signature."
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="Developer-Friendly API"
                description="Integrate our services seamlessly with well-documented APIs and a dedicated developer portal for businesses."
              />
              <FeatureCard
                icon={<Server className="h-10 w-10 text-primary" />}
                title="Digital Governance Backbone"
                description="Providing a secure and interoperable foundation for all public and private sector digital services."
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-headline">Join Ethiopia's Digital Transformation</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Create an account to experience the future of digital identity and help build a more connected Ethiopia.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
                <Button type="submit" className="w-full" asChild>
                    <Link href="/registration">
                        Sign Up for Free
                    </Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card">
        <p className="text-xs text-muted-foreground">&copy; 2024 Aman ID. All rights reserved.</p>
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
    <Card>
      <CardHeader className="flex flex-col items-center text-center">
        {icon}
        <CardTitle className="mt-4 font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground">
        {description}
      </CardContent>
    </Card>
  );
}
