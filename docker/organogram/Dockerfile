FROM python:3.8-buster

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN python3 -m pip install -U pip setuptools wheel

COPY ./organogram/requirements.lock /app/organogram/requirements.lock
RUN python3 -m pip install -r /app/organogram/requirements.lock --no-cache-dir

COPY ./docker/organogram/start.sh /start.sh
RUN chmod +x /start.sh

COPY . /app

WORKDIR /app/organogram

RUN DJANGO_SECRET_KEY="temp" DATABASE_URL="temp" python manage.py collectstatic --no-input

EXPOSE 9000

CMD ["sh","/start.sh"]
