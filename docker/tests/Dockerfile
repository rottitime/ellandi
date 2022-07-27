FROM python:3.8-buster

ARG APP

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN python3 -m pip install -U pip setuptools wheel

COPY ./$APP/requirements-dev.lock /app/$APP/requirements-dev.lock
RUN python3 -m pip install -r /app/$APP/requirements-dev.lock --no-cache-dir

COPY ./docker/tests/start.sh /start.sh
RUN chmod +x /start.sh

COPY . /app

WORKDIR /app/$APP

RUN \
    DJANGO_SETTINGS_MODULE=organogram.settings_base \
    DJANGO_SECRET_KEY="temp" \
    python manage.py collectstatic --no-input

CMD ["sh","/start.sh"]
