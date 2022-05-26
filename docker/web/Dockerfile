FROM node:16

ENV VITE_FRONTEND_HOST https://ellandi-web.london.cloudapps.digital
ENV VITE_API_ROOT_URL https://ellandi-api.london.cloudapps.digital
ENV VITE_IS_DEMO_MODE true

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app/web

ENV PATH /app/web/node_modules/.bin:$PATH

COPY ./web/package-lock.json /app/web/
COPY ./web/package.json /app/web/

RUN npm ci --ignore-scripts

COPY . /app

WORKDIR /app/web

EXPOSE 3000

CMD ["npm","run","prod"]
