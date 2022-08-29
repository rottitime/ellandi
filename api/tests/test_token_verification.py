import os
import pathlib

from django.conf import settings
from tests import utils

from ellandi.registration.models import User


def setup():
    User.objects.create_user(**utils.user_data)


def teardown():
    User.objects.filter(email=utils.user_data["email"]).delete()


def _get_latest_email_url():
    email_dir = pathlib.Path(settings.EMAIL_FILE_PATH)
    latest_email_path = max(email_dir.iterdir(), key=os.path.getmtime)
    with latest_email_path.open() as f:
        lines = f.readlines()
    url_lines = tuple(line for line in lines if line.startswith("http://testserver/"))
    assert len(url_lines) == 1
    url = url_lines[0].strip()
    return url


@utils.with_client
def test_verify_email(client):
    user_data = {
        "email": "bobby@example.com",
        "password": "foo",
    }
    response = client.post("/register/", json={"email": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 200

    url = _get_latest_email_url()

    response = client.get(url)
    assert response.status_code == 200
    assert response.json()["email"] == user_data["email"]

    user = User.objects.get(email=user_data["email"])
    assert user.verified
