FROM python:3.8-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN python3 -m pip install -U pip setuptools wheel

COPY ./api/requirements-dev.lock /app/api/requirements-dev.lock
RUN python3 -m pip install -r /app/api/requirements-dev.lock --no-cache-dir

COPY ./docker/tests/start.sh /start.sh
RUN chmod +x /start.sh

COPY . /app

WORKDIR /app/api

CMD ["sh","/start.sh"]
