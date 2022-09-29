FROM node:16

ARG NODE_ENV
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_GIT_SHA

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app/web

ENV PATH /app/web/node_modules/.bin:$PATH

COPY ./web /app/web

WORKDIR /app/web

RUN npm install
RUN npm run build

COPY . /app

EXPOSE 3000
CMD [ "npm", "start" ]
