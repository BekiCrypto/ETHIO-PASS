'use client';

import { ArrowLeft, CheckCircle2, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const benefits = [
    "Access all available Government Services",
    "Advanced signature",
    "Qualified signature",
    "Verify Ethio Pass signed documents",
    "Request & add documents from issuers",
    "Sharing digital documents",
    "Managing digital documents",
];

function BenefitItem({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p>{text}</p>
        </div>
    );
}

export default function AccountBenefitsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Go back</span>
            </Button>
            <div className="flex-1">
                <h1 className="text-3xl font-bold font-headline">Account Benefits</h1>
                <p className="text-muted-foreground">These are the benefits of Basic Account and Verified Account.</p>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                    <UserCheck className="h-6 w-6 text-primary" />
                    Verified Account
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {benefits.map((benefit, index) => (
                    <BenefitItem key={index} text={benefit} />
                ))}
            </CardContent>
        </Card>
    </div>
  );
}
