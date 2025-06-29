'use server';
/**
 * @fileOverview An AI agent to verify the liveness of a selfie.
 *
 * - selfieLivenessCheck - A function that handles the selfie liveness check process.
 * - SelfieLivenessCheckInput - The input type for the selfieLivenessCheck function.
 * - SelfieLivenessCheckOutput - The return type for the selfieLivenessCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelfieLivenessCheckInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A selfie photo of a person, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SelfieLivenessCheckInput = z.infer<typeof SelfieLivenessCheckInputSchema>;

const SelfieLivenessCheckOutputSchema = z.object({
  isLive: z.boolean().describe('Whether the selfie is of a live person.'),
  confidence: z.number().describe('The confidence level of the liveness detection.'),
});
export type SelfieLivenessCheckOutput = z.infer<typeof SelfieLivenessCheckOutputSchema>;

export async function selfieLivenessCheck(input: SelfieLivenessCheckInput): Promise<SelfieLivenessCheckOutput> {
  return selfieLivenessCheckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'selfieLivenessCheckPrompt',
  input: {schema: SelfieLivenessCheckInputSchema},
  output: {schema: SelfieLivenessCheckOutputSchema},
  prompt: `You are an AI expert in detecting liveness in selfies to prevent fraud.

You will analyze the provided selfie image to determine if it is a live person or a spoofing attempt (e.g., a photo of a photo, a video replay, or a mask).

Based on your analysis, you will set the isLive output field to true if the selfie appears to be a live person, and false otherwise.

You will also provide a confidence score (0-1) indicating the certainty of your liveness detection.

Analyze the following selfie:

Selfie: {{media url=photoDataUri}}
`,
});

const selfieLivenessCheckFlow = ai.defineFlow(
  {
    name: 'selfieLivenessCheckFlow',
    inputSchema: SelfieLivenessCheckInputSchema,
    outputSchema: SelfieLivenessCheckOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
