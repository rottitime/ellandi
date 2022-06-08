FROM python:3.8-buster

ENV DEBIAN_FRONTEND noninteractive

RUN apt update -y && apt install libgl1-mesa-glx sudo chromium chromium-driver -y

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

WORKDIR /app

COPY ./integration/requirements.txt /app/integration/requirements.txt
RUN python3 -m pip install -r /app/integration/requirements.txt --no-cache-dir
