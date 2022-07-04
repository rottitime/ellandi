from ellandi.registration.models import User
from tests import utils

user_data = dict(email="mr_flibble@example.com", password="P455w0rd")


def setup():
    User.objects.create_user(**user_data)


def teardown():
    User.objects.filter(email=user_data["email"]).delete()


@utils.with_client
def test_homepage_no_auth(client):
    response = client.get("/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Authentication credentials were not provided."}


@utils.with_client
def test_logout(client):

    response = client.post("/login/", json={"username": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 200
    token = response.json()["token"]
    assert token

    headers = {"Authorization": f"Token {token}"}
    client.headers = headers

    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["users"] == "http://testserver:8000/users/"

    response = client.post("/logout/")
    assert response.status_code == 204


@utils.with_client
def test_login(client):
    response = client.post("/login/", json={"username": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 200
    assert response.json()["token"]
