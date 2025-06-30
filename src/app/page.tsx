import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, UserPlus, ScanFace, KeyRound, ShieldCheck, FileText, Server, PenSquare, BadgeCheck, FilePlus2, QrCode, Home as HomeIcon, Bell, User as UserIcon, Check, Landmark, GraduationCap, Building, User } from 'lucide-react';
import { EthioPassLogo } from '@/components/aman-logo';


function FrontPagePromo() {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
      <div className="w-[140px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[13px] top-[72px] rounded-l-lg"></div>
      <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[13px] top-[124px] rounded-l-lg"></div>
      <div className="h-[46px] w-[3px] bg-gray-800 absolute -right-[13px] top-[142px] rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background">
        <div className="bg-background px-2 pt-2 pb-4 h-full flex flex-col">
          {/* App Screen Content */}
          <div className="flex-grow flex flex-col gap-4 p-2">
            
            {/* Header */}
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 1.00012C12.3333 3.33346 9.66667 3.33346 7 1.00012M11.5 1.00012C9.83333 2.50012 8.16667 2.50012 6.5 1.00012M4 1.00012C4.83333 1.50012 5.66667 1.50012 6.5 1.00012" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.5 4.50012C4.16667 3.00012 5.83333 3.00012 7.5 4.50012" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.6667 1H1.33333C0.596954 1 0 1.59695 0 2.33333V9.66667C0 10.403 0.596954 11 1.33333 11H14.6667C15.403 11 16 10.403 16 9.66667V2.33333C16 1.59695 15.403 1 14.6667 1Z" fill="currentColor"></path></svg>
              </div>
            </div>

            {/* Profile Section */}
            <div className="p-4 bg-primary/10 rounded-2xl relative">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src="https://placehold.co/80x80.png"
                    width={80}
                    height={80}
                    alt="Photo of Abebe Bikila"
                    data-ai-hint="ethiopian man"
                    className="rounded-full border-4 border-white shadow-md object-cover"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-primary/10">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="font-bold text-lg text-foreground">Abebe Bikila</h2>
                  <p className="text-sm text-green-600 font-medium">Verified Account</p>
                </div>
              </div>
               <div className="absolute top-2 right-2 text-primary/70">
                 <div className="flex items-center gap-1">
                     <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="url(#ethio-gradient-fingerprint-promo)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3" />
                            <path d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6" />
                            <path d="M12 11v2a14 14 0 0 0 2.5 8" />
                            <path d="M8 15a18 18 0 0 0 1.8 6" />
                            <path d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95" />
                        </g>
                         <defs>
                          <linearGradient id="ethio-gradient-fingerprint-promo" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#078930' }} />
                            <stop offset="50%" style={{ stopColor: '#FCDD09' }} />
                            <stop offset="100%" style={{ stopColor: '#DA121A' }} />
                          </linearGradient>
                        </defs>
                    </svg>
                    <span className="font-bold text-sm">Ethio Pass</span>
                 </div>
               </div>
              <div className="mt-4 flex justify-around text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Signature: Verified</span>
                <span className="flex items-center gap-1"><Check className="h-3 w-3 text-green-500" /> Document: Available</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <ActionItem icon={<PenSquare className="text-primary"/>} title="Sign Documents" />
              <ActionItem icon={<BadgeCheck className="text-primary"/>} title="Verify Documents" />
              <ActionItem icon={<FilePlus2 className="text-primary"/>} title="Add Documents" description="Add Documents to your Wallet" />
              <ActionItem icon={<QrCode className="text-primary"/>} title="Scan QR Code" description="Scan QR code to open and validate" />
            </div>
            
          </div>
          {/* Bottom Nav */}
          <div className="border-t border-border flex justify-around items-center p-2">
            <NavItem icon={<HomeIcon className="text-primary"/>} label="Home" active />
            <NavItem icon={<FileText className="text-muted-foreground"/>} label="Documents" />
            <NavItem icon={<Bell className="text-muted-foreground"/>} label="Notifications" />
            <NavItem icon={<UserIcon className="text-muted-foreground"/>} label="Profile" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionItem({ icon, title, description }: { icon: React.ReactNode, title: string, description?: string }) {
  return (
    <div className="bg-card p-3 rounded-lg shadow-sm flex items-center gap-4">
      <div className="bg-primary/10 p-2 rounded-md">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-sm">{title}</h3>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {icon}
      <span className={`text-xs ${active ? 'text-primary font-bold' : 'text-muted-foreground'}`}>{label}</span>
    </div>
  )
}


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card shadow-sm z-10">
        <EthioPassLogo />
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
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <Button size="lg" asChild>
                          <Link href="/registration">
                          Create Your Ethio Pass
                          <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                      </Button>
                  </div>
                  <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row">
                      <Link href="#" className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/90 w-full sm:w-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="mr-3 h-8 w-8">
                              <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/>
                              <path d="M10 2c1 .5 2 2 2 5"/>
                          </svg>
                          <div className="text-left">
                              <p className="text-xs">Download on the</p>
                              <p className="text-base font-semibold -mt-1">App Store</p>
                          </div>
                      </Link>
                      <Link href="#" className="inline-flex items-center justify-center rounded-lg bg-foreground text-background px-4 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/90 w-full sm:w-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-3 h-7 w-7">
                              <path d="M22.471 10.916L3.92 1.047A1.511 1.511 0 0 0 2.445.923a1.522 1.522 0 0 0-.008 2.82l8.932 5.244-8.931 5.243a1.522 1.522 0 0 0 .008 2.82 1.511 1.511 0 0 0 1.474-.124l18.553-9.869a1.522 1.522 0 0 0 0-2.694z"/>
                          </svg>
                          <div className="text-left">
                              <p className="text-xs">GET IT ON</p>
                              <p className="text-base font-semibold -mt-1">Google Play</p>
                          </div>
                      </Link>
                  </div>
                </div>
              </div>
              <FrontPagePromo />
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
                icon={<PenSquare className="h-10 w-10 text-primary" />}
                title="Digital Signature"
                description="Sign documents and contracts digitally with a legally recognized and secure electronic signature."
              />
            </div>
          </div>
        </section>
        
        {/* Document Verification Section */}
        <section id="document-verification" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Document Verification</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A New Standard for Document Trust</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                For individuals and enterprises, Ethio Pass authenticates your most critical documents, providing a trusted digital verification badge. Reduce workload, wait times, and investment in manual checks.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <h3 className="text-2xl font-bold">Verify Any Document, Instantly</h3>
                <p className="text-muted-foreground">
                  Our powerful AI analyzes various document types for authenticity, giving you peace of mind and a verifiable, tamper-proof digital version.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <li className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>Identity & Legal Docs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span>Professional Certificates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <HomeIcon className="h-5 w-5 text-primary" />
                    <span>Title Deeds & Land Titles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Landmark className="h-5 w-5 text-primary" />
                    <span>Bank & Financial Docs</span>
                  </li>
                </ul>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                width="550"
                height="310"
                alt="Verified Document"
                data-ai-hint="verified document"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 mt-12">
                <div className="grid gap-4">
                    <div className="flex items-center gap-3">
                        <User className="h-8 w-8 text-primary"/>
                        <h4 className="text-xl font-bold">For Individuals</h4>
                    </div>
                    <p className="text-muted-foreground">
                        Securely digitize and verify your personal documents. Share a tamper-proof version with banks, employers, or government agencies with a single click.
                    </p>
                </div>
                <div className="grid gap-4">
                    <div className="flex items-center gap-3">
                        <Building className="h-8 w-8 text-primary"/>
                        <h4 className="text-xl font-bold">For Enterprises</h4>
                    </div>
                    <p className="text-muted-foreground">
                        Integrate our API to automate your document verification workflow. Reduce fraud, cut operational costs, and onboard customers faster with a system you can trust.
                    </p>
                </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
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
        <p className="text-xs text-muted-foreground">&copy; 2025 Ethio Pass. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/terms" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
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
