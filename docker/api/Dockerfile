FROM python:3.8-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt update -y && apt install -y wait-for-it

RUN python3 -m pip install -U pip setuptools wheel

COPY ./api/requirements.lock /app/api/requirements.lock
RUN python3 -m pip install -r /app/api/requirements.lock --no-cache-dir

COPY ./docker/api/start.sh /start.sh
RUN chmod +x /start.sh

COPY . /app

WORKDIR /app/api

RUN DJANGO_SECRET_KEY="temp" DATABASE_URL="temp" python manage.py collectstatic --no-input

EXPOSE 8000

ENTRYPOINT ["sh","/entrypoint.sh"]
CMD ["sh","/start.sh"]
