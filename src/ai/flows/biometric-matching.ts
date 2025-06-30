'use server';
/**
 * @fileOverview Biometric face matching flow.
 *
 * This flow compares a selfie with a photo from an ID document to verify the person's identity.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BiometricMatchInputSchema = z.object({
  idPhotoDataUri: z
    .string()
    .describe(
      "A photo from an ID document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  selfiePhotoDataUri: z
    .string()
    .describe(
      "A selfie photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type BiometricMatchInput = z.infer<typeof BiometricMatchInputSchema>;

const BiometricMatchOutputSchema = z.object({
  match: z.boolean().describe('Whether the two faces are a likely match.'),
  confidence: z.number().describe('A confidence score (0-1) for the match determination.'),
  reasoning: z.string().describe('A brief explanation for the decision.'),
});
export type BiometricMatchOutput = z.infer<typeof BiometricMatchOutputSchema>;

export async function biometricMatch(
  input: BiometricMatchInput
): Promise<BiometricMatchOutput> {
  return biometricMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'biometricMatchPrompt',
  input: {schema: BiometricMatchInputSchema},
  output: {schema: BiometricMatchOutputSchema},
  prompt: `You are an AI expert in biometric face verification. Your task is to compare two images: one from an official ID document and one from a selfie.

Determine if the person in the selfie is the same person as in the ID photo.

- Analyze key facial features in both images.
- Account for differences in lighting, angle, age, and expression.
- Provide a boolean 'match' result.
- Provide a 'confidence' score between 0 and 1.
- Provide a brief 'reasoning' for your conclusion.

ID Photo: {{media url=idPhotoDataUri}}
Selfie Photo: {{media url=selfiePhotoDataUri}}`,
});

const biometricMatchFlow = ai.defineFlow(
  {
    name: 'biometricMatchFlow',
    inputSchema: BiometricMatchInputSchema,
    outputSchema: BiometricMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
