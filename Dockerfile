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

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copie supplémentaire pour persistances des fichiers statiques
RUN mkdir -p /persisted-static && cp -R ./.next/static/* /persisted-static/

CMD ["node", "server.js"]