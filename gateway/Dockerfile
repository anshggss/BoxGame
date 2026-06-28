# ---- Gateway Dockerfile ----
# Uses Bun to run TypeScript directly (no build step needed)
FROM oven/bun:1-alpine AS base

WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy source
COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["bun", "run", "index.ts"]
