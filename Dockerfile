FROM node:8.4-alpine
LABEL maintainer Daniel Olivares "daniel.olivares@parkhub.com"

RUN mkdir /npm-module
WORKDIR /npm-module

COPY package.json package-lock.json ./

RUN npm install 

COPY . .

RUN rm -rf /tmp/*
