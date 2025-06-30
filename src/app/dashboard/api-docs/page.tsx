import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function ApiDocsPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))] space-y-4">
        <div className="flex items-center gap-4 flex-shrink-0">
            <Button asChild variant="outline" size="icon">
                <Link href="/dashboard/developer">
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Back to Developer Portal</span>
                </Link>
            </Button>
            <div className="flex-1">
                <h1 className="text-3xl font-bold font-headline">API Documentation</h1>
                <p className="text-muted-foreground">
                    Explore and interact with the Ethio Pass API endpoints below.
                </p>
            </div>
            <Button asChild variant="outline">
                <a href="/api-docs.html" download="ethio-pass-api-docs.html">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </a>
            </Button>
        </div>
        <Card className="flex-1">
            <CardContent className="p-0 h-full">
                <iframe
                    src="/api-docs.html"
                    className="w-full h-full rounded-lg"
                    title="API Documentation"
                />
            </CardContent>
        </Card>
    </div>
  );
}
