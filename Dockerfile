# Dockerfile for Next.js - Makes the app portable and easy to deploy on any server with Docker.

# Dependency installation stage
FROM node:20-alpine AS deps
# Install libc6-compat for compatibility
RUN apk add --no-cache libc6-compat
WORKDIR /app
# Copy dependency definition files
COPY package.json package-lock.json* ./
# Install dependencies
RUN npm ci

# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application files
COPY . .

# Disable Next.js telemetry during the build
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV production
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output from the builder stage
COPY --from=builder /app/.next/standalone ./
# Copy the static assets from the builder stage
COPY --from=builder /app/.next/static ./.next/static
# Copy the public assets from the builder stage
COPY --from=builder /app/public ./public

# Set the user to the non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Set the port environment variable
ENV PORT 3000

# The command to start the app
CMD ["node", "server.js"]
