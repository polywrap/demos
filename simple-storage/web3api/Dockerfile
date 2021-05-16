ARG modules_to_build

FROM node:12.20.1-alpine3.10 as base

ARG buildDir
ENV build_dir=${buildDir}

ONBUILD RUN apk --no-cache --virtual build-dependencies add \
    bash \
    git \
    openssh \
    make \
    g++
ONBUILD COPY . /app
ONBUILD WORKDIR /app
ONBUILD RUN yarn

FROM base as query
ONBUILD RUN npx asc ./src/query/w3/entry.ts \
--path ./node_modules \
--outFile ${build_dir}/query.wasm \
--use abort=src/query/w3/entry/w3Abort \
--optimize --debug --importMemory --runtime stub

FROM base as mutation
ONBUILD RUN npx asc ./src/mutation/w3/entry.ts \
--path ./node_modules \
--outFile ${build_dir}/mutation.wasm \
--use abort=src/mutation/w3/entry/w3Abort \
--optimize --debug --importMemory --runtime stub

FROM base as all

ONBUILD RUN npx asc ./src/query/w3/entry.ts \
--path ./node_modules \
--outFile ${build_dir}/query.wasm \
--use abort=src/query/w3/entry/w3Abort \
--optimize --debug --importMemory --runtime stub

ONBUILD RUN npx asc ./src/mutation/w3/entry.ts \
--path ./node_modules \
--outFile ${build_dir}/mutation.wasm \
--use abort=src/mutation/w3/entry/w3Abort \
--optimize --debug --importMemory --runtime stub

FROM ${modules_to_build}
