FROM python:3.8-buster

ARG GIT_SHA
ENV GIT_SHA=${GIT_SHA}

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN curl -o /bin/wait-for-db https://github.com/palfrey/wait-for-db/releases/download/v1.2.0/wait-for-db-linux-x86
RUN chmod +x /bin/wait-for-db

RUN python3 -m pip install -U pip setuptools wheel

COPY ./recommender/requirements.lock /app/recommender/requirements.lock
RUN python3 -m pip install -r /app/recommender/requirements.lock --no-cache-dir

COPY ./docker/recommender/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY . /app

WORKDIR /app/recommender

ENTRYPOINT ["sh","/entrypoint.sh"]
CMD ["sh","/start.sh"]

