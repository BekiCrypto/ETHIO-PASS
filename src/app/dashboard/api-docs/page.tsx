'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function ApiDocsPage() {
  const [swaggerSpec, setSwaggerSpec] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/swagger.json')
      .then((res) => res.json())
      .then((data) => {
        setSwaggerSpec(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load swagger spec", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/dashboard/developer">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to Developer Portal</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">API Documentation</h1>
      </div>
      <p className="text-muted-foreground">
        Integrate Aman ID's verification services into your applications using our RESTful API. Below is the OpenAPI 3.0 specification for our endpoints. You can use this specification with tools like Swagger UI or Postman to interact with the API.
      </p>
      <Card>
        <CardHeader>
          <CardTitle>OpenAPI Specification (swagger.json)</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : swaggerSpec ? (
            <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
              <code>
                {JSON.stringify(swaggerSpec, null, 2)}
              </code>
            </pre>
          ) : (
            <p className="text-destructive">Failed to load API specification.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
