from nose.tools import with_setup
from rest_framework import status
from tests import utils

from ellandi.registration.models import EmailSalt, User, UserSkill

TEST_SERVER_URL = "http://testserver:8000/"


@utils.with_logged_in_client
def test_user_get(client, user_id):
    response = client.get(f"/users/{user_id}/")
    assert response.status_code == status.HTTP_404_NOT_FOUND


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
    assert response.status_code == status.HTTP_404_NOT_FOUND


@utils.with_logged_in_client
def test_delete(client, user_id):
    response = client.delete(f"/users/{user_id}/")
    assert response.status_code == status.HTTP_404_NOT_FOUND


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
    assert response.status_code == status.HTTP_404_NOT_FOUND


def patch_user(client, user_id, endpoint):
    user_skill_data = {
        "user": user_id,
        "name": "maths",
        "level": "Proficient",
    }
    user_languages_data = {
        "user": user_id,
        "name": "Spanish",
        "speaking_level": "Proficient",
        "writing_level": "Basic",
    }
    more_user_data = {
        "location": "Manchester",
        "professions": ["Operational research", "Other"],
        "profession_other": "Data science",
        "primary_profession": "Data science",
        "function": "Analysis",
    }
    response = client.post("/user-skills/", json=user_skill_data)
    assert response.status_code == status.HTTP_201_CREATED, response.text
    response = client.post("/user-languages/", json=user_languages_data)
    assert response.status_code == status.HTTP_201_CREATED
    response = client.patch(endpoint, json=more_user_data)
    data = response.json()
    assert response.status_code == status.HTTP_200_OK
    assert data["email"] == "jane@example.com", "Email field should be read-only"
    assert data["last_name"] == "Green"
    assert data["skills"][0]["name"] == "maths"
    assert data["location"] == "Manchester"

    more_nested_user_data = {
        "first_name": "Alice",
        "professions": ["Policy", "Operational research"],
        "profession_other": "",
        "skills": [{"name": "running", "level": "Competent", "validated": False}],
        "languages": [],
        "skills_develop": [{"name": "Statistics"}, {"name": "R"}],
    }
    response = client.patch(endpoint, json=more_nested_user_data)
    assert response.status_code == status.HTTP_200_OK, response.text
    data = response.json()
    assert data["first_name"] == "Alice", data
    assert len(data["professions"]) == 2, data["professions"]
    assert "Policy" in data["professions"]
    assert data["profession_other"] == ""
    assert len(data["languages"]) == 1, data["languages"]
    assert len(data["skills"]) == 2, data["skills"]
    assert len(data["skills_develop"]) == 2, data["skills_develop"]

    even_more_nested_data = {
        "languages": [
            {"name": "French", "speaking_level": "Proficient", "writing_level": "Basic"},
            {"name": "Spanish", "speaking_level": "Proficient", "writing_level": "Proficient"},
        ]
    }
    response = client.patch(endpoint, json=even_more_nested_data)
    assert response.status_code == status.HTTP_200_OK, response.text
    data = response.json()
    languages_list = data["languages"]
    assert len(languages_list) == 2, languages_list
    assert "French" in [lang["name"] for lang in languages_list]
    spanish_lang = [lang for lang in languages_list if lang["name"] == "Spanish"][0]
    assert spanish_lang["speaking_level"] == "Proficient"


@utils.with_logged_in_client
def test_user_patch(client, user_id):
    endpoint = f"/users/{user_id}/"
    response = client.patch(endpoint, json={"first_name": "Bob"})
    assert response.status_code == status.HTTP_404_NOT_FOUND


@utils.with_logged_in_client
def test_me_patch(client, user_id):
    endpoint = "/me/"
    patch_user(client, user_id, endpoint)


@utils.with_logged_in_client
def test_get_user_userskills(client, user_id):
    user_skill_data = {
        "user": user_id,
        "name": "typing",
        "level": "Proficient",
    }

    response = client.post("/user-skills/", json=user_skill_data)
    assert response.status_code == status.HTTP_201_CREATED
    user_skill_id = response.json()["id"]
    assert response.json()["name"] == "typing"
    assert response.json()["level"] == "Proficient"

    response = client.get(f"/users/{user_id}/skills/")
    assert response.status_code == status.HTTP_404_NOT_FOUND

    response = client.delete(f"/user-skills/{user_skill_id}/")
    assert response.status_code == status.HTTP_204_NO_CONTENT


