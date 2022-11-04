from nose.tools import with_setup
from rest_framework import status
from tests import utils

from ellandi.registration.models import (
    User,
    UserLanguage,
    UserSkill,
    UserSkillDevelop,
)
from ellandi.reporting import LANGUAGE_LEVELS_SKILLED, SKILL_LEVELS

SKILLS_ENDPOINT = "/api/me/reports/skills/"
LANGUAGES_ENDPOINT = "/api/me/reports/languages/"


def add_skills(user, i):
    remainder = i % 5
    skill = UserSkill(user=user, name="Economics", level=SKILL_LEVELS[remainder])
    skill.save()
    if i < 7:
        skill = UserSkill(user=user, name="AWS", level="Beginner")
        skill.save()
    else:
        skill_dev = UserSkillDevelop(user=user, name="AWS")
        skill_dev.save()
    skill = UserSkill(user=user, name="Stakeholder management", level="Proficient")
    skill.save()
    skill_dev = UserSkillDevelop(user=user, name="Writing")
    skill_dev.save()


def add_languages(user, i):
    if i < 7:
        lang = UserLanguage(
            user=user,
            name="French",
            speaking_level=LANGUAGE_LEVELS_SKILLED[i % 4],
            writing_level=LANGUAGE_LEVELS_SKILLED[(i + 1) % 4],
        )
        lang.save()
    if i < 4:
        lang = UserLanguage(
            user=user, name="Spanish", speaking_level=LANGUAGE_LEVELS_SKILLED[i % 4], writing_level="None"
        )
        lang.save()
    if i < 8:
        lang = UserLanguage(
            user=user,
            name="German",
            speaking_level=LANGUAGE_LEVELS_SKILLED[(i + 2) % 4],
            writing_level=LANGUAGE_LEVELS_SKILLED[i % 4],
        )
        lang.save()


def add_professions(user, i):
    if i % 2 == 0:
        user.professions = ["Policy", "Economics"]
    else:
        user.professions = ["Economics"]
    if i > 8:
        user.professions = ["Operational research"]
    user.save()


def setup_users_skills():
    for i in range(0, 10):
        email = f"test{i}@example.com"
        user = User(email=email, password="P455w0rd", business_unit="i.AI")
        if i <= 5:
            user.function = "Analysis"
        else:
            user.function = "Digital"
        if i % 2 == 0:
            user.grade = "Grade 7"
        else:
            user.grade = "Grade 6"
        if i % 3 == 0:
            user.is_line_manager = "Yes"
        if i % 4 == 0:
            user.is_mentor = "Yes"
        user.save()
        add_skills(user, i)
        add_professions(user, i)
        add_languages(user, i)


def teardown_users_skills():
    for i in range(0, 10):
        email = f"test{i}@example.com"
        User.objects.get(email=email).delete()


@utils.with_logged_in_admin_client
def test_get_report_skills(client, user_id):
    response = client.get(SKILLS_ENDPOINT)
    assert response.status_code == status.HTTP_200_OK


@utils.with_logged_in_admin_client
@with_setup(setup_users_skills, teardown_users_skills)
def test_get_report_skills_query(client, user_id):
    endpoint = f"{SKILLS_ENDPOINT}?skills=Economics,AWS,Zoology&functions=Analysis,Digital"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 3
    data = result["data"]
    econ_data = [d for d in data if d["name"] == "Economics"][0]
    assert econ_data["total_users"] == 10, econ_data
    assert econ_data["skill_value_percentage"] == 100
    assert econ_data["skill_develop_value_total"] == 0
    assert econ_data["advanced_beginner_value_total"] == 2
    assert econ_data["competent_value_percentage"] == 20
    assert econ_data["proficient_label"] == "2 (20%)", econ_data["proficient_label"]
    aws_data = [d for d in data if d["name"] == "AWS"][0]
    assert aws_data["name"] == "AWS"
    assert aws_data["skill_label"] == "7 (70%)"
    assert aws_data["skill_develop_value_total"] == 3
    assert aws_data["beginner_value_total"] == 7
    assert aws_data["expert_value_percentage"] == 0
    zoo_data = [d for d in data if d["name"] == "Zoology"][0]
    assert zoo_data["total_users"] == 10
    assert zoo_data["skill_value_percentage"] == 0
    assert zoo_data["skill_develop_value_total"] == 0
    assert zoo_data["beginner_value_total"] == 0


