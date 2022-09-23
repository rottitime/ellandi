FROM python:3.8-buster

ARG NEXT_PUBLIC_API_URL

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN curl -o /bin/wait-for-db https://github.com/palfrey/wait-for-db/releases/download/v1.2.0/wait-for-db-linux-x86
RUN chmod +x /bin/wait-for-db

RUN apt-get update && \
    apt-get install -y curl wget gpg && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

RUN python3 -m pip install -U pip setuptools wheel

COPY ./api/requirements.lock /app/api/requirements.lock
RUN python3 -m pip install -r /app/api/requirements.lock --no-cache-dir

COPY ./docker/api/start.sh /start.sh
RUN chmod +x /start.sh

COPY ./docker/api/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./web /app/web

WORKDIR /app/web

RUN npm install
RUN npm run build:static

COPY . /app

WORKDIR /app/api

RUN \
    DJANGO_SETTINGS_MODULE=ellandi.settings_base \
    DJANGO_SECRET_KEY="temp" \
    python manage.py collectstatic --no-input

RUN cp -R /app/web/out/* /staticfiles/

EXPOSE 8002

ENTRYPOINT ["sh","/entrypoint.sh"]
CMD ["sh","/start.sh"]
