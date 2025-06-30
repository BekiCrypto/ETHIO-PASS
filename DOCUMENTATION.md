
# Ethio Pass Technical Documentation

## 1. Introduction

Ethio Pass is a comprehensive digital identity platform for Ethiopia, designed to provide citizens and residents with a secure and unified way to access government and private sector services. This document outlines the technical architecture and components of the Ethio Pass web application.

The platform is built as a modern web application using Next.js for the frontend and leverages Firebase for user authentication and Google's Genkit for its powerful AI-driven e-KYC (Know Your Customer) capabilities.

---

## 2. System Architecture

The application follows a client-server architecture with a clear separation of concerns.

-   **Frontend (Client-side):** A responsive web application built with **Next.js** and the App Router. It uses **React** for building the user interface, **ShadCN** for UI components, and **Tailwind CSS** for styling.
-   **Backend Services:**
    -   **Authentication:** Managed by **Firebase Authentication**, supporting email/password and social logins.
    -   **AI & e-KYC:** Powered by **Genkit**, which orchestrates calls to Google's Gemini models for complex AI tasks like OCR, liveness detection, and biometric matching.
-   **Hosting:** Deployed on **Firebase App Hosting**, configured via the `apphosting.yaml` file.

---

## 3. Project Structure

The project follows a standard Next.js App Router structure. Key directories include:

```
.
├── public/                  # Static assets (images, fonts, API docs)
├── src/
│   ├── ai/                  # Genkit AI configuration and flows
│   │   ├── flows/           # Individual AI flows (OCR, liveness, etc.)
│   │   └── genkit.ts        # Genkit initialization
│   ├── app/                 # Next.js App Router directory
│   │   ├── (auth)/          # Authentication-related pages (login, registration)
│   │   ├── dashboard/       # Pages accessible after login
│   │   ├── api/             # API routes that expose Genkit flows
│   │   ├── globals.css      # Global styles and Tailwind directives
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Landing page
│   ├── components/          # Reusable React components
│   │   ├── ui/              # ShadCN UI components
│   │   └── *.tsx            # Custom application components
│   ├── firebase.js          # Firebase initialization
│   ├── hooks/               # Custom React hooks (e.g., useToast)
│   └── lib/                 # Utility functions
├── .env                     # Environment variables (needs to be created)
├── next.config.ts           # Next.js configuration
├── package.json             # Project dependencies and scripts
└── DOCUMENTATION.md         # This file
```

---

## 4. Frontend (Next.js & React)

### 4.1. Routing

The application uses the Next.js App Router for all routing.

-   **Route Groups:**
    -   `(auth)`: Contains pages related to the authentication process (`/login`, `/registration`, `/consent`). It uses a simple layout to center the content.
    -   `dashboard`: Contains all pages that are part of the main application, protected by an authentication check in the `dashboard/layout.tsx` file. This layout includes the main sidebar and header.
-   **Static Pages:**
    -   `/`: The public landing page.
    -   `/terms`: Terms of Service.
    -   `/privacy`: Privacy Policy.

### 4.2. Authentication Flow

1.  **Registration (`/registration`):** Users sign up with their name, email, phone, and password. Account creation is handled by `firebase/auth`.
2.  **Consent (`/consent`):** After successful registration, new users are redirected to this page to agree to the Terms of Service and Privacy Policy before they can access the dashboard.
3.  **Login (`/login`):** Existing users can log in using their credentials.
4.  **Layout Guard:** The `src/app/dashboard/layout.tsx` component acts as a guard. It uses Firebase's `onAuthStateChanged` to check if a user is logged in. If not, it redirects them to the `/login` page.

### 4.3. User Verification Flow (`/dashboard/verify`)

This is the core e-KYC feature of the application, broken down into three steps:

1.  **ID Upload (`IdUploadStep.tsx`):**
    -   The user uploads an image of their ID document.
    -   The component calls the `verifyEthiopianId` server action, which triggers the `ethiopianOCRVerification` Genkit flow.
    -   On success, it transitions to the next step, passing the ID image and OCR results.

