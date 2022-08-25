from rest_framework import status
from tests import utils

TEST_SERVER_URL = "http://testserver:8000/"


@utils.with_logged_in_client
def test_json_only(client, user_id):
    user_data = {"email": "jane_modified@example.com", "first_name": "Alice"}
    response = client.patch("/me/", data=user_data)
    assert response.status_code == status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
