FROM mcr.microsoft.com/playwright:focal

ENV DEBIAN_FRONTEND noninteractive

RUN apt update -y && apt install -y python3.8 python3-pip wait-for-it

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN python3 -m pip install --upgrade pip setuptools

WORKDIR /app

COPY ./integration/requirements.txt /app/integration/requirements.txt
RUN python3 -m pip install -r /app/integration/requirements.txt --no-cache-dir

RUN playwright install

COPY ./integration /app/integration

COPY ./docker/integration/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY ./docker/integration/start.sh /start.sh
RUN chmod +x /start.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["sh","/start.sh"]
