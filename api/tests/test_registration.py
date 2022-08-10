from nose.tools import with_setup
from rest_framework import status
from tests import utils

from ellandi.registration.models import EmailSalt, User

TEST_SERVER_URL = "http://testserver:8000/"


@utils.with_logged_in_client
def test_users_get(client, user_id):
    # Populate with some skills first
    user_skill_data = {
        "user": user_id,
        "skill_name": "maths",
        "level": "proficient",
    }
    response = client.post("/user-skills/", json=user_skill_data)
    assert response.status_code == status.HTTP_201_CREATED
    response = client.get("/users/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data[0]["email"] == "jane@example.com"
    assert data[0]["skills"][0]["skill_name"] == "maths"


@utils.with_logged_in_client
def test_user_get(client, user_id):
    response = client.get(f"/users/{user_id}/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["first_name"] == "Jane"


@utils.with_logged_in_client
def test_user_post(client, user_id):
    data = {
        "first_name": "Bob",
        "last_name": "Smith",
        "organisation": "Cabinet Office",
        "job_title": "Farmer",
        "line_manager_email": "line@example.com",
        "contract_type": "permanent",
        "grade": "Grade 6",
        "privacy_policy_agreement": True,
    }
    response = client.post("/users/", json=data)
    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED


@utils.with_logged_in_client
def test_delete(client, user_id):
    response = client.delete(f"/users/{user_id}/")
    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED


@utils.with_logged_in_client
def test_user_put(client, user_id):
    updated_user_data = {
        "email": "jane_modified@example.com",
        "first_name": "Jane",
        "last_name": "Brown",
        "professions": [
            "Operational Research Service",
            "Policy",
            "Other",
        ],
        "profession_other": "A new and exciting profession",
        "function": "Analysis",
    }
    response = client.put(f"/users/{user_id}/", data=updated_user_data)
    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED


@utils.with_logged_in_client
def test_user_patch(client, user_id):
    user_skill_data = {
        "user": user_id,
        "skill_name": "maths",
        "level": "proficient",
    }
    user_languages_data = {
        "user": user_id,
        "name": "Spanish",
        "speaking_level": "proficient",
        "writing_level": "basic",
    }
    more_user_data = {
        "location": "Manchester",
        "professions": ["Operational Research Service", "Other"],
        "profession_other": "Data science",
        "primary_profession": "Data science",
        "function": "Analysis",
    }
    response = client.post("/user-skills/", json=user_skill_data)
    assert response.status_code == status.HTTP_201_CREATED
    response = client.post("/user-languages/", json=user_languages_data)
    assert response.status_code == status.HTTP_201_CREATED
    response = client.patch(f"/users/{user_id}/", json=more_user_data)
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["email"] == "jane@example.com", "Email field should be read-only"
    assert response.json()["last_name"] == "Green"
    assert response.json()["skills"][0]["skill_name"] == "maths"

    more_nested_user_data = {
        "first_name": "Alice",
        "professions": ["Policy", "Operational Research Service"],
        "profession_other": "",
        "skills": [{"skill_name": "running", "level": "competent", "validated": False}],
        "languages": [],
    }
    response = client.patch(f"/users/{user_id}/", json=more_nested_user_data)
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["first_name"] == "Alice"
    assert len(data["professions"]) == 2
    assert "Policy" in data["professions"]
    assert data["profession_other"] == ""
    assert len(data["languages"]) == 1, data["languages"]
    assert len(data["skills"]) == 2, data["skills"]

    even_more_nested_data = {
        "languages": [
            {"name": "French", "speaking_level": "proficient", "writing_level": "basic"},
            {"name": "Spanish", "speaking_level": "proficient", "writing_level": "proficient"},
        ]
    }
    response = client.patch(f"/users/{user_id}/", json=even_more_nested_data)
    assert response.status_code == status.HTTP_200_OK, response.text
    data = response.json()
    languages_list = data["languages"]
    assert len(languages_list) == 2, languages_list
    assert "French" in [lang["name"] for lang in languages_list]
    spanish_lang = [lang for lang in languages_list if lang["name"] == "Spanish"][0]
    assert spanish_lang["speaking_level"] == "proficient"


@utils.with_logged_in_client
def test_get_user_userskills(client, user_id):
    user_skill_data = {
        "user": user_id,
        "skill_name": "typing",
        "level": "proficient",
    }

    response = client.post("/user-skills/", json=user_skill_data)
    assert response.status_code == status.HTTP_201_CREATED
    user_skill_id = response.json()["id"]
    assert response.json()["skill_name"] == "typing"
    assert response.json()["level"] == "proficient"

    response = client.get(f"/users/{user_id}/skills/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()[0]["skill_name"] == "typing"
    assert response.json()[0]["level"] == "proficient"

    response = client.delete(f"/user-skills/{user_skill_id}/")
    assert response.status_code == status.HTTP_204_NO_CONTENT


@utils.with_logged_in_client
def test_get_user_userlanguages(client, user_id):
    user_languages_data = {
        "user": user_id,
        "name": "Spanish",
        "speaking_level": "proficient",
        "writing_level": "independent",
    }

    response = client.post("/user-languages/", json=user_languages_data)
    assert response.status_code == status.HTTP_201_CREATED
    user_language_id = response.json()["id"]
    assert response.json()["name"] == "Spanish"
    assert response.json()["speaking_level"] == "proficient"
    assert response.json()["writing_level"] == "independent"

    response = client.get(f"/users/{user_id}/languages/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()[0]["name"] == "Spanish"
    assert response.json()[0]["speaking_level"] == "proficient"

    response = client.delete(f"/user-languages/{user_language_id}/")
    assert response.status_code == status.HTTP_204_NO_CONTENT


@utils.with_logged_in_client
def test_post_get_put_delete_user_skill(client, user_id):
    response = client.get("/user-skills/")
    assert len(response.json()) == 0

    user_skill_data = {
        "user": user_id,
        "skill_name": "maths",
        "level": "proficient",
    }
    response = client.post("/user-skills/", json=user_skill_data)
    assert response.status_code == status.HTTP_201_CREATED
    user_skill_id = response.json()["id"]
    assert response.json()["skill_name"] == "maths"
    assert response.json()["level"] == "proficient"

    response = client.get("/user-skills/")
    assert len(response.json()) == 1

    response = client.get(f"/user-skills/{user_skill_id}/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["skill_name"] == "maths"
    assert response.json()["level"] == "proficient"

    user_skill_data_updated = {
        "user": user_id,
        "skill_name": "maths",
        "level": "beginner",
    }
    response = client.put(f"/user-skills/{user_skill_id}/", json=user_skill_data_updated)
    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

    response = client.delete(f"/user-skills/{user_skill_id}/")
    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = client.get("/user-skills/")
    assert len(response.json()) == 0


@utils.with_logged_in_client
def test_post_get_put_delete_user_language(client, user_id):
    response = client.get("/user-languages/")
    assert len(response.json()) == 0

    user_language_data = {"user": user_id, "name": "Latin", "writing_level": "proficient"}
    response = client.post("/user-languages/", json=user_language_data)
    assert response.status_code == status.HTTP_201_CREATED, response.text
    response_data = response.json()
    user_language_id = response_data["id"]
    assert response_data["name"] == "Latin"
    assert response_data["writing_level"] == "proficient"
    assert not response_data["speaking_level"]

    response = client.get("/user-languages/")
    assert len(response.json()) == 1

    response = client.get(f"/user-languages/{user_language_id}/")
    response_data = response.json()
    assert response.status_code == status.HTTP_200_OK
    assert response_data["name"] == "Latin"
    assert response_data["writing_level"] == "proficient"

    user_language_data_updated = {"user": user_id, "name": "Latin", "speaking_level": "basic"}
    response = client.put(f"/user-languages/{user_language_id}/", json=user_language_data_updated)
    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

    response = client.delete(f"/user-languages/{user_language_id}/")
    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = client.get("/user-languages/")
    assert len(response.json()) == 0


@utils.with_logged_in_client
def test_post_get_put_delete_user_skill_develop(client, user_id):
    response = client.get("/user-skills-develop/")
    assert len(response.json()) == 0

    response = client.post("/user-skills-develop/", json={"user": user_id, "skill_name": "statistics"})
    assert response.status_code == status.HTTP_201_CREATED
    user_skill_develop_id = response.json()["id"]
    assert response.json()["skill_name"] == "statistics"

    response = client.get("/user-skills-develop/")
    assert len(response.json()) == 1, response.json()

    response = client.get(f"/user-skills-develop/{user_skill_develop_id}/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["skill_name"] == "statistics"

    user_skill_data_updated = {
        "user": user_id,
        "skill_name": "advanced statistics",
    }
    response = client.put(f"/user-skills-develop/{user_skill_develop_id}/", json=user_skill_data_updated)
    assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED

    response = client.delete(f"/user-skills-develop/{user_skill_develop_id}/")
    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = client.get("/user-skills-develop/")
    assert len(response.json()) == 0


@utils.with_logged_in_client
def test_dropdown_list(client, user_id):

    data = [
        {"name": "Cabinet Office", "slug": "cabinet-office", "endpoint": "/organisations/"},
        {"name": "Fixed-term", "slug": "fixed-term", "endpoint": "/contract-types/"},
        {"name": "Salford", "slug": "salford", "endpoint": "/locations/"},
        {"name": "Bengali", "slug": "bengali", "endpoint": "/languages/"},
        {
            "name": "Government Operational Research Service",
            "slug": "government-operational-research-service",
            "endpoint": "/professions/",
        },
        {"name": "Grade 7", "slug": "grade-7", "endpoint": "/grades/"},
        {"name": "Independent", "slug": "independent", "endpoint": "/language-skill-levels/"},
        {"name": "United Kingdom", "slug": "united-kingdom", "endpoint": "/countries/"},
        {"name": "Analysis", "slug": "analysis", "endpoint": "/functions/"},
    ]

    def test_get(endpoint):
        response = client.get(endpoint)
        assert response.status_code == status.HTTP_200_OK
        assert response.json()

    def test_get_item(endpoint, slug):
        response = client.get(f"{endpoint}{slug}/")
        assert response.status_code == status.HTTP_200_OK
        assert response.json()

    def test_post(endpoint):
        response = client.post(endpoint, {"name": "a new name"})
        assert response.status_code == status.HTTP_405_METHOD_NOT_ALLOWED
        assert response.json()["detail"] == "Method not allowed"

    for item in data:
        endpoint = item["endpoint"]
        slug = item["slug"]
        yield test_get, endpoint
        yield test_get_item, endpoint, slug
        yield test_post, endpoint


@utils.with_logged_in_client
def test_skills_list(client, user_id):
    user_skill_data = {
        "user": user_id,
        "skill_name": "new user skill",
        "level": "proficient",
    }
    response = client.post("/user-skills/", json=user_skill_data)
    response = client.get("/skills/")
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) > 0
    assert "new user skill" in response.json()


def setup_one_time_login():
    EmailSalt(email="test_login@example.com", salt="fake_salt".encode("utf-8")).save()


def teardown_one_time_login():
    EmailSalt.objects.filter(email__iexact="test_login@example.com").delete()
    User.objects.filter(email__iexact="test_login@example.com").delete()


@utils.with_client
@with_setup(None, teardown_one_time_login)
def test_post_create_one_time_login(client):
    response = client.post("/one-time-login-token/", json={"email": "test_login@example.com"})
    one_time_token = response.json()["one_time_token"]
    assert response.status_code == status.HTTP_200_OK
    assert one_time_token


@utils.with_client
@with_setup(None, teardown_one_time_login)
def test_post_create_one_time_login_no_email(client):
    response = client.post("/one-time-login-token/")
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()["detail"] == "You need to provide an email"


@utils.with_client
@with_setup(setup_one_time_login, teardown_one_time_login)
def test_post_first_time_login(client):
    tok = EmailSalt.objects.get(email="test_login@example.com").get_one_time_login()
    response = client.post("/first-time-login/", json={"email": "test_login@Example.com", "one_time_token": tok})
    user = User.objects.get(email="test_login@example.com")
    assert response.status_code == status.HTTP_201_CREATED
    assert user
