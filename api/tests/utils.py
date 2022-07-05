import functools

import httpx

from ellandi import wsgi
from ellandi.registration.models import User

user_data = dict(
    email="jane@example.com",
    first_name="Jane",
    last_name="Green",
    organisation="DfE",
    password="P455w0rd",
)


def with_client(func):
    @functools.wraps(func)
    def _inner(*args, **kwargs):
        with httpx.Client(app=wsgi.application, base_url="http://testserver:8000") as client:
            return func(client, *args, **kwargs)

    return _inner


def with_logged_in_client(func):
    @functools.wraps(func)
    def _inner(*args, **kwargs):
        user = User.objects.create_user(**user_data)

        with httpx.Client(app=wsgi.application, base_url="http://testserver:8000") as client:
            response = client.post("/login/", json={"username": user_data["email"], "password": user_data["password"]})
            assert response.status_code == 200
            token = response.json()["token"]
            assert token

            headers = {"Authorization": f"Token {token}"}
            client.headers = headers
            try:
                return func(client, user.id, *args, **kwargs)
            finally:
                User.objects.filter(id=user.id).delete()

    return _inner
