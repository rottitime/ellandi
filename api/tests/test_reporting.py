from tests import utils
from rest_framework import status
from nose.tools import with_setup

from ellandi.registration.models import User, UserSkill, UserLanguage, UserSkillDevelop, Profession

SKILLS_ENDPOINT = "/api/me/reports/skills/"


def add_skills(user, i):
    skill_levels = ["Beginner", "Advanced beginner", "Competent", "Proficient", "Expert"]
    remainder = i % 5
    skill = UserSkill(user=user, name="Economics", level=skill_levels[remainder])
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


def add_professions(user, i):
    if i % 2 == 0:
        user.professions = ["Policy", "Economics"]
    else:
        user.professions = ["Policy"]
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
            user.is_line_manager == "Yes"
        if i % 4 == 0:
            user.is_mentor == "Yes"
        user.save()
        add_skills(user, i)
        add_professions(user, i)


def teardown_users_skills():
    for i in range(0, 10):
        email = f"test{i}@example.com"
        User.objects.get(email=email).delete()


@utils.with_logged_in_client
@with_setup(setup_users_skills, teardown_users_skills)
def test_get_report_skills(client, user_id):
    response = client.get(SKILLS_ENDPOINT)
    assert response.status_code == status.HTTP_200_OK


@utils.with_logged_in_client
@with_setup(setup_users_skills, teardown_users_skills)
def test_get_report_skills_query(client, user_id):
    print(User.objects.all().values("function"))
    endpoint = f"{SKILLS_ENDPOINT}?skills=Economics,AWS,Zoology&functions=Analysis,Digital"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 3
    data = result["data"]
    econ_data = [d for d in data if d["name"] == "Economics"][0]
    assert econ_data["total_users"] == 10, econ_data
    assert econ_data["skill_value_percentage"] == 100
    assert econ_data["skills_develop_value_total"] == 0
    assert econ_data["advanced_beginner_value_total"] == 2
    assert econ_data["competent_value_percentage"] == 20
    assert econ_data["proficient_label"] == "2 (20%)", econ_data["proficient_label"]
    aws_data = [d for d in data if d["name"] == "AWS"][0]
    assert aws_data["name"] == "AWS"
    assert aws_data["skill_label"] == "7 (70%)"
    assert aws_data["skills_develop_value_total"] == 3
    assert aws_data["beginner_value_total"] == 7
    assert aws_data["expert_value_percentage"] == 0
    zoo_data = [d for d in data if d["name"] == "Zoology"][0]
    assert zoo_data["total_users"] == 10
    assert zoo_data["skill_value_percentage"] == 0
    assert zoo_data["skills_develop_value_total"] == 0
    assert zoo_data["beginner_value_total"] == 0


# TODO - add more checks here
@utils.with_logged_in_client
@with_setup(setup_users_skills, teardown_users_skills)
def test_get_report_skills_users(client, user_id):
    endpoint = f"{SKILLS_ENDPOINT}?skills=Science,Maths,Writing,AWS&users=all"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 4
    endpoint = f"{SKILLS_ENDPOINT}?skills=Science,Maths,Writing,AWS&users=mentors"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()

    endpoint = f"{SKILLS_ENDPOINT}?skills=Science,Maths,Writing,AWS&users=line_managers"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()

    endpoint = f"{SKILLS_ENDPOINT}?skills=Writing&function=Analysis,Digital"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()

    endpoint = f"{SKILLS_ENDPOINT}?skills=Science&function=Digital"

    endpoint = f"{SKILLS_ENDPOINT}?skills=Science&function=Digital?users=mentors"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 1


@utils.with_logged_in_client
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
    endpoint = f"{SKILLS_ENDPOINT}?functions=Analysis&grades=Grade%206&business_units=i.AI"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] > 5
    data = result["data"]
    assert data[0]["total_users"] == 3, result


# TODO - finish testing all query params

# @utils.with_logged_in_client
# @with_setup(setup_users_skills, teardown_users_skills)
# def test_get_report_skills_professions(client, user_id):


# @utils.with_logged_in_client
# @with_setup(setup_users_skills, teardown_users_skills)
# def test_get_report_skills_grades(client, user_id):
