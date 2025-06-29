'use server';
/**
 * @fileOverview Ethiopian OCR Verification Flow.
 *
 * This flow allows users to upload images of Ethiopian National IDs, passports, or driver's licenses,
 * automatically extracting the relevant information using OCR, including Amharic language support, to
 * streamline the registration and verification process.
 *
 * @interface EthiopianOCRVerificationInput - The input for the OCR verification flow.
 * @interface EthiopianOCRVerificationOutput - The output of the OCR verification flow, containing the extracted data.
 * @function ethiopianOCRVerification - Main function to trigger the OCR verification flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EthiopianOCRVerificationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an Ethiopian National ID, passport, or driver's license, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EthiopianOCRVerificationInput = z.infer<typeof EthiopianOCRVerificationInputSchema>;

const EthiopianOCRVerificationOutputSchema = z.object({
  extractedData: z
    .string()
    .describe('The extracted data from the Ethiopian document, including Amharic text.'),
});
export type EthiopianOCRVerificationOutput = z.infer<typeof EthiopianOCRVerificationOutputSchema>;

export async function ethiopianOCRVerification(
  input: EthiopianOCRVerificationInput
): Promise<EthiopianOCRVerificationOutput> {
  return ethiopianOCRVerificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ethiopianOCRVerificationPrompt',
  input: {schema: EthiopianOCRVerificationInputSchema},
  output: {schema: EthiopianOCRVerificationOutputSchema},
  prompt: `You are an expert OCR reader, specializing in extracting data from Ethiopian National IDs, passports, and driver's licenses, including Amharic language support.  Extract all the text you can from the document.  Return the text in the extractedData field.

Document: {{media url=photoDataUri}}`,
});

const ethiopianOCRVerificationFlow = ai.defineFlow(
  {name: 'ethiopianOCRVerificationFlow', inputSchema: EthiopianOCRVerificationInputSchema, outputSchema: EthiopianOCRVerificationOutputSchema},
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
