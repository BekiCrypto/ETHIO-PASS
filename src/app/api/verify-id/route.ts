import { NextResponse } from 'next/server';
import { ethiopianOCRVerification, EthiopianOCRVerificationInput } from '@/ai/flows/ethiopian-ocr-verification';

export async function POST(request: Request) {
  try {
    const body: EthiopianOCRVerificationInput = await request.json();
    if (!body.photoDataUri) {
        return NextResponse.json({ error: 'photoDataUri is required' }, { status: 400 });
    }
    const result = await ethiopianOCRVerification({ photoDataUri: body.photoDataUri });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/verify-id:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ error: 'Failed to verify ID document.', details: errorMessage }, { status: 500 });
  }
}
