FROM node:16-buster

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY . /app

WORKDIR /app/web
RUN git init

RUN npm install
RUN npm run prepare
RUN npm run dev

WORKDIR /app/api

EXPOSE 8000
