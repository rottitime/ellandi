from rest_framework import status
from tests import utils


@utils.with_logged_in_client
def test_me_learning_work(client, user_id):
    data = [{"name": "Did some work learning", "duration_minutes": 32767, "date_completed": "2022-09-21"}]
    response = client.patch("/me/learning-on-the-job/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/me/learning-on-the-job/")

    result = response.json()
    for key, value in data[0].items():
        assert result[0][key] == value


@utils.with_logged_in_client
def test_me_learning_social(client, user_id):
    data = [{"name": "Did some social learning", "duration_minutes": 32767, "date_completed": "2022-09-21"}]
    response = client.patch("/me/learning-social/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/me/learning-social/")

    result = response.json()
    for key, value in data[0].items():
        assert result[0][key] == value


@utils.with_logged_in_client
def test_me_learning_formal(client, user_id):
    data = [{"name": "Did some formal learning", "duration_minutes": 32767, "date_completed": "2022-09-21"}]
    response = client.patch("/me/learning-formal/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/me/learning-formal/")

    result = response.json()
    for key, value in data[0].items():
        assert result[0][key] == value


@utils.with_logged_in_client
def test_me_learning_patch_get_delete(client, user_id):
    data = [
        {
            "name": "Did some on the job learning",
            "duration_minutes": 32767,
            "date_completed": "2022-09-21",
            "learning_type": "On the job",
        },
        {
            "name": "Did some social learning",
            "duration_minutes": 32767,
            "date_completed": "2022-09-21",
            "learning_type": "Social",
        },
        {
            "name": "Did some formal learning",
            "duration_minutes": 32767,
            "date_completed": "2022-09-21",
            "learning_type": "Formal",
            "cost_pounds": 35,
        },
    ]
    response = client.patch("/me/learnings/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/me/learnings/")
    all_result = response.json()

    for i, learning_type in enumerate(("On the job", "Social", "Formal")):
        response = client.get(f"/me/learnings/?learning_type={learning_type}")

        result = response.json()
        for key, value in data[i].items():
            assert result[0][key] == value
            assert all_result[i][key] == value

    formal_learning = [learning for learning in all_result if learning["name"] == "Did some formal learning"][0]
    id_to_delete = formal_learning.id
    response = client.delete(f"/me/learnings/{id_to_delete}/")
    assert response.status_code == status.HTTP_200_OK, response.status_code
