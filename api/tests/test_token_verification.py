import os
import pathlib

import furl
from django.conf import settings
from django.test import override_settings
from tests import utils

from ellandi.registration.models import User


def teardown():
    User.objects.all().delete()


def _get_latest_email_url(token_type):
    email_dir = pathlib.Path(settings.EMAIL_FILE_PATH)
    latest_email_path = max(email_dir.iterdir(), key=os.path.getmtime)
    with latest_email_path.open() as f:
        lines = f.readlines()
    url_lines = tuple(line for line in lines if line.startswith("http://testserver/"))
    assert len(url_lines) == 1
    email_url = url_lines[0].strip()
    args = furl.furl(email_url).query.params
    host_url = furl.furl(settings.HOST_URL.strip("/"))
    url = furl.furl(host_url).set(path=("user", args["user_id"], token_type, args["code"], ""))
    url = str(url)
    return url


@utils.with_client
@override_settings(SEND_VERIFICATION_EMAIL=True)
def test_verify_email(client):
    user_data = {
        "email": "bobby@example.com",
        "password": "foo",
    }
    response = client.post("/register/", json={"email": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 200

    url = _get_latest_email_url("verify")
    response = client.get(url)
    assert response.status_code == 200
    assert response.json()["email"] == user_data["email"]

    user = User.objects.get(email=user_data["email"])
    assert user.verified


@utils.with_client
def test_password_reset(client):
    user_data = {
        "email": "forgetful-bobby@example.com",
        "password": "foo",
    }
    new_password = "N3wP455w0rd"
    user = User.objects.create_user(**user_data)

    response = client.post("/password-reset/", json={"email": user_data["email"]})
    assert response.status_code == 200

    url = _get_latest_email_url("password-reset")

    response = client.post(url, json={"new_password": new_password})
    assert response.status_code == 200
    assert response.json()["email"] == user_data["email"]

    user = User.objects.get(email=user_data["email"])
    assert user.check_password(new_password)


@utils.with_logged_in_client
def test_password_change(client, user_id):
    user_data = utils.user_data
    new_password = "N3wP455w0rd"

    response = client.post("/me/password-change/", json={"old_password": user_data["password"], "new_password": new_password})
    assert response.status_code == 200
    assert response.json()["email"] == user_data["email"]

    user = User.objects.get(email=user_data["email"])
    assert user.check_password(new_password)


@utils.with_logged_in_client
def test_password_change(client, user_id):
    new_password = "N3wP455w0rd"

    response = client.post("/me/password-change/", json={"old_password":"incorrect", "new_password": new_password})
    assert response.status_code == 400
    assert response.json()["detail"] == "Incorrect password"
