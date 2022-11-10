from rest_framework import status
from tests import utils

from ellandi.registration.models import Learning, User


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
            "duration_minutes": 300,
            "date_completed": "2022-09-21",
            "learning_type": "On the job",
        },
        {
            "name": "Did some social learning",
            "duration_minutes": 700,
            "date_completed": "2022-09-21",
            "learning_type": "Social",
        },
        {
            "name": "Did some formal learning",
            "duration_minutes": 370,
            "date_completed": "2022-09-21",
            "learning_type": "Formal",
            "cost_pounds": 35,
        },
    ]
    response = client.patch("/api/me/learnings/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/api/me/learnings/")
    all_result = response.json()["data"]

    for i, learning_type in enumerate(("On the job", "Social", "Formal")):
        response = client.get(f"/api/me/learnings/?learning_type={learning_type}")
        result = response.json()["data"]
        for key, value in data[i].items():
            assert result[0][key] == value, result
            assert all_result[i][key] == value, all_result

    response = client.get("/api/me/learnings/?learning_type=Formal")
    formal_learning_id = response.json()["data"][0]["id"]

    more_data = [
        {
            "name": "OTJ learning",
            "duration_minutes": 666,
            "date_completed": "2022-09-20",
            "learning_type": "On the job",
        },
        {"id": formal_learning_id, "name": "Updated formal learning", "duration_minutes": 34},
    ]
    response = client.patch("/api/me/learnings/", json=more_data)
    assert response.status_code == status.HTTP_200_OK, response

    response = client.get("/api/me/learnings/?learning_type=On the job&sortfield=name")
    result = response.json()["data"]
    assert len(result) == 2
    assert result[0]["name"] == "Did some on the job learning", result
    assert result[1]["learning_type"] == "On the job"

    response = client.get("/api/me/learnings/?learning_type=Formal")
    result = response.json()["data"][0]
    assert result["duration_minutes"] == 34, result
    assert result["cost_pounds"] == 35

    response = client.get("/api/me/learnings/?sortfield=-duration_minutes")
    result = response.json()["data"]
    assert len(result) == 4
    assert result[2]["duration_minutes"] == 300, result

    response = client.delete(f"/api/me/learnings/{formal_learning_id}/")
    assert response.status_code == status.HTTP_200_OK, response.status_code


@utils.with_logged_in_client
def test_me_direct_report_learning_get(client, user_id):
    direct_report = User.objects.get(email="direct_report@example.com")
    Learning(
        user=direct_report,
        name="Management training",
        duration_minutes=47,
        cost_pounds=300,
        learning_type=Learning.LearningType.ON_THE_JOB,
    ).save()
    Learning(
        user=direct_report,
        name="Python course",
        duration_minutes=100,
        cost_pounds=15,
        learning_type=Learning.LearningType.SOCIAL,
    ).save()
    direct_report_id = direct_report.id
    response = client.get(f"/api/me/direct-report/{direct_report_id}/learnings/?sortfield=duration_minutes")
    result = response.json()["data"]
    assert len(result) == 2
    assert result[0]["name"] == "Management training"
    assert result[1]["duration_minutes"] == 100
