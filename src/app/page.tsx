import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ScanSearch, UserCheck, ShieldCheck, FileText, Bot, Server } from 'lucide-react';
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
                Secure Digital Identity for Ethiopia
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Aman ID provides a robust, scalable e-KYC platform with AI-powered verification for a unified digital identity ecosystem.
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
              Platform Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<ScanSearch className="h-10 w-10 text-primary" />}
                title="Advanced OCR Verification"
                description="Effortlessly extract data from National IDs, passports, and driver's licenses with Amharic language support."
              />
              <FeatureCard
                icon={<UserCheck className="h-10 w-10 text-primary" />}
                title="AI Liveness Check"
                description="Prevent fraud with cutting-edge AI that ensures the user is a real, live person during selfie verification."
              />
              <FeatureCard
                icon={<ShieldCheck className="h-10 w-10 text-primary" />}
                title="Robust Admin Panel"
                description="Manage users, monitor verification requests, and view detailed audit logs and fraud alerts."
              />
              <FeatureCard
                icon={<FileText className="h-10 w-10 text-primary" />}
                title="Developer-Friendly API"
                description="Integrate our services seamlessly with well-documented APIs, SDKs, and a dedicated developer portal."
              />
              <FeatureCard
                icon={<Bot className="h-10 w-10 text-primary" />}
                title="Biometric Matching"
                description="Future-proof your verification with upcoming support for face and fingerprint biometric comparisons."
              />
              <FeatureCard
                icon={<Server className="h-10 w-10 text-primary" />}
                title="Scalable Infrastructure"
                description="Built on a modern microservices architecture to ensure reliability and scalability for enterprise needs."
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl font-headline">Ready to Secure Your Services?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Join the forefront of digital identity in Ethiopia. Create an account to start verifying users today.
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
