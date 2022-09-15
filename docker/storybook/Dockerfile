FROM node:16


RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app/web/

ENV PATH /app/web/node_modules/.bin:$PATH

COPY ./web/package-lock.json /app/web/
COPY ./web/package.json /app/web/

COPY . /app

WORKDIR /app/web/

RUN npm install
RUN npm run storybook:build

EXPOSE 8080
CMD [ "npm", "run", "storybook:prod" ]
