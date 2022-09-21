from rest_framework import status
from tests import utils


@utils.with_logged_in_client
def test_me_learning_work(client, user_id):
    data = [
        {
            "name": "Did some work learning",
            "duration_minutes": 32767,
            "date_completed": "2022-09-21"
        }
    ]
    response = client.patch("/me/learning-work/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/me/learning-work/")
    expected = [
        {
            "name": "Did some work learning",
            "duration_minutes": 32767,
            "date_completed": "2022-09-21"
        }
    ]

    result = response.json()
    for key, value in expected[0].items():
        assert result[0][key] == value
