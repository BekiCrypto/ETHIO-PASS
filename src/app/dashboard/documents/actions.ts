'use server';

import { DocumentAuthenticityCheckInput, DocumentAuthenticityCheckOutput } from '@/ai/flows/document-authenticity-check';
import { checkDocumentAuthenticity } from '@/ai/flows/document-authenticity-check';

export async function verifyDocumentAuthenticity(
  input: DocumentAuthenticityCheckInput
): Promise<DocumentAuthenticityCheckOutput> {
  try {
    const result = await checkDocumentAuthenticity(input);
    return result;
  } catch (error) {
    console.error('Error in verifyDocumentAuthenticity:', error);
    throw new Error('Failed to verify document authenticity. The AI service may be unavailable.');
  }
}
