FROM python:3.8-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN python3 -m pip install -U pip setuptools wheel

COPY ./api/requirements.txt /app/api/requirements.txt
RUN python3 -m pip install -r /app/api/requirements.txt --no-cache-dir

COPY ./docker/api/start.sh /start.sh
RUN chmod +x /start.sh

COPY . /app

WORKDIR /app/api

EXPOSE 8000

CMD ["sh","/start.sh"]
