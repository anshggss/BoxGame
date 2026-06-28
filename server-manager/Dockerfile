# ---- Server-Manager Dockerfile ----
# Uses Bun to run TypeScript directly (no build step needed)
FROM oven/bun:1-alpine AS base

WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Copy source
COPY . .

# server-manager talks to the k8s API server in-cluster, so it needs
# the kubeconfig or in-cluster service account credentials (mounted by k8s)
ENV PORT=4689
EXPOSE 4689

CMD ["bun", "run", "index.ts"]
