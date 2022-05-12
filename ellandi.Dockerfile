FROM python:3.8-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN python3 -m pip install -U pip setuptools wheel

COPY ./requirements.txt /app/requirements.txt
RUN python3 -m pip install -r /app/requirements.txt --no-cache-dir

COPY . /app

WORKDIR /app

EXPOSE 8000
