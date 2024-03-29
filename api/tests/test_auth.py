from tests import utils

from ellandi.registration.models import User

user_data = dict(email="mr_flibble@example.com", password="P455w0rd")
new_user_1_data = dict(email="someone_new_1@example.com", password="0th3rP455w0rd")
new_user_2_data = dict(email="someone_new_2@example.com", password="0th3rP455w0rd")
wrong_domain_user = dict(email="mr_wrong_email_domain@example.org", password="0th3rP455w0rd")


def setup():
    User.objects.create_user(**user_data)


def teardown():
    User.objects.filter(email=user_data["email"]).delete()
    User.objects.filter(email=new_user_1_data["email"]).delete()
    User.objects.filter(email=new_user_2_data["email"]).delete()


@utils.with_client
def test_create_user_already_exists(client):
    response = client.post("/api/register/", json={"email": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 400
    error = response.json()
    expected_error = "We're unable to create your account. If you already have an account, try to sign in"
    assert error == {"detail": expected_error}


@utils.with_client
def test_create_user_short_password(client):
    response = client.post("/api/register/", json={"email": user_data["email"], "password": "*"})
    assert response.status_code == 400
    error = response.json()["password"]
    expected_error = ["Ensure this field has at least 8 characters."]
    assert error == expected_error


@utils.with_client
def test_create_user_without_privacy_policy(client):
    response = client.post(
        "/api/register/", json={"email": new_user_1_data["email"], "password": new_user_1_data["password"]}
    )
    assert response.status_code == 200
    user = response.json()
    assert user["id"]
    assert not user["privacy_policy_agreement"]


@utils.with_client
def test_create_user_with_privacy_policy(client):
    response = client.post(
        "/api/register/",
        json={
            "email": new_user_2_data["email"],
            "password": new_user_2_data["password"],
            "privacy_policy_agreement": True,
        },
    )
    assert response.status_code == 200
    user = response.json()
    assert user["id"]
    assert user["privacy_policy_agreement"]


@utils.with_client
def test_create_user_wrong_email(client):
    response = client.post("/api/register/", json=wrong_domain_user)
    assert response.status_code == 400
    error = response.json()
    assert error == {"detail": "You need a recognised Cabinet Office email address to use this service"}


@utils.with_client
def test_homepage_no_auth(client):
    response = client.get("/api/")
    assert response.status_code == 401
    assert response.json() == {"detail": "Authentication credentials were not provided."}


@utils.with_client
def test_logout(client):
    response = client.post("/api/login/", json={"email": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 200
    token = response.json()["token"]
    assert token

    headers = {"Authorization": f"Token {token}"}
    client.headers = headers

    response = client.get("/api/")
    assert response.status_code == 200
    assert response.json()["user-skills"] == "http://testserver:8000/api/user-skills/", response.json()

    response = client.post("/api/logout/")
    assert response.status_code == 204


@utils.with_client
def test_login(client):
    response = client.post("/api/login/", json={"email": user_data["email"], "password": user_data["password"]})
    assert response.status_code == 200
    assert response.json()["token"]


@utils.with_client
def test_failed_login(client):
    response = client.post("/api/login/", json={"email": user_data["email"], "password": "floooble-flabble"})
    assert response.status_code == 403
    error_message = response.json()["detail"]
    expected = "Either the email address and/or password you have entered is incorrect"
    assert error_message == expected


@utils.with_logged_in_client
def test_me_view(client, user_id):
    response = client.get("/api/me/")
    data = response.json()
    assert data["id"] == user_id
    for key in ("email", "first_name", "last_name"):
        assert data[key] == utils.user_data[key]
