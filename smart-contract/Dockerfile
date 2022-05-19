FROM node:16-alpine

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN apk add git;

RUN npm install --non-interactive --frozen-lockfile

COPY $PWD/entrypoint.sh /usr/local/bin

ENTRYPOINT ["/bin/sh", "/usr/local/bin/entrypoint.sh"]
