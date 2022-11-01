from tests import utils
from rest_framework import status
from nose.tools import with_setup

from ellandi.registration.models import User, UserSkill, UserLanguage, UserSkillDevelop

SKILLS_ENDPOINT = "/api/me/reports/skills/"

def add_skills(user, i):
    skill_levels = ["Beginner", "Advanced beginner", "Competent", "Proficient", "Expert"]
    UserSkill(user=user, name="Science", level=skill_levels[i % 5]).save()
    if i < 7:
        UserSkill(user=user, name="AWS", level="Beginner").save()
    else:
        UserSkillDevelop(user=user, name="AWS").save()
    UserSkill(user=user, name="Maths", level="Proficient").save()
    UserSkillDevelop(user=user, name="Writing").save()

# TODO - add professions


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
        # TODO - add line manager and mentor flags


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
    endpoint = f"{SKILLS_ENDPOINT}?skills=Science?format=json"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    print(response.text)
    result = response.json()
    assert result["total"] == 3
    # data = result["data"]
    # zoo_data = data[2]
    # assert zoo_data["total_users"] == 10
    # assert zoo_data["skill_value_percentage"] == 0
    # assert zoo_data["skills_develop_value_total"] == 0
    # assert zoo_data["beginner_value_total"] == 0
    # science_data = data[0]
    # assert science_data["skill_value_percentage"] == 100
    # assert science_data["skills_develop_value_total"] == 0
    # assert science_data["beginner_value_percentage"] == 20
    # assert science_data["advanced_beginner_value_total"] == 2
    # assert science_data["competent_value_percentage"] == 20
    # assert science_data["proficient_value_label"] == "2 (20%)"
    # assert science_data["advanced_value_total"] == 2
    # aws_data = data[1]
    # assert aws_data["name"] == "AWS"
    # assert aws_data["skill_label"] == "7 (70%)"
    # assert aws_data["skills_develop_value_total"] == 3
    # assert aws_data["beginner_value_total"] == 7
    # assert aws_data["expert_value_percentage"] == 0


# @utils.with_logged_in_client
# @with_setup(setup_users_skills, teardown_users_skills)
# def test_get_report_skills_functions(client, user_id):
#     endpoint = f"{SKILLS_ENDPOINT}?skills=Science,Maths,Writing,AWS?users=all"

#     endpoint = f"{SKILLS_ENDPOINT}?skills=Science,Maths,Writing,AWS?users=mentors"

#     endpoint = f"{SKILLS_ENDPOINT}?skills=Science,Maths,Writing,AWS?users=line_managers"

#     endpoint = f"{SKILLS_ENDPOINT}?skills=Writing?function=Analysis,Digital"

#     endpoint = f"{SKILLS_ENDPOINT}?skills=Science?function=Digital"

#     endpoint = f"{SKILLS_ENDPOINT}?skills=Science?function=Digital?users=mentors"

#     endpoint = f"{SKILLS_ENDPOINT}?skills=Writing?function=Analysis?"

