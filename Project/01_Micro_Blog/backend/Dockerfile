# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies (only production for final image, but we copy package-lock as well)
COPY package*.json ./
RUN npm ci

# Copy application code
COPY . .

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy built dependency files from builder
COPY --from=builder /app /app

# Best Practice: Do not run as root.
# Utilizing the built-in 'node' user from node:18-alpine
USER node

EXPOSE 3000

# Start command
CMD ["node", "src/index.js"]
