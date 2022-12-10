import datetime

from rest_framework import status
from tests import utils

from ellandi.registration.models import Learning, User


@utils.with_logged_in_client
def test_me_learning_work(client, user_id):
    data = [{"name": "Did some work learning", "duration_minutes": 357, "date_completed": "2022-09-21"}]
    response = client.patch("/api/me/learning-on-the-job/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/api/me/learning-on-the-job/")

    result = response.json()
    for key, value in data[0].items():
        assert result[0][key] == value


@utils.with_logged_in_client
def test_me_learning_social(client, user_id):
    data = [{"name": "Did some social learning", "duration_minutes": 400000, "date_completed": "2022-09-21"}]
    response = client.patch("/api/me/learning-social/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/api/me/learning-social/")
    result = response.json()
    for key, value in data[0].items():
        assert result[0][key] == value


@utils.with_logged_in_client
def test_me_learning_formal(client, user_id):
    data = [
        {
            "name": "A very long and expensive course",
            "duration_minutes": 44400,
            "date_completed": "2022-09-21",
            "cost_pounds": 35000,
        }
    ]
    response = client.patch("/api/me/learning-formal/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/api/me/learning-formal/")
    result = response.json()
    for key, value in data[0].items():
        assert result[0][key] == value



@utils.with_logged_in_client
def test_long_duration_cost(client, user_id):
    data = [
        {
            "name": "A very very long and expensive course",
            "duration_minutes": 99999999999999999999,
            "date_completed": "2022-09-21",
            "cost_pounds": 99999999999999999999,
        }
    ]
    response = client.patch("/api/me/learning-formal/", json=data)
    assert response.status_code == status.HTTP_400_BAD_REQUEST, response.status_code

    expected = [{'duration_minutes': ['Ensure this value is less than or equal to 2147483647.'], 'cost_pounds': ['Ensure this value is less than or equal to 2147483647.']}]

    assert response.json() == expected


@utils.with_logged_in_client
def test_me_learning_patch_get_delete(client, user_id):
    today_str = datetime.date.today().strftime("%Y-%m-%d")
    data = [
        {
            "name": "Did some on the job learning",
            "duration_minutes": 300,
            "date_completed": today_str,
            "learning_type": "On the job",
        },
        {
            "name": "Did some social learning",
            "duration_minutes": 700,
            "date_completed": today_str,
            "learning_type": "Social",
        },
        {
            "name": "Did some formal learning",
            "duration_minutes": 370,
            "date_completed": today_str,
            "learning_type": "Formal",
            "cost_pounds": 35,
        },
    ]
    expected_distribution_data = [
        {"name": "Formal", "value_percentage": 27},
        {"name": "Social", "value_percentage": 51},
        {"name": "On the job", "value_percentage": 22},
    ]
    response = client.patch("/api/me/learnings/", json=data)
    assert response.status_code == status.HTTP_200_OK, response.status_code

    response = client.get("/api/me/learnings/")
    all_result = response.json()
    assert all_result["distribution"] == expected_distribution_data
    assert all_result["goal_value_days"] == 3
    assert all_result["goal_value_percentage"] == 31

    for i, learning_type in enumerate(("On the job", "Social", "Formal")):
        response = client.get(f"/api/me/learnings/?learning_type={learning_type}")
        result = response.json()
        assert result["distribution"] == expected_distribution_data
        assert result["goal_value_days"] == 3
        result_data = result["data"]
        for key, value in data[i].items():
            assert result_data[0][key] == value, result_data
            assert all_result["data"][i][key] == value, all_result["data"]

    response = client.get("/api/me/learnings/?learning_type=Formal")
    formal_learning_id = response.json()["data"][0]["id"]

    more_data = [
        {
            "name": "OTJ learning",
            "duration_minutes": 666,
            "date_completed": "2021-08-20",
            "learning_type": "On the job",
        },
        {"id": formal_learning_id, "name": "Updated formal learning", "duration_minutes": 34},
    ]
    response = client.patch("/api/me/learnings/", json=more_data)
    assert response.status_code == status.HTTP_200_OK, response

    response = client.get("/api/me/learnings/?learning_type=On the job&sortfield=name")
    result = response.json()
    result_data = result["data"]
    assert len(result_data) == 2
    assert result_data[0]["name"] == "Did some on the job learning", result_data
    assert result_data[1]["learning_type"] == "On the job"

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
        duration_minutes=900,
        cost_pounds=300,
        learning_type=Learning.LearningType.ON_THE_JOB,
        date_completed=datetime.date.today(),
    ).save()
    Learning(
        user=direct_report,
        name="Python course",
        duration_minutes=100,
        cost_pounds=15,
        learning_type=Learning.LearningType.SOCIAL,
        date_completed=datetime.date.today(),
    ).save()
    direct_report_id = direct_report.id
    response = client.get(f"/api/me/direct-report/{direct_report_id}/learnings/?sortfield=duration_minutes")
    result = response.json()
    assert result["goal_value_days"] == 2, result
    assert result["goal_value_percentage"] == 23, result
    expected_distribution = [
        {"name": "Formal", "value_percentage": 0},
        {"name": "Social", "value_percentage": 10},
        {"name": "On the job", "value_percentage": 90},
    ]
    assert result["distribution"] == expected_distribution
    result_data = result["data"]
    assert len(result_data) == 2
    assert result_data[1]["name"] == "Management training"
    assert result_data[0]["duration_minutes"] == 100