2.  **Selfie Capture (`SelfieCaptureStep.tsx`):**
    -   The user takes a selfie using their device's camera.
    -   The component calls the `checkSelfieLiveness` server action, which triggers the `selfieLivenessCheck` Genkit flow to prevent spoofing.
    -   Upon a successful liveness check, it immediately calls the `performBiometricMatch` server action, which triggers the `biometricMatch` Genkit flow to compare the selfie with the ID photo.

3.  **Verification Results (`VerificationResultStep.tsx`):**
    -   This component displays the final results from all three AI checks: OCR text extraction, liveness confidence, and biometric match confidence.
    -   It provides a clear "Approved" or "Rejected" status based on the combined results.

### 4.4. Styling

-   **UI Library:** The app uses **ShadCN UI**, a collection of accessible and reusable components built on top of Radix UI and Tailwind CSS.
-   **CSS Framework:** **Tailwind CSS** is used for all styling. The theme and color variables (like primary, secondary, accent colors) are defined in `src/app/globals.css`.

---

## 5. AI Backend (Genkit)

Genkit is used to define, run, and manage the AI-powered workflows. All Genkit flows are defined in `src/ai/flows/`.

### 5.1. `ethiopian-ocr-verification.ts`

-   **Purpose:** Extracts text from an image of an Ethiopian government-issued ID (National ID, Passport, Driver's License).
-   **Input (`EthiopianOCRVerificationInput`):** An object containing a `photoDataUri` (a Base64-encoded image string).
-   **Output (`EthiopianOCRVerificationOutput`):** An object containing the `extractedData` as a single string.
-   **Prompt:** Instructs the Gemini model to act as an expert OCR reader and extract all text, including Amharic characters.

### 5.2. `selfie-liveness-check.ts`

-   **Purpose:** Determines if a selfie image is of a live person, protecting against fraud from photos of photos, masks, or screen recordings.
-   **Input (`SelfieLivenessCheckInput`):** An object containing a `photoDataUri` of the selfie.
-   **Output (`SelfieLivenessCheckOutput`):** An object containing `isLive` (boolean) and a `confidence` score (0-1).
-   **Prompt:** Instructs the model to act as a fraud detection expert and analyze the image for signs of spoofing.

### 5.3. `biometric-matching.ts`

-   **Purpose:** Compares two images—one from an ID and one from a selfie—to verify if they belong to the same person.
-   **Input (`BiometricMatchInput`):** An object with `idPhotoDataUri` and `selfiePhotoDataUri`.
-   **Output (`BiometricMatchOutput`):** An object containing `match` (boolean), a `confidence` score (0-1), and a `reasoning` string.
-   **Prompt:** Instructs the model to act as a biometric expert, compare facial features, and account for real-world differences like lighting and angle.

---

## 6. API Endpoints

The application exposes its Genkit flows via Next.js API Routes, which are defined in `src/app/api/`. These endpoints are primarily for use by external services or the developer portal.

-   **`POST /api/verify-id`:**
    -   Wraps the `ethiopianOCRVerification` flow.
    -   Body: `{ "photoDataUri": "..." }`
-   **`POST /api/liveness`:**
    -   Wraps the `selfieLivenessCheck` flow.
    -   Body: `{ "photoDataUri": "..." }`
-   **`POST /api/match`:**
    -   Wraps the `biometricMatch` flow.
    -   Body: `{ "idPhotoDataUri": "...", "selfiePhotoDataUri": "..." }`

---

## 7. Setup and Local Development

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Environment Variables

1.  Create a `.env` file in the root of the project.
2.  Add your Firebase project configuration to this file. You can get these from your Firebase project settings.
    ```
    # Example .env file
    NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"

    # You will also need a Google AI API Key for Genkit
    GOOGLE_API_KEY="YOUR_GOOGLE_AI_API_KEY"
    ```
3.  Update the placeholder values in `src/firebase.js` to read from these environment variables.

### Running the Application

-   Start the Next.js development server:
    ```bash
    npm run dev
    ```
-   The application will be available at `http://localhost:9002`.

---

## 8. Deployment

The application is configured for deployment on **Firebase App Hosting**. The `apphosting.yaml` file in the root directory contains basic configuration, such as the maximum number of instances. Firebase App Hosting will automatically build and deploy the Next.js application when connected to a Git repository.
