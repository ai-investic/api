ARG API_PORT
ARG NODE_VERSION

FROM node:${NODE_VERSION}

SHELL ["/bin/bash", "-c"]
WORKDIR "/api"

COPY /package.json .

RUN apt update -q \
  && apt upgrade -qy \
  && npm i -g pnpm

EXPOSE ${API_PORT}

ENTRYPOINT ["/bin/bash", "-c", "pnpm i && pnpm compile && pnpm dev"]
