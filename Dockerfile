FROM node:16.17-alpine as build

WORKDIR /home/node/build

ENV NODE_ENV=production

COPY . .

RUN --mount=type=secret,id=npmrc,target=/home/node/build/.npmrc \
    --mount=type=secret,id=token NODE_AUTH_TOKEN=$(cat /run/secrets/token) \
    yarn ci:install && yarn ci:build

FROM node:16.17-alpine as prod

WORKDIR /home/node/app

USER node

COPY --from=build --chown=node:node /home/node/build/apps/recruiter-cms/dist /home/node/app/

RUN --mount=type=secret,id=npmrc,target=/home/node/app/.npmrc \
    --mount=type=secret,id=token NODE_AUTH_TOKEN=$(cat /run/secrets/token) \
    yarn

CMD ["node", "src/main"]
