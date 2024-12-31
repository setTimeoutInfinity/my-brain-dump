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
ARG PNPM_VERSION=9.14.4

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

# Build application
RUN pnpm run build

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