@utils.with_logged_in_client
def test_get_user_userlanguages(client, user_id):
    user_languages_data = {
        "user": user_id,
        "name": "Spanish",
        "speaking_level": "Proficient",
        "writing_level": "Independent",
    }

    response = client.post("/user-languages/", json=user_languages_data)
    assert response.status_code == status.HTTP_201_CREATED
    user_language_id = response.json()["id"]
    assert response.json()["name"] == "Spanish"
    assert response.json()["speaking_level"] == "Proficient"
    assert response.json()["writing_level"] == "Independent"

    response = client.get(f"/users/{user_id}/languages/")
    assert response.status_code == status.HTTP_404_NOT_FOUND

    response = client.delete(f"/user-languages/{user_language_id}/")
    assert response.status_code == status.HTTP_204_NO_CONTENT


@utils.with_logged_in_client
def test_post_get_put_delete_user_skill(client, user_id):
    response = client.get("/user-skills/")
    assert len(response.json()) == 0

    user_skill_data = {
        "user": user_id,
        "name": "maths",
        "level": "Proficient",
    }
    response = client.post("/user-skills/", json=user_skill_data)
    assert response.status_code == status.HTTP_201_CREATED, response.text
    user_skill_id = response.json()["id"]
    assert response.json()["name"] == "maths"
    assert response.json()["level"] == "Proficient"
    user_skill_obj = UserSkill.objects.get(user__id=user_id, name="maths")
    assert user_skill_obj.level == "Proficient"

    response = client.get("/user-skills/")
    assert len(response.json()) == 1

    response = client.get(f"/user-skills/{user_skill_id}/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["name"] == "maths"
    assert response.json()["level"] == "Proficient"

    user_skill_data_updated = {
        "user": user_id,
        "name": "maths",
        "level": "Beginner",
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

    user_language_data = {"user": user_id, "name": "Latin", "writing_level": "Proficient"}
    response = client.post("/user-languages/", json=user_language_data)
    assert response.status_code == status.HTTP_201_CREATED, response.text
    response_data = response.json()
    user_language_id = response_data["id"]
    assert response_data["name"] == "Latin"
    assert response_data["writing_level"] == "Proficient"
    assert not response_data["speaking_level"]

    response = client.get("/user-languages/")
    assert len(response.json()) == 1

    response = client.get(f"/user-languages/{user_language_id}/")
    response_data = response.json()
    assert response.status_code == status.HTTP_200_OK
    assert response_data["name"] == "Latin"
    assert response_data["writing_level"] == "Proficient"

    user_language_data_updated = {"user": user_id, "name": "Latin", "speaking_level": "Basic"}
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

    response = client.post("/user-skills-develop/", json={"user": user_id, "name": "statistics"})
    assert response.status_code == status.HTTP_201_CREATED
    user_skill_develop_id = response.json()["id"]
    assert response.json()["name"] == "statistics"

    response = client.get("/user-skills-develop/")
    assert len(response.json()) == 1, response.json()

    response = client.get(f"/user-skills-develop/{user_skill_develop_id}/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["name"] == "statistics"

    user_skill_data_updated = {
        "user": user_id,
        "name": "advanced statistics",
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
        {"name": "Advanced beginner", "slug": "advanced-beginner", "endpoint": "/skill-levels/"},
        {"name": "User researcher", "slug": "user-researcher", "endpoint": "/job-titles/"},
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
        "name": "new user skill",
        "level": "Proficient",
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
def test_post_create_one_time_login_incorrect_email(client):
    response = client.post("/one-time-login-token/")
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {"detail": "You need to provide an email"}, response.json()
    response = client.post(
        "/one-time-login-token/", json={"email": "mr_wrong_email_domain@example.org", "password": "0th3rP455w0rd"}
    )
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json() == {
        "detail": "You need a recognised Cabinet Office email address to use this service"
    }, response.json()


@utils.with_client
@with_setup(setup_one_time_login, teardown_one_time_login)
def test_post_first_time_login(client):
    tok = EmailSalt.objects.get(email="test_login@example.com").get_one_time_login()
    response = client.post("/first-time-login/", json={"email": "test_login@Example.com", "one_time_token": tok})
    user = User.objects.get(email="test_login@example.com")
    assert response.status_code == status.HTTP_201_CREATED
    assert user


@utils.with_logged_in_client
def test_get_skills(client, user_id):
    user_skill_data = {
        "user": user_id,
        "name": "An existing skill",
        "level": "Proficient",
    }

    user_skill_to_develop = {"user": user_id, "name": "A new and exciting skill"}
    response = client.post("/user-skills/", json=user_skill_data)
    assert response.status_code == status.HTTP_201_CREATED
    response = client.post("/user-skills/", json=user_skill_to_develop)
    assert response.status_code == status.HTTP_201_CREATED
    response = client.get("/skills/")
    data = response.json()
    assert "An existing skill" in data
    assert "A new and exciting skill" in data
    assert "Accessibility" in data


def patch_get_delete_skills(client, endpoint_to_test):
    skills_data = [
        {"name": "Maths", "level": "Competent", "validated": False},
        {"name": "Project management", "level": "Beginner", "validated": False},
        {"name": "Written communication", "level": "Advanced beginner"},
    ]
    response = client.get(endpoint_to_test)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 0
    response = client.patch(endpoint_to_test, json=skills_data)
    assert response.status_code == status.HTTP_200_OK

    response = client.get(endpoint_to_test)
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 3, data
    skill_names = [skill["name"] for skill in data]
    assert "Maths" in skill_names, skill_names
    proj_management = list(filter(lambda skill: skill["name"] == "Project management", data))
    proj_management = proj_management[0]
    assert proj_management["level"] == "Beginner", proj_management
    assert not proj_management["validated"], proj_management

    id_to_delete = proj_management["id"]
    response = client.delete(f"{endpoint_to_test}{id_to_delete}/")
    assert response.status_code == status.HTTP_200_OK, response
    incorrect_id = "9adee5d9-b28f-48d2-92bc-1d5ce47eee65"
    response = client.delete(f"{endpoint_to_test}{incorrect_id}/")
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    response = client.get(endpoint_to_test)
    assert len(response.json()) == 2


def patch_get_delete_languages(client, endpoint_to_test):
    lang_data = [
        {"name": "French", "speaking_level": "Basic", "writing_level": "Proficient"},
        {"name": "Arabic", "speaking_level": "Basic", "writing_level": "Basic"},
        {"name": "Italian", "speaking_level": "Basic", "writing_level": "Basic"},
    ]
    response = client.get(endpoint_to_test)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 0
    response = client.patch(endpoint_to_test, json=lang_data)
    assert response.status_code == status.HTTP_200_OK

    response = client.get(endpoint_to_test)
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 3, data
    lang_names = [lang["name"] for lang in data]
    assert "French" in lang_names, lang_names
    arabic = list(filter(lambda skill: skill["name"] == "Arabic", data))
    arabic = arabic[0]
    assert arabic["speaking_level"] == "Basic", arabic
    assert arabic["writing_level"] == "Basic", arabic

    id_to_delete = arabic["id"]
    response = client.delete(f"{endpoint_to_test}{id_to_delete}/")
    assert response.status_code == status.HTTP_200_OK, response
    incorrect_id = "9adee5d9-b28f-48d2-92bc-1d5ce47eee65"
    response = client.delete(f"{endpoint_to_test}{incorrect_id}/")
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    response = client.get(endpoint_to_test)
    assert len(response.json()) == 2


def patch_get_delete_skills_develop(client, endpoint_to_test):
    skills_data = [
        {"name": "Maths"},
        {"name": "Project management"},
        {"name": "Written communication"},
    ]
    response = client.get(endpoint_to_test)
    assert response.status_code == status.HTTP_200_OK
    assert len(response.json()) == 0
    response = client.patch(endpoint_to_test, json=skills_data)
    assert response.status_code == status.HTTP_200_OK

    response = client.get(endpoint_to_test)
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 3, data
    skill_names = [skill["name"] for skill in data]
    assert "Maths" in skill_names, skill_names

    id_to_delete = data[0]["id"]
    response = client.delete(f"{endpoint_to_test}{id_to_delete}/")
    assert response.status_code == status.HTTP_200_OK, response
    incorrect_id = "9adee5d9-b28f-48d2-92bc-1d5ce47eee65"
    response = client.delete(f"{endpoint_to_test}{incorrect_id}/")
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    response = client.get(endpoint_to_test)
    assert len(response.json()) == 2


@utils.with_logged_in_client
def test_user_get_skills(client, user_id):
    endpoint_to_test = f"/users/{user_id}/skills/"
    response = client.get(endpoint_to_test)
    assert response.status_code == status.HTTP_404_NOT_FOUND


@utils.with_logged_in_client
def test_me_patch_get_delete_skills(client, user_id):
    endpoint_to_test = "/me/skills/"
    patch_get_delete_skills(client, endpoint_to_test)


@utils.with_logged_in_client
def test_user_get_languages(client, user_id):
    endpoint_to_test = f"/users/{user_id}/languages/"
    response = client.get(endpoint_to_test)
    assert response.status_code == status.HTTP_404_NOT_FOUND


@utils.with_logged_in_client
def test_me_patch_get_delete_languages(client, user_id):
    endpoint_to_test = "/me/languages/"
    patch_get_delete_languages(client, endpoint_to_test)


@utils.with_logged_in_client
def test_user_get_skills_develop(client, user_id):
    endpoint_to_test = f"/users/{user_id}/skills-develop/"
    response = client.get(endpoint_to_test)
    assert response.status_code == status.HTTP_404_NOT_FOUND


@utils.with_logged_in_client
def test_me_patch_get_delete_skills_develop(client, user_id):
    endpoint_to_test = "/me/skills-develop/"
    patch_get_delete_skills_develop(client, endpoint_to_test)


@utils.with_logged_in_client
def test_created_modified_at(client, user_id):
    response = client.get("/me/")
    data = response.json()
    created_at = data["created_at"]
    modified_at = data["modified_at"]
    more_user_data = {
        "grade": "Grade 7",
        "skills": [{"name": "Python", "level": "Beginner"}],
        "languages": [{"name": "Spanish", "speaking_level": "Proficient", "writing_level": "Basic"}],
        "skills_to_develop": [{"name": "Maths"}],
        "is_mentor": "Yes",
        "is_line_manager": "I don't know",
    }
    response = client.patch("/me/", json=more_user_data)
    data = response.json()
    assert created_at == data["created_at"], "date object created shouldn't change"
    assert data["modified_at"] >= modified_at, f'{data["modified_at"]} {modified_at}'
    assert data["is_mentor"] == "Yes", data["is_mentor"]
    assert data["is_line_manager"] == "I don't know", data["is_line_manager"]

    skill = data["skills"][0]
    skill_id = skill["id"]
    response = client.get(f"/user-skills/{skill_id}/")
    skill_created_at = response.json()["created_at"]
    skill_modified_at = response.json()["modified_at"]
    future_date = "2052-08-16T10:43:56.897248Z"
    response = client.patch(
        f"/user-skills/{skill_id}/",
        json={"level": "Advanced beginner", "created_at": future_date, "modified_at": future_date},
    )
    data = response.json()
    assert skill_created_at == data["created_at"], "created_at date should not change"
    assert skill_modified_at != data["modified_at"], "modified_date should have been updated"
    assert skill_modified_at != future_date, "should not be possible to set modified date manually"


@utils.with_logged_in_client
def test_email_field(client, user_id):
    user_data = client.get("/me/").json()
    email = user_data["email"]

    direct_reports_before = client.get("/me/direct-reports/").json()
    assert len(direct_reports_before) == 0

    for i in range(3):
        User.objects.create_user(f"user{i}@example.com", "P455w0rd", line_manager_email=email)

    direct_reports_after = client.get("/me/direct-reports/").json()
    assert len(direct_reports_after) == 3


@utils.with_logged_in_client
def test_has_direct_reports(client, user_id):
    user_data = client.get("/me/").json()
    email = user_data["email"]
    User.objects.create_user("peter.rabbit@example.com", "P455w0rd", line_manager_email=email)
    assert user_data["has_direct_reports"] is True, user_data
    User.objects.filter(line_manager_email=email).delete()
    user_data = client.get("/me/").json()
    assert user_data["has_direct_reports"] is False, user_data


@utils.with_logged_in_client
def test_user_skills_other_user(client, user_id):
    response = client.get("/user-skills/")
    data = response.json()
    different_users_skill = [data[k] for k in data if data[k] == "Cake making"]
    assert len(different_users_skill) == 0, "Should only see skills for logged in user"


@utils.with_logged_in_client
def test_user_languages_other_user(client, user_id):
    response = client.get("/user-languages/")
    data = response.json()
    different_users_skill = [data[k] for k in data if data[k] == "Dutch"]
    assert len(different_users_skill) == 0, "Should only see languages for logged in user"


@utils.with_logged_in_client
def test_user_skills_develop_other_user(client, user_id):
    response = client.get("/user-skills-develop/")
    data = response.json()
    different_users_skill = [data[k] for k in data if data[k] == "Biscuit making"]
    assert len(different_users_skill) == 0, "Should only see skills to develop for logged in user"


@utils.with_logged_in_client
def test_all_user_skills_not_admin(client, user_id):
    response = client.get("/all-user-skills/")
    assert response.status_code == status.HTTP_403_FORBIDDEN


@utils.with_logged_in_client
def test_all_user_languages_not_admin(client, user_id):
    response = client.get("/all-user-languages/")
    assert response.status_code == status.HTTP_403_FORBIDDEN


@utils.with_logged_in_client
def test_all_user_skills_develop_not_admin(client, user_id):
    response = client.get("/all-user-skills-develop/")
    assert response.status_code == status.HTTP_403_FORBIDDEN


@utils.with_logged_in_client
def test_all_user_skills(client, user_id):
    user = User.objects.get(id=user_id)
    user.is_staff = True
    user.save()
    response = client.get("/all-user-skills/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    cake_making = [skill["name"] for skill in data if skill["name"] == "Cake making"]
    assert len(cake_making) == 1, cake_making


@utils.with_logged_in_client
def test_all_user_languages(client, user_id):
    user = User.objects.get(id=user_id)
    user.is_staff = True
    user.save()
    response = client.get("/all-user-languages/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    dutch = [lang["name"] for lang in data if lang["name"] == "Dutch"]
    assert len(dutch) == 1, "Expected languages for another user"


@utils.with_logged_in_client
def test_all_user_skills_to_develop(client, user_id):
    user = User.objects.get(id=user_id)
    user.is_staff = True
    user.save()
    response = client.get("/all-user-skills-develop/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    biscuit_making = [lang["name"] for lang in data if lang["name"] == "Biscuit making"]
    assert len(biscuit_making) == 1, "Expected skills to develop for another user"


@utils.with_client
def test_endpoints_require_login(client):
    endpoints = [
        "/create-error/",
        "/me/",
        "/me/direct-reports/",
        "/me/languages/",
        "/me/skills/",
        "/me/skills-develop/",
        "/me/skills-suggested/",
        "/user-languages/",
        "/user-skills/",
        "/user-skills-develop/",
    ]
    for endpoint in endpoints:
        response = client.get(endpoint)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED, response.status_code


@utils.with_logged_in_client
def test_me_skills_suggested(client, user_id):
    response = client.get("/me/skills-suggested/")
    assert response.status_code == status.HTTP_200_OK, response.status_code
    data = response.json()
    assert "Programming and build (software engineering)" in data, data
    response = client.patch("/me/", json={"job_title": "Made up title"})
    response = client.get("/me/skills-suggested/")
    assert response.status_code == status.HTTP_200_OK, response.status_code
    assert response.json() == [], response.json()
