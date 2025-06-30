import { NextResponse } from 'next/server';
import { selfieLivenessCheck, SelfieLivenessCheckInput } from '@/ai/flows/selfie-liveness-check';

export async function POST(request: Request) {
  try {
    const body: SelfieLivenessCheckInput = await request.json();
    if (!body.photoDataUri) {
        return NextResponse.json({ error: 'photoDataUri is required' }, { status: 400 });
    }
    const result = await selfieLivenessCheck({ photoDataUri: body.photoDataUri });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/liveness:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ error: 'Failed to perform liveness check.', details: errorMessage }, { status: 500 });
  }
}
