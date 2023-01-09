FROM node:16 as web

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ENABLE_EMAIL_VERIFY
ARG NODE_ENV
ARG ENV

ENV TZ=UTC
ENV API_HOST=${API_HOST}

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENV PATH /app/web/node_modules/.bin:$PATH

COPY ./web /app/web

WORKDIR /app/

COPY ./api/ellandi/registration/fixtures/dropdown /app/api/ellandi/registration/fixtures/dropdown
COPY ./web/prefetch /app/web/prefetch
COPY ./scripts/convert_dropdowns.py /app/scripts/convert_dropdowns.py
RUN python3 /app/scripts/convert_dropdowns.py

WORKDIR /app/web

RUN npm ci
RUN npm run build:static

################

FROM nginx:latest

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ENABLE_EMAIL_VERIFY
ARG API_HOST
ARG RESOLVER

ENV TZ=UTC
ENV API_HOST=${API_HOST}
ENV RESOLVER=${RESOLVER}

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ./docker/nginx/start.sh /start.sh
RUN chmod +x /start.sh

COPY ./docker/nginx/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY --from=web /app/web/out /usr/share/nginx/html

EXPOSE 80

COPY ./nginx/nginx-default.conf.template /etc/nginx/conf.d/default.conf.template
RUN envsubst '${API_HOST},${RESOLVER}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

ENTRYPOINT ["sh","/entrypoint.sh"]
CMD ["sh","/start.sh"]
