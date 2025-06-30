import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EthioPassLogo } from "@/components/aman-logo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
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
            <CardTitle className="text-4xl font-headline">Privacy Policy</CardTitle>
            <p className="text-muted-foreground">Last Updated: July 23, 2025</p>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <p className="text-muted-foreground">
                This Privacy Policy describes how Ethio Pass collects, uses, and protects your personal information when you use our Services. We are committed to protecting your privacy in accordance with the laws of the Federal Democratic Republic of Ethiopia, including the Personal Data Protection Proclamation (No. 1321/2024).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-headline mb-2">1. Information We Collect</h2>
              <p className="text-muted-foreground">We collect information necessary to provide and secure our Services, including:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li><strong>Personal Identification Information:</strong> Your full name, date of birth, gender, and other information present on your government-issued ID.</li>
                <li><strong>Document Information:</strong> Images of your National ID, Passport, or Driver's License that you provide for verification.</li>
                <li><strong>Biometric Information:</strong> A selfie image for liveness detection and facial comparison against your ID photo.</li>
                <li><strong>Contact Information:</strong> Your email address and phone number for account creation and communication.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our Services, such as API calls and login history, for security and service improvement.</li>
              </ul>
            </div>

            <div>
                <h2 className="text-2xl font-headline mb-2">2. How We Use Your Information</h2>
                <p className="text-muted-foreground">Your information is used for the following purposes:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                    <li>To create and manage your Ethio Pass account.</li>
                    <li>To verify your identity and prevent fraud (e-KYC).</li>
                    <li>To enable your use of the Services, such as Single Sign-On and digital signatures.</li>
                    <li>To secure your account and our platform.</li>
                    <li>To communicate with you about your account and our Services.</li>
                    <li>To comply with our legal obligations under Ethiopian law.</li>
                </ul>
            </div>
            
            <div>
                <h2 className="text-2xl font-headline mb-2">3. Data Security</h2>
                <p className="text-muted-foreground">
                    We implement state-of-the-art security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. This includes encryption of data at rest and in transit, access controls, and regular security audits. Your biometric data is processed securely and used solely for the purpose of verification.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-headline mb-2">4. Data Sharing and Disclosure</h2>
                <p className="text-muted-foreground">
                    We do not sell your personal data. We may share your information only in the following limited circumstances:
                </p>
                 <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                    <li><strong>With Your Consent:</strong> When you use your Ethio Pass to log in to a third-party service (government or private), we will share only the necessary information to authenticate you, with your explicit consent for each transaction.</li>
                    <li><strong>For Legal Reasons:</strong> We may disclose information if required to do so by law or in response to valid requests by public authorities in Ethiopia.</li>
                </ul>
            </div>
            
            <div>
                <h2 className="text-2xl font-headline mb-2">5. Your Rights</h2>
                <p className="text-muted-foreground">
                    In accordance with the Personal Data Protection Proclamation (No. 1321/2024), you have the right to:
                </p>
                 <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                    <li>Access the personal data we hold about you.</li>
                    <li>Request the correction of inaccurate or incomplete data.</li>
                    <li>Request the deletion of your personal data, subject to legal and contractual restrictions.</li>
                    <li>Object to or restrict the processing of your data in certain circumstances.</li>
                 </ul>
                 <p className="mt-2 text-muted-foreground">To exercise these rights, please contact our support team.</p>
            </div>

             <div>
                <h2 className="text-2xl font-headline mb-2">6. Changes to This Policy</h2>
                <p className="text-muted-foreground">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
                </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
