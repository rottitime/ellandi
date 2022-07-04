import functools

import httpx

from ellandi import wsgi


def with_client(func):
    @functools.wraps(func)
    def _inner(*args, **kwargs):
        with httpx.Client(app=wsgi.application, base_url="http://testserver:8000") as client:
            return func(client, *args, **kwargs)

    return _inner
