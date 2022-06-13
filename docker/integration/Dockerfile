FROM mcr.microsoft.com/playwright:focal

ENV DEBIAN_FRONTEND noninteractive

RUN apt update -y && apt install -y python3.8 python3-pip wait-for-it

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN python3 -m pip install --upgrade pip setuptools

WORKDIR /app

COPY ./integration/requirements-dev.txt /app/integration/requirements-dev.txt
RUN python3 -m pip install -r /app/integration/requirements-dev.txt --no-cache-dir

COPY ./integration /app/integration

COPY ./docker/integration/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
