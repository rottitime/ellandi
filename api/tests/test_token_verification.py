from django.test import override_settings
from tests import utils

from ellandi.registration import exceptions
from ellandi.registration.models import User


def teardown():
    User.objects.all().delete()


@utils.with_client
@override_settings(SEND_VERIFICATION_EMAIL=True)
def test_verify_email(client):
    user_data = {
        "email": "bobby@example.com",
        "password": "foofoofoo",
    }
    response = client.post("/api/register/", json={"email": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 200

    url = utils._get_latest_email_url("verify")
    user_id, _, token = url.strip("/").split("/")[-3:]
    response = client.get(f"/api/user/{user_id}/token/{token}/valid/?type=email-verification")
    assert response.json()["valid"]

    response = client.post("/api/login/", json={"email": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 200
    assert response.json()["token"]

    response = client.get(f"/api/user/{user_id}/token/{token}/valid/?type=email-verification")
    assert response.json()["valid"]

    response = client.get(url)
    assert response.status_code == 200
    assert response.json()["token"]

    user = User.objects.get(email=user_data["email"])
    assert user.verified


@utils.with_logged_in_client
@override_settings(SEND_VERIFICATION_EMAIL=True)
def test_resend_verify_email(client, user_id):
    user = User.objects.get(id=user_id)

    response = client.post("/api/me/send-verification-email/")
    assert response.status_code == 200

    url = utils._get_latest_email_url("verify")
    response = client.get(url)
    assert response.status_code == 200
    token = response.json()["token"]
    assert token

    user = User.objects.get(id=user_id)
    assert user.verified

    response = client.get(url)
    assert response.status_code == 400, "Token invalid once user is verified"


@utils.with_client
@override_settings(SEND_VERIFICATION_EMAIL=True)
def test_verify_email_bad_token(client):
    user_data = {
        "email": "bobby-bad-token@example.com",
        "password": "foofoofoo",
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
        "password": "foofoofoo",
    }
    new_password = "N3wP455w0rd"
    user = User.objects.create_user(**user_data)

    response = client.post("/api/password-reset/", json={"email": user_data["email"]})
    assert response.status_code == 200

    url = utils._get_latest_email_url("password-reset")

    response = client.post(url, json={"new_password": new_password})
    assert response.status_code == 200
    assert response.json()["email"] == user_data["email"]

    user = User.objects.get(email=user_data["email"])
    assert user.check_password(new_password)


@utils.with_client
def test_password_reset_twice(client):
    user_data = {
        "email": "very-forgetful-bobby@example.com",
        "password": "foofoofoo",
    }
    new_password = "N3wP455w0rd"

    response = client.post("/api/password-reset/", json={"email": user_data["email"]})
    assert response.status_code == 200

    url = utils._get_latest_email_url("password-reset")

    response = client.post("/api/password-reset/", json={"email": user_data["email"]})
    assert response.status_code == 200

    response = client.post(url, json={"new_password": new_password})
    assert response.status_code == 400
    assert response.json()["detail"] == exceptions.PasswordResetError.default_detail


@utils.with_client
@override_settings(SEND_VERIFICATION_EMAIL=True)
def test_password_reset_email_bad_token(client):
    user_data = {
        "email": "billy-bad-token@example.com",
        "password": "foofoofoo",
    }
    new_password = "N3wP455w0rd"
    user = User.objects.create_user(**user_data)
    token = "B4dT0k3n"
    response = client.post(f"/api/user/{user.id}/password-reset/{token}/", json={"new_password": new_password})
    assert response.status_code == 400
    assert response.json()["detail"] == exceptions.PasswordResetError.default_detail

    user = User.objects.get(email=user_data["email"])
    assert not user.check_password(new_password)


@utils.with_client
@override_settings(send_verification_email=True)
def test_password_reset_non_existent_user(client):
    response = client.post("/api/password-reset/", json={"email": "non_existent@example.com"})
    assert response.status_code == 200


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
