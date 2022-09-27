FROM nginx:latest

ARG NEXT_PUBLIC_API_URL

ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && \
    apt-get install -y curl wget gpg && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# COPY ./docker/nginx/start.sh /start.sh
# RUN chmod +x /start.sh

# COPY ./docker/nginx/entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

COPY ./web /app/web

WORKDIR /app/web

RUN npm install
RUN npm run build:static

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./web/out /usr/share/nginx/html

EXPOSE 80

# ENTRYPOINT ["sh","/entrypoint.sh"]
# CMD ["sh","/start.sh"]



