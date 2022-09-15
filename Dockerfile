FROM node:16.17-alpine as build

WORKDIR /usr/src/build

COPY . .


RUN --mount=type=secret,id=npmrc,target=/usr/src/build/.npmrc \
    --mount=type=secret,id=token NODE_AUTH_TOKEN=$(cat /run/secrets/token) && \
    export NODE_AUTH_TOKEN && yarn ci:install

RUN yarn ci:build

RUN --mount=type=secret,id=npmrc,target=/usr/src/build/.npmrc \
    --mount=type=secret,id=token NODE_AUTH_TOKEN=$(cat /run/secrets/token) && \
    export NODE_AUTH_TOKEN && yarn ci:install --production=true

FROM node:16.17-alpine as prod

ARG SERVICE_VERSION
ENV SERVICE_VERSION=$SERVICE_VERSION

ENV NODE_ENV=production

WORKDIR /usr/src/app

USER node

COPY --from=build --chown=node:node /usr/src/build/apps/recruiter-cms/dist /usr/src/app/

RUN --mount=type=secret,id=npmrc,target=/usr/src/app/.npmrc \
    --mount=type=secret,id=token NODE_AUTH_TOKEN=$(cat /run/secrets/token) \
    export NODE_AUTH_TOKEN && yarn --production=true --frozen-lockfile

CMD ["node", "src/main"]
