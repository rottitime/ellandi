from django.conf import settings
from nose.tools import with_setup
from rest_framework import status
from tests import utils

from ellandi.registration.models import EmailSalt, User

DEBUG_ONLY_URLS_GET = [
    "/api/schema/",
    "/api/schema/swagger-ui/",
    "/api/schema/redoc/",
    "/api/debug/",
    "/admin/",
]


@utils.with_logged_in_client
def test_forbidden_debug_endpoint(client, user_id):
    response = client.get("/api/debug/")
    if settings.DEBUG:
        assert response.status_code == status.HTTP_403_FORBIDDEN
    else:
        assert response.status_code == status.HTTP_404_NOT_FOUND


@utils.with_logged_in_admin_client
def test_debug_endpoint(client, user_id):
    response = client.get("/api/debug/")
    if settings.DEBUG:
        assert response.status_code == status.HTTP_200_OK, response.status_code
        data = response.json()
        assert "DEBUG" in data, data
        assert "EMAIL_BACKEND_TYPE" in data, data
    else:
        assert response.status_code == status.HTTP_404_NOT_FOUND


def setup_one_time_login():
    EmailSalt(email="test_login@example.com", salt="fake_salt".encode("utf-8")).save()


def teardown_one_time_login():
    EmailSalt.objects.filter(email__iexact="test_login@example.com").delete()
    User.objects.filter(email__iexact="test_login@example.com").delete()


@utils.with_client
@with_setup(None, teardown_one_time_login)
def test_post_create_one_time_login(client):
    response = client.post("/api/one-time-login-token/", json={"email": "test_login@example.com"})
    if settings.DEBUG:
        one_time_token = response.json()["one_time_token"]
        assert response.status_code == status.HTTP_200_OK
        assert one_time_token
    else:
        assert response.status_code == status.HTTP_404_NOT_FOUND


@utils.with_client
@with_setup(None, teardown_one_time_login)
def test_post_create_one_time_login_incorrect_email(client):
    response = client.post("/api/one-time-login-token/")
    if settings.DEBUG:
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.json() == {"detail": "You need to provide an email"}, response.json()
        response = client.post(
            "/api/one-time-login-token/",
            json={"email": "mr_wrong_email_domain@example.org", "password": "0th3rP455w0rd"},
        )
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert response.json() == {
            "detail": "You need a recognised Cabinet Office email address to use this service"
        }, response.json()
    else:
        assert response.status_code == status.HTTP_404_NOT_FOUND


@utils.with_client
@with_setup(setup_one_time_login, teardown_one_time_login)
def test_post_first_time_login(client):
    tok = EmailSalt.objects.get(email="test_login@example.com").get_one_time_login()
    response = client.post("/api/first-time-login/", json={"email": "test_login@Example.com", "one_time_token": tok})
    if settings.DEBUG:
        user = User.objects.get(email="test_login@example.com")
        assert response.status_code == status.HTTP_201_CREATED
        assert user
    else:
        assert response.status_code == status.HTTP_404_NOT_FOUND


@utils.with_logged_in_admin_client
def test_get_endpoints_debug(client, user_id):
    for url in DEBUG_ONLY_URLS_GET:
        response = client.get(url)
        if settings.DEBUG:
            print(url)
            assert response.status_code == status.HTTP_200_OK, response
        else:
            assert response.status_code == status.HTTP_404_NOT_FOUND

