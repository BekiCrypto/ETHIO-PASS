'use server';
/**
 * @fileOverview An AI agent to verify the authenticity of a document.
 *
 * This flow analyzes a document image to detect signs of forgery or tampering.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const DocumentAuthenticityCheckInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  documentType: z.string().describe('The type of the document, e.g., "Legal", "Property", "Professional".')
});
export type DocumentAuthenticityCheckInput = z.infer<typeof DocumentAuthenticityCheckInputSchema>;

export const DocumentAuthenticityCheckOutputSchema = z.object({
  isAuthentic: z.boolean().describe('Whether the document appears to be authentic and not tampered with.'),
  confidence: z.number().describe('A confidence score (0-1) for the authenticity determination.'),
  reasoning: z.string().describe('A brief explanation for the decision, highlighting any suspicious elements found.'),
  extractedText: z.string().describe('Key text extracted from the document for user verification.'),
});
export type DocumentAuthenticityCheckOutput = z.infer<typeof DocumentAuthenticityCheckOutputSchema>;

export async function checkDocumentAuthenticity(
  input: DocumentAuthenticityCheckInput
): Promise<DocumentAuthenticityCheckOutput> {
  return documentAuthenticityCheckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'documentAuthenticityCheckPrompt',
  input: {schema: DocumentAuthenticityCheckInputSchema},
  output: {schema: DocumentAuthenticityCheckOutputSchema},
  prompt: `You are an AI expert in forensic document analysis. Your task is to examine the provided document image for any signs of forgery, tampering, or digital manipulation.

Document Type: {{{documentType}}}

Examine the following aspects:
- Consistency of fonts and alignment.
- Unusual pixelation or blurring, especially around text or signatures.
- Signs of copy-pasting elements.
- Watermarks and security features, if visible.
- Logical consistency of the information presented.

Based on your analysis, determine if the document is authentic. Provide a confidence score, a brief reasoning for your conclusion, and extract the key text from the document.

Document: {{media url=photoDataUri}}`,
});

const documentAuthenticityCheckFlow = ai.defineFlow(
  {
    name: 'documentAuthenticityCheckFlow',
    inputSchema: DocumentAuthenticityCheckInputSchema,
    outputSchema: DocumentAuthenticityCheckOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
