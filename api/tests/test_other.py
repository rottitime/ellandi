from django.conf import settings
from django.test import override_settings
from rest_framework import status
from tests import utils

TEST_SERVER_URL = "http://testserver:8000/"

DEBUG_ONLY_URLS_GET = [
    "/api/schema/",
    "/api/schema/swagger-ui/",
    "/api/schema/redoc/",
    "/api/debug/",
    "/admin/",
]

DEBUG_ONLY_URLS_POST = [
    "api/one-time-login-token/",
    "api/first-time-login/",
]


@utils.with_logged_in_client
def test_json_only(client, user_id):
    user_data = {"email": "jane_modified@example.com", "first_name": "Alice"}
    response = client.patch("/api/me/", data=user_data)
    assert response.status_code == status.HTTP_415_UNSUPPORTED_MEDIA_TYPE


@utils.with_logged_in_admin_client
def test_debug_endpoint(client, user_id):
    print(f"debug: {settings.DEBUG}")
    response = client.get("/api/debug/")
    assert response.status_code == status.HTTP_200_OK, response.status_code
    data = response.json()
    assert "DEBUG" in data, data
    assert "EMAIL_BACKEND_TYPE" in data, data


@utils.with_logged_in_client
def test_forbidden_debug_endpoint(client, user_id):
    response = client.get("/api/debug/")
    assert response.status_code == status.HTTP_403_FORBIDDEN, response.status_code


@utils.with_logged_in_admin_client
def test_endpoints_debug_true(client, user_id):
    for url in DEBUG_ONLY_URLS_GET:
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK, response.status_code
    for url in DEBUG_ONLY_URLS_POST:
        response = client.post(url)
        assert response.status_code == status.HTTP_200_OK, response.status_code


@utils.with_logged_in_admin_client
@override_settings(DEBUG=False)
def test_disabled_debug_endpoints(client, user_id):
    for url in DEBUG_ONLY_URLS_GET:
        response = client.get(url)
        assert response.status_code == status.HTTP_404_NOT_FOUND, response.status_code
    for url in DEBUG_ONLY_URLS_POST:
        response = client.post(url)
        assert response.status_code == status.HTTP_404_NOT_FOUND, response.status_code