@utils.with_logged_in_admin_client
@with_setup(setup_users_skills, teardown_users_skills)
def test_get_report_skills_users(client, user_id):
    endpoint = f"{SKILLS_ENDPOINT}?skills=Science,Maths,Writing,AWS&users=all"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 4
    endpoint = f"{SKILLS_ENDPOINT}?skills=Science,Maths,Writing,AWS&users=mentors&business_units=i.AI"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 4
    assert result["data"][0]["total_users"] == 3
    endpoint = f"{SKILLS_ENDPOINT}?skills=Science,Maths,Writing,AWS&users=line_managers"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 4
    assert result["data"][0]["total_users"] == 4
    endpoint = f"{SKILLS_ENDPOINT}?skills=AWS&functions=Analysis,Digital"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 1
    data0 = result["data"][0]
    assert data0["total_users"] == 10
    assert data0["beginner_value_total"] == 7
    assert data0["competent_value_total"] == 0
    assert data0["skill_develop_value_total"] == 3
    endpoint = f"{SKILLS_ENDPOINT}?skills=Science&functions=Digital&users=mentors"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 1
    assert result["data"][0]["total_users"] == 1, result["data"]


@utils.with_logged_in_admin_client
@with_setup(setup_users_skills, teardown_users_skills)
def test_get_report_skills_business_unit(client, user_id):
    endpoint = f"{SKILLS_ENDPOINT}?skills=Economics,Science&business_units=i.AI"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 2
    assert len(result["data"]) == 2
    assert result["data"][0]["total_users"] == 10
    assert result["data"][1]["total_users"] == 10
    endpoint = f"{SKILLS_ENDPOINT}?functions=Analysis&grades=Grade%206&business_units=i.AI,CDIO"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] > 3
    data = result["data"]
    assert data[0]["total_users"] == 3


# FIXME - this test doesn't work is cos SQLite doesn't have `contained_by`
@utils.with_logged_in_admin_client
@with_setup(setup_users_skills, teardown_users_skills)
def test_get_report_skills_professions(client, user_id):
    endpoint = f"{SKILLS_ENDPOINT}?skills=Economics,AWS&business_units=i.AI&professions=Economics"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    data = result["data"]
    assert result["total"] == 2
    assert data[0]["total_users"] == 8, data[0]
    econ_data = [d for d in data if d["name"] == "Economics"][0]
    aws_data = [d for d in data if d["name"] == "AWS"][0]
    assert econ_data["skill_value_percentage"] == 100
    assert econ_data["beginner_value_total"] == 2
    assert econ_data["expert_value_percentage"] == 12
    assert aws_data["skill_value_percentage"] == 70
    assert aws_data["skill_develop_value_total"] == 3
    endpoint = f"{SKILLS_ENDPOINT}?skills=Economics,AWS,Science&functions=Analysis&professions=Economics,Policy"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    data = result["data"]
    assert result["total"] == 3
    assert data[0]["total_users"] == 6


@utils.with_logged_in_admin_client
@with_setup(setup_users_skills, teardown_users_skills)
def test_get_report_skills_grades(client, user_id):
    endpoint = f"{SKILLS_ENDPOINT}?skills=Science,Maths,Writing,AWS&grades=Grade%206,Grade%207&business_units=i.AI"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 4
    assert result["data"][0]["total_users"] == 10


# FIXME - will work once we add reporting permissions
@utils.with_logged_in_client
def test_endpoints_require_login(client, user_id):
    endpoints = [SKILLS_ENDPOINT, LANGUAGES_ENDPOINT]
    for endpoint in endpoints:
        response = client.get(endpoint)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED, response.status_code


@utils.with_logged_in_admin_client
def test_skills_format(client, user_id):
    endpoint = f"{SKILLS_ENDPOINT}?format=csv"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    endpoint = f"{SKILLS_ENDPOINT}?format=json"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK


@utils.with_logged_in_admin_client
@with_setup(setup_users_skills, teardown_users_skills)
def test_languages_format(client, user_id):
    endpoint = f"{LANGUAGES_ENDPOINT}?type=writing&format=csv"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    endpoint = f"{LANGUAGES_ENDPOINT}?type=speaking&format=json"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    assert response.json()


@utils.with_logged_in_admin_client
@with_setup(setup_users_skills, teardown_users_skills)
def test_languages_endpoint(client, user_id):
    endpoint = f"{LANGUAGES_ENDPOINT}"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    endpoint = f"{LANGUAGES_ENDPOINT}?type=writing"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 2
    assert result["data"][0]["total_users"] >= 10
    endpoint = f"{LANGUAGES_ENDPOINT}?type=writing&languages=French,Spanish,German,Portuguese&business_units=i.AI"
    response = client.get(endpoint)
    result = response.json()
    data = result["data"]
    assert result["total"] == 4
    french_data = [d for d in data if d["name"] == "French"][0]
    spanish_data = [d for d in data if d["name"] == "Spanish"][0]
    portuguese_data = [d for d in data if d["name"] == "Portuguese"][0]
    assert french_data["total_users"] == 10
    assert french_data["language_value_total"] == 7
    assert french_data["basic_value_percentage"] == 14
    assert french_data["native_value_total"] == 2
    assert spanish_data["total_users"] == 10
    assert spanish_data["language_value_total"] == 0
    assert spanish_data["proficient_value_percentage"] == 0
    assert portuguese_data["language_value_total"] == 0
