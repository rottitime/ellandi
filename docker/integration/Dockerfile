FROM mcr.microsoft.com/playwright:focal

ENV DEBIAN_FRONTEND noninteractive

RUN apt update -y && apt install -y python3.8 python3-pip

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN python3 -m pip install --upgrade pip

WORKDIR /app

COPY ./integration/requirements.txt /app/integration/requirements.txt
RUN python3 -m pip install -r /app/integration/requirements.txt --no-cache-dir

COPY ./integration /app/integration
