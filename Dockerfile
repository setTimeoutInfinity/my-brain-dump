# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=22.9.0
FROM node:${NODE_VERSION}-alpine AS base

LABEL fly_launch_runtime="Astro"

# Astro app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

COPY package.json pnpm-lock.yaml ./

# pin pnpm version
ARG PNPM_VERSION=10.6.4

FROM base AS prod-deps
RUN npm install -g pnpm@$PNPM_VERSION && \
    pnpm install --frozen-lockfile --prod=true && \
    rm -rf /root/.pnpm-store

FROM base AS build-deps
RUN npm install -g pnpm@$PNPM_VERSION && \
    pnpm install --frozen-lockfile --prod=false && \
    rm -rf /root/.pnpm-store

FROM build-deps AS build

# Copy application code
COPY . .

# Mount secrets and set environment variables then build app
RUN --mount=type=secret,id=AWS_REGION \
    --mount=type=secret,id=BUCKET_NAME \
    --mount=type=secret,id=AWS_ACCESS_KEY_ID \
    --mount=type=secret,id=AWS_ENDPOINT_URL_S3 \
    --mount=type=secret,id=AWS_SECRET_ACCESS_KEY \
    export AWS_REGION=$(cat /run/secrets/AWS_REGION) \
    export BUCKET_NAME=$(cat /run/secrets/BUCKET_NAME) \
    export AWS_ACCESS_KEY_ID=$(cat /run/secrets/AWS_ACCESS_KEY_ID) \
    export AWS_ENDPOINT_URL_S3=$(cat /run/secrets/AWS_ENDPOINT_URL_S3) \
    export AWS_SECRET_ACCESS_KEY=$(cat /run/secrets/AWS_SECRET_ACCESS_KEY) && \
    pnpm run build

FROM base AS runtime

# Copy node_modules and build artifacts
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Create and switch to a non-root user
RUN adduser -D -g '' appuser
USER appuser

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD [ "node", "./dist/server/entry.mjs" ]
