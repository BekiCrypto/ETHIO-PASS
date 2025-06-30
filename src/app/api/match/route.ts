import { NextResponse } from 'next/server';
import { biometricMatch, BiometricMatchInput } from '@/ai/flows/biometric-matching';

export async function POST(request: Request) {
  try {
    const body: BiometricMatchInput = await request.json();
    if (!body.idPhotoDataUri || !body.selfiePhotoDataUri) {
        return NextResponse.json({ error: 'idPhotoDataUri and selfiePhotoDataUri are required' }, { status: 400 });
    }
    const result = await biometricMatch({ 
        idPhotoDataUri: body.idPhotoDataUri, 
        selfiePhotoDataUri: body.selfiePhotoDataUri 
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/match:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ error: 'Failed to perform biometric match.', details: errorMessage }, { status: 500 });
  }
}
