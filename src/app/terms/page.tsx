import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EthioPassLogo } from "@/components/aman-logo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
  return (
    <>
      <header className="px-4 lg:px-6 h-16 flex items-center bg-card shadow-sm z-10 sticky top-0">
        <EthioPassLogo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </nav>
      </header>
      <main className="container mx-auto py-12 px-4 md:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-headline">Terms of Service</CardTitle>
            <p className="text-muted-foreground">Last Updated: July 23, 2024</p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
                <p>
                Welcome to Ethio Pass. These Terms of Service ("Terms") govern your use of the Ethio Pass digital identity platform, including our website, mobile applications, and API services (collectively, the "Services"), provided by the Federal Democratic Republic of Ethiopia.
                </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-headline">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mt-2">
                By creating an Ethio Pass account or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use the Services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-headline">2. Description of Service</h2>
              <p className="text-muted-foreground mt-2">
                Ethio Pass provides a secure digital identity for Ethiopian citizens and residents. The Services include, but are not limited to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Identity verification using national documents (e.g., National ID, Passport, Driver's License).</li>
                <li>Biometric verification through selfie and liveness checks (e-KYC).</li>
                <li>A unified digital access (Single Sign-On) for various government and private sector services.</li>
                <li>Secure digital signature capabilities.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-headline">3. User Responsibilities</h2>
              <p className="text-muted-foreground mt-2">
                You are responsible for all activities that occur under your Ethio Pass account. You agree to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>Provide accurate, current, and complete information during the registration process.</li>
                <li>Maintain the security of your password and identification.</li>
                <li>Notify us immediately of any unauthorized use of your account.</li>
                <li>Use the Services in compliance with all applicable local, regional, national, and international laws, including the laws of Ethiopia.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-headline">4. Prohibited Conduct</h2>
              <p className="text-muted-foreground mt-2">
                You agree not to misuse the Services or help anyone else to do so. This includes, but is not limited to, attempting to:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Create a false identity or impersonate another person.</li>
                  <li>Upload fraudulent or altered documents.</li>
                  <li>Circumvent any security features of the Services.</li>
                  <li>Interfere with or disrupt the integrity or performance of the Services.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-headline">5. Termination</h2>
              <p className="text-muted-foreground mt-2">
                We reserve the right to suspend or terminate your access to the Services at any time, with or without cause or notice, for any reason, including for a violation of these Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-headline">6. Disclaimers</h2>
              <p className="text-muted-foreground mt-2">
                The Services are provided "as is" without any warranties of any kind. We do not guarantee that the Services will be uninterrupted, secure, or error-free.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-headline">7. Limitation of Liability</h2>
              <p className="text-muted-foreground mt-2">
                To the fullest extent permitted by Ethiopian law, Ethio Pass shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-headline">8. Changes to Terms</h2>
              <p className="text-muted-foreground mt-2">
                We may modify these Terms from time to time. We will provide notice of such changes by posting the updated Terms on our website. Your continued use of the Services after any modification constitutes your acceptance of the new Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-headline">9. Governing Law</h2>
              <p className="text-muted-foreground mt-2">
                These Terms shall be governed by and construed in accordance with the laws of the Federal Democratic Republic of Ethiopia, without regard to its conflict of law principles.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
