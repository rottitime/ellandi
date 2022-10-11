from rest_framework import status
from tests import utils


@utils.with_logged_in_client
def test_me_learning_work(client, user_id):
    data = [{"name": "Did some work learning", "duration_minutes": 32767, "date_completed": "2022-09-21"}]
    response = client.patch("/api/me/learning-on-the-job/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/api/me/learning-on-the-job/")

    result = response.json()
    for key, value in data[0].items():
        assert result[0][key] == value


@utils.with_logged_in_client
def test_me_learning_social(client, user_id):
    data = [{"name": "Did some social learning", "duration_minutes": 32767, "date_completed": "2022-09-21"}]
    response = client.patch("/api/me/learning-social/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/api/me/learning-social/")

    result = response.json()
    for key, value in data[0].items():
        assert result[0][key] == value


@utils.with_logged_in_client
def test_me_learning_formal(client, user_id):
    data = [{"name": "Did some formal learning", "duration_minutes": 32767, "date_completed": "2022-09-21"}]
    response = client.patch("/api/me/learning-formal/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/api/me/learning-formal/")

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
    response = client.patch("/api/me/learnings/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/api/me/learnings/")
    all_result = response.json()

    for i, learning_type in enumerate(("On the job", "Social", "Formal")):
        response = client.get(f"/api/me/learnings/?learning_type={learning_type}")
        result = response.json()
        for key, value in data[i].items():
            assert result[0][key] == value, result
            assert all_result[i][key] == value, all_result

    more_data = [
        {
            "name": "OTJ learning",
            "duration_minutes": 666,
            "date_completed": "2022-09-20",
            "learning_type": "On the job",
        },
    ]
    response = client.patch("/api/me/learnings/", json=more_data)
    assert response.status_code == status.HTTP_200_OK, response

    response = client.get("/api/me/learnings/?learning_type=On the job&sortfield=name")
    result = response.json()
    assert len(result) == 2
    assert result[0]["name"] == "Did some on the job learning", result
    assert result[1]["learning_type"] == "On the job"

    response = client.get("/api/me/learnings/?sortfield=-duration_minutes")
    result = response.json()
    assert len(result) == 4
    assert result[3]["duration_minutes"] == 666

    formal_learning = [learning for learning in all_result if learning["name"] == "Did some formal learning"][0]
    id_to_delete = formal_learning["id"]
    response = client.delete(f"/api/me/learnings/{id_to_delete}/")
    assert response.status_code == status.HTTP_200_OK, response.status_code
