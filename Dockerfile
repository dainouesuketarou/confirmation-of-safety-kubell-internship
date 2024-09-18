FROM node:20-alpine AS base

FROM base AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apk update && \
    apk upgrade && \
    apk add --no-cache libc6-compat gcc g++ make python3 py3-pip

WORKDIR /app

COPY . /app

RUN pnpm install -g turbo
RUN pnpm install
RUN pnpm clean-package
RUN pnpm generate:backend
RUN pnpm docker:build-backend

FROM base AS runner
WORKDIR /app/packages/backend/bootstrap

RUN apk add --no-cache libc6-compat
RUN apk add --no-cache openssl3
RUN apk update

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

COPY --from=builder --chown=nodejs:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=nodejs:nodejs /app/package.json /app/package.json

COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/bootstrap/node_modules /app/packages/backend/bootstrap/node_modules
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/bootstrap/dist /app/packages/backend/bootstrap/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/bootstrap/package.json /app/packages/backend/bootstrap/package.json

COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/command/domain/node_modules /app/packages/backend/command/domain/node_modules
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/command/domain/dist /app/packages/backend/command/domain/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/command/domain/package.json /app/packages/backend/command/domain/package.json

COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/command/interface-adaptor-if/node_modules /app/packages/backend/command/interface-adaptor-if/node_modules
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/command/interface-adaptor-if/dist /app/packages/backend/command/interface-adaptor-if/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/command/interface-adaptor-if/package.json /app/packages/backend/command/interface-adaptor-if/package.json

COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/command/interface-adaptor-impl/node_modules /app/packages/backend/command/interface-adaptor-impl/node_modules
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/command/interface-adaptor-impl/dist /app/packages/backend/command/interface-adaptor-impl/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/command/interface-adaptor-impl/package.json /app/packages/backend/command/interface-adaptor-impl/package.json

COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/command/processor/node_modules /app/packages/backend/command/processor/node_modules
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/command/processor/dist /app/packages/backend/command/processor/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/command/processor/package.json /app/packages/backend/command/processor/package.json

COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/rmu/node_modules /app/packages/backend/rmu/node_modules
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/rmu/dist /app/packages/backend/rmu/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/rmu/package.json /app/packages/backend/rmu/package.json

COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/query/interface-adaptor/node_modules /app/packages/backend/query/interface-adaptor/node_modules
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/query/interface-adaptor/dist /app/packages/backend/query/interface-adaptor/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/query/interface-adaptor/package.json /app/packages/backend/query/interface-adaptor/package.json

COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/infrastructure/node_modules /app/packages/backend/infrastructure/node_modules
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/infrastructure/dist /app/packages/backend/infrastructure/dist
COPY --from=builder --chown=nodejs:nodejs /app/packages/backend/infrastructure/package.json /app/packages/backend/infrastructure/package.json

USER nodejs

ENTRYPOINT ["node", "./dist/index.js"]
