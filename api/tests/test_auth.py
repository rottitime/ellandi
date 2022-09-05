from tests import utils

from ellandi.registration.models import User

user_data = dict(email="mr_flibble@example.com", password="P455w0rd")
new_user_data = dict(email="someone_new@example.com", password="0th3rP455w0rd")


def setup():
    User.objects.create_user(**user_data)


def teardown():
    User.objects.filter(email=user_data["email"]).delete()
    User.objects.filter(email=new_user_data["email"]).delete()


@utils.with_client
def test_create_user_already_exists(client):
    response = client.post("/register/", json={"email": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 400
    error = response.json()
    assert error == {"detail": "User already exists"}


@utils.with_client
def test_create_user(client):
    response = client.post("/register/", json={"email": new_user_data["email"], "password": new_user_data["password"]})
    assert response.status_code == 200
    user = response.json()
    assert user["id"]


@utils.with_client
def test_create_user_wrong_email(client):
    response = client.post("/register/", json={"email": "mr_wrong_email@example.org", "password": "elephants123"})
    assert response.status_code == 400
    error = response.json()
    assert error["detail"] == "You need a recognised Cabinet Office email address to use this service"



# TODO: Uncomment when we re-enable auth
# @utils.with_client
# def test_homepage_no_auth(client):
#     response = client.get("/")
#     assert response.status_code == 401
#     assert response.json() == {"detail": "Authentication credentials were not provided."}


@utils.with_client
def test_logout(client):
    response = client.post("/login/", json={"email": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 200
    token = response.json()["token"]
    assert token

    headers = {"Authorization": f"Token {token}"}
    client.headers = headers

    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["user-skills"] == "http://testserver:8000/user-skills/"

    response = client.post("/logout/")
    assert response.status_code == 204


@utils.with_client
def test_login(client):
    response = client.post("/login/", json={"email": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 200
    assert response.json()["token"]


@utils.with_client
def test_failed_login(client):
    response = client.post("/login/", json={"email": user_data["email"], "password": "floooble-flabble"})
    assert response.status_code == 403
    error_message = response.json()["detail"]
    expected = "Either the email address and/or password you have entered is incorrect"
    assert error_message == expected


@utils.with_logged_in_client
def test_me_view(client, user_id):
    response = client.get("/me/")
    data = response.json()
    assert data["id"] == user_id
    for key in ("email", "first_name", "last_name"):
        assert data[key] == utils.user_data[key]
