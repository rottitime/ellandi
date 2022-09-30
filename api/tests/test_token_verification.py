import os
import pathlib

import furl
from django.conf import settings
from django.test import override_settings
from tests import utils

from ellandi.registration.exceptions import PasswordResetError
from ellandi.registration.models import User


def teardown():
    User.objects.all().delete()


def _get_latest_email_url(token_type):
    email_dir = pathlib.Path(settings.EMAIL_FILE_PATH)
    latest_email_path = max(email_dir.iterdir(), key=os.path.getmtime)
    with latest_email_path.open() as f:
        lines = f.readlines()
    url_lines = tuple(word for line in lines for word in line.split() if word.startswith("http://testserver/"))
    assert len(url_lines) == 1
    email_url = url_lines[0].strip()
    email_url = email_url.strip(",")
    args = furl.furl(email_url).query.params
    host_url = furl.furl(settings.HOST_URL.strip("/"))
    url = furl.furl(host_url).set(path=("api", "user", args["user_id"], token_type, args["code"], ""))
    url = str(url)
    return url


@utils.with_client
@override_settings(SEND_VERIFICATION_EMAIL=True)
def test_verify_email(client):
    user_data = {
        "email": "bobby@example.com",
        "password": "foo",
    }
    response = client.post("/api/register/", json={"email": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 200

    url = _get_latest_email_url("verify")
    response = client.get(url)
    assert response.status_code == 200
    assert response.json()["email"] == user_data["email"]

    user = User.objects.get(email=user_data["email"])
    assert user.verified


@utils.with_logged_in_client
@override_settings(SEND_VERIFICATION_EMAIL=True)
def test_resend_verify_email(client, user_id):
    user = User.objects.get(id=user_id)

    response = client.post("/api/me/send-verification-email/")
    assert response.status_code == 200

    url = _get_latest_email_url("verify")
    response = client.get(url)
    assert response.status_code == 200
    assert response.json()["email"] == user.email

    user = User.objects.get(email=user.email)
    assert user.verified


@utils.with_client
@override_settings(SEND_VERIFICATION_EMAIL=True)
def test_verify_email_bad_token(client):
    user_data = {
        "email": "bobby-bad-token@example.com",
        "password": "foo",
    }
    user = User.objects.create_user(**user_data)
    token = "B4dT0k3n"
    response = client.get(f"/api/user/{user.id}/verify/{token}/")
    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid token"

    user = User.objects.get(email=user_data["email"])
    assert not user.verified


@utils.with_client
def test_password_reset(client):
    user_data = {
        "email": "forgetful-bobby@example.com",
        "password": "foo",
    }
    new_password = "N3wP455w0rd"
    user = User.objects.create_user(**user_data)

    response = client.post("/api/password-reset/", json={"email": user_data["email"]})
    assert response.status_code == 200

    url = _get_latest_email_url("password-reset")

    response = client.post(url, json={"new_password": new_password})
    assert response.status_code == 200
    assert response.json()["email"] == user_data["email"]

    user = User.objects.get(email=user_data["email"])
    assert user.check_password(new_password)


@utils.with_client
@override_settings(SEND_VERIFICATION_EMAIL=True)
def test_password_reset_email_bad_token(client):
    user_data = {
        "email": "billy-bad-token@example.com",
        "password": "foo",
    }
    new_password = "N3wP455w0rd"
    user = User.objects.create_user(**user_data)
    token = "B4dT0k3n"
    response = client.post(f"/api/user/{user.id}/password-reset/{token}/", json={"new_password": new_password})
    assert response.status_code == 400
    assert response.json()["detail"] == PasswordResetError.default_detail

    user = User.objects.get(email=user_data["email"])
    assert not user.check_password(new_password)


@utils.with_logged_in_client
def test_password_change(client, user_id):
    user_data = utils.user_data
    new_password = "N3wP455w0rd"

    response = client.post(
        "/api/me/password-change/", json={"old_password": user_data["password"], "new_password": new_password}
    )
    assert response.status_code == 200
    assert response.json()["email"] == user_data["email"]

    user = User.objects.get(email=user_data["email"])
    assert user.check_password(new_password)


@utils.with_logged_in_client
def test_password_change_wrong_password(client, user_id):
    new_password = "N3wP455w0rd"

    response = client.post("/api/me/password-change/", json={"old_password": "incorrect", "new_password": new_password})
    assert response.status_code == 400
    assert response.json()["detail"] == "Incorrect password"
