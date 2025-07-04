# Stage 1: Build the Next.js app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency declarations
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./
COPY next.config.mjs ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Run the built app
FROM node:18-alpine AS runner

ENV NODE_ENV=production
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "run", "start"]
