import { config } from 'dotenv';
config();

import '@/ai/flows/ethiopian-ocr-verification.ts';
import '@/ai/flows/selfie-liveness-check.ts';
import '@/ai/flows/biometric-matching.ts';
import '@/ai/flows/document-authenticity-check.ts';
