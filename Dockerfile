FROM node:8.4-alpine
LABEL maintainer Daniel Olivares "daniel.olivares@parkhub.com"

RUN apk update \
  && apk add ca-certificates wget \
  && wget -O /etc/apk/keys/sgerrand.rsa.pub https://raw.githubusercontent.com/sgerrand/alpine-pkg-glibc/master/sgerrand.rsa.pub \
  && wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.25-r0/glibc-2.25-r0.apk \
  && apk add glibc-2.25-r0.apk
RUN mkdir /npm-module
WORKDIR /npm-module

COPY package.json package-lock.json ./

RUN npm install 

COPY . .

RUN rm -rf /tmp/*
