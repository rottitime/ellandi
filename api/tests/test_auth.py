import functools

import httpx


from ellandi import wsgi
from ellandi.registration.models import User


def with_client(func):
    @functools.wraps(func)
    def _inner(*args, **kwargs):
        with httpx.Client(app=wsgi.application, base_url="http://testserver:8000") as client:
            return func(client, *args, **kwargs)
    return _inner


@with_client
def test_homepage_no_auth(client):
    response = client.get("/")
    assert response.status_code == 401
    assert response.json() == {"detail":"Authentication credentials were not provided."}


@with_client
def test_login(client):
    data = dict(email="mr_flibble@example.com", password="P455w0rd")
    User.objects.create_user(**data)

    response = client.post("/login/", json={'username': data['email'], "password": data['password']})
    assert response.status_code == 200
    assert response.json()['token']
