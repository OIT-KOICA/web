FROM node:23-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package*.json ./

# Omit --production flag for TypeScript devDependencies
RUN npm ci

COPY . .

# Build Next.js based on the preferred package manager
RUN npm run build

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Préparation du répertoire pour le volume
RUN mkdir -p /mnt/static && cp -R ./.next/static/* /mnt/static/

CMD ["node", "server.js"]