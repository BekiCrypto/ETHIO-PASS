'use server';

import { ethiopianOCRVerification, EthiopianOCRVerificationInput, EthiopianOCRVerificationOutput } from '@/ai/flows/ethiopian-ocr-verification';
import { selfieLivenessCheck, SelfieLivenessCheckInput, SelfieLivenessCheckOutput } from '@/ai/flows/selfie-liveness-check';
import { biometricMatch, BiometricMatchInput, BiometricMatchOutput } from '@/ai/flows/biometric-matching';

export async function verifyEthiopianId(
  input: EthiopianOCRVerificationInput
): Promise<EthiopianOCRVerificationOutput> {
  try {
    const result = await ethiopianOCRVerification(input);
    return result;
  } catch (error) {
    console.error('Error in verifyEthiopianId:', error);
    throw new Error('Failed to verify ID document. The document might be blurry or unsupported.');
  }
}

export async function checkSelfieLiveness(
  input: SelfieLivenessCheckInput
): Promise<SelfieLivenessCheckOutput> {
  try {
    const result = await selfieLivenessCheck(input);
    return result;
  } catch (error) {
    console.error('Error in checkSelfieLiveness:', error);
    throw new Error('Failed to perform liveness check. Please ensure good lighting and a clear view.');
  }
}

export async function performBiometricMatch(
  input: BiometricMatchInput
): Promise<BiometricMatchOutput> {
  try {
    const result = await biometricMatch(input);
    return result;
  } catch (error) {
    console.error('Error in performBiometricMatch:', error);
    throw new Error('Failed to perform biometric match. Please try again.');
  }
}
