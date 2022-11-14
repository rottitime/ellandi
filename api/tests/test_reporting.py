import datetime

from nose.tools import with_setup
from rest_framework import status
from tests import utils

from ellandi.registration.models import (
    Learning,
    User,
    UserLanguage,
    UserSkill,
    UserSkillDevelop,
)
from ellandi.reporting import (
    LANGUAGE_LEVELS_SKILLED,
    SKILL_LEVELS,
    create_proportions_data_dict,
    format_perc_label,
)

SKILLS_ENDPOINT = "/api/me/reports/skills/"
LANGUAGES_ENDPOINT = "/api/me/reports/languages/"
RESPONSIBILITIES_ENDPOINT = "/api/me/reports/responsibilities/"
GRADES_ENDPOINT = "/api/me/reports/grades/"
STAFF_OVERVIEW_ENDPOINT = "/api/me/reports/staff-overview/"
LEARNING_ENDPOINT = "/api/me/reports/learning/"


def add_skills(user, i):
    remainder = i % 5
    skill = UserSkill(user=user, name="Economics", level=SKILL_LEVELS[remainder])
    skill.save()
    if i < 7:
        skill = UserSkill(user=user, name="Complex, hard, technical skill", level="Beginner")
        skill.save()
    else:
        skill_dev = UserSkillDevelop(user=user, name="Complex, hard, technical skill")
        skill_dev.save()
    skill = UserSkill(user=user, name="Stakeholder management", level="Proficient")
    skill.save()
    skill_dev = UserSkillDevelop(user=user, name="Writing")
    skill_dev.save()


def add_languages(user, i):
    if i < 7:
        lang = UserLanguage(
            user=user,
            name="French, with, commas",
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
        user.professions = ["Digital, Data and Technology", "Economics"]
    else:
        user.primary_profession = "Economics"
    if i > 8:
        user.primary_profession = "Operational research"
    user.save()


def add_learning(user, i):
    today = datetime.date.today()
    year_ago = today - datetime.timedelta(weeks=52)
    if i % 2 == 0:
        Learning(
            user=user,
            name="hour long formal learning",
            learning_type="Formal",
            duration_minutes=600,
            date_completed=today,
            cost_pounds=100,
        ).save()
    elif i < 8:
        Learning(
            user=user,
            name="short formal learning",
            learning_type="Formal",
            duration_minutes=200,
            date_completed=today,
            cost_pounds=200,
        ).save()
        Learning(
            user=user,
            name="unknown learning",
            learning_type="Formal",
            duration_minutes=555,
            date_completed=today,
            cost_unknown=True,
        ).save()
        Learning(
            user=user,
            name="last year's learning",
            learning_type="Formal",
            duration_minutes=100,
            date_completed=year_ago,
        ).save()
    if i < 5:
        Learning(
            user=user, name="fun learning", learning_type="Social", duration_minutes=3000, date_completed=today
        ).save()
    if i < 7:
        Learning(
            user=user, name="at work", learning_type="On the job", duration_minutes=100, date_completed=today
        ).save()


def setup_users():
    for i in range(0, 10):
        email = f"test{i}@example.com"
        user = User(email=email, password="P455w0rd", business_unit="Incubator for Innovation and Automation")
        if i < 6:
            user.function = "Analysis"
        else:
            user.function = "Digital"
        if i % 2 == 0:
            user.grade = "Grade 7 Equivalent"
        else:
            user.grade = "Grade 6 Equivalent"
        if i % 3 == 0:
            user.is_line_manager = "Yes"
        if i % 4 == 0:
            user.is_mentor = "Yes"
        user.save()
        add_skills(user, i)
        add_professions(user, i)
        add_languages(user, i)
        add_learning(user, i)


def teardown_users():
    for i in range(0, 10):
        email = f"test{i}@example.com"
        User.objects.get(email=email).delete()


def test_formate_perc_label():
    assert format_perc_label(56, 98.55) == "56 (99%)"


def test_create_proportions_data_dict():
    name = "Test me"
    numerator = 47
    denominator = 88
    actual = create_proportions_data_dict(name, numerator, denominator)
    expected = {"name": "Test me", "total_label": "47 (53%)", "total_value_total": 47, "total_value_percentage": 53}
    assert actual == expected


@utils.with_logged_in_admin_client
def test_get_report_skills(client, user_id):
    response = client.get(SKILLS_ENDPOINT)
    assert response.status_code == status.HTTP_200_OK


@utils.with_logged_in_admin_client
@with_setup(setup_users, teardown_users)
def test_get_report_skills_query(client, user_id):
    endpoint = f"{SKILLS_ENDPOINT}?skills=Economics|Complex, hard, technical skill|Zoology&functions=Analysis|Digital"
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
    aws_data = [d for d in data if d["name"] == "Complex, hard, technical skill"][0]
    assert aws_data["name"] == "Complex, hard, technical skill"
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
@with_setup(setup_users, teardown_users)
def test_get_report_skills_users(client, user_id):
    endpoint = f"{SKILLS_ENDPOINT}?skills=Science|Maths|Writing|Complex, hard, technical skill&users=all"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 4
    params = "?skills=Science|Maths|Writing|Complex, hard, technical skill&users=mentors&business_units=Incubator for Innovation and Automation"
    endpoint = f"{SKILLS_ENDPOINT}{params}"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 4
    assert result["data"][0]["total_users"] == 3
    endpoint = f"{SKILLS_ENDPOINT}?skills=Science|Maths|Writing|Complex, hard, technical skill&users=line_managers"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 4
    assert result["data"][0]["total_users"] == 4
    endpoint = f"{SKILLS_ENDPOINT}?skills=Complex, hard, technical skill&functions=Analysis|Digital"
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
@with_setup(setup_users, teardown_users)
def test_get_report_skills_business_unit(client, user_id):
    endpoint = f"{SKILLS_ENDPOINT}?skills=Economics|Science&business_units=Incubator for Innovation and Automation"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 2
    assert len(result["data"]) == 2
    assert result["data"][0]["total_users"] == 10
    assert result["data"][1]["total_users"] == 10
    params = (
        "?functions=Analysis&grades=Grade%206%20Equivalent&business_units=Incubator for Innovation and Automation|CDIO"
    )
    endpoint = f"{SKILLS_ENDPOINT}{params}"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] > 3
    data = result["data"]
    assert data[0]["total_users"] == 3


@utils.with_logged_in_admin_client
@with_setup(setup_users, teardown_users)
def test_get_report_skills_professions(client, user_id):
    params = "?skills=Economics|Complex, hard, technical skill&business_units=Incubator for Innovation and Automation&professions=Economics"
    endpoint = f"{SKILLS_ENDPOINT}{params}"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    data = result["data"]
    assert result["total"] == 2
    assert data[0]["total_users"] == 9, data[0]
    econ_data = [d for d in data if d["name"] == "Economics"][0]
    aws_data = [d for d in data if d["name"] == "Complex, hard, technical skill"][0]
    assert econ_data["skill_value_percentage"] == 100
    assert econ_data["beginner_value_total"] == 2
    assert econ_data["expert_value_percentage"] == 11
    assert aws_data["skill_value_percentage"] == 78, aws_data
    assert aws_data["skill_develop_value_total"] == 2
    endpoint = f"{SKILLS_ENDPOINT}?skills=Economics|Complex, hard, technical skill|Science&functions=Analysis&professions=Economics|Digital, Data and Technology"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    data = result["data"]
    assert result["total"] == 3
    assert data[0]["total_users"] == 6


@utils.with_logged_in_admin_client
@with_setup(setup_users, teardown_users)
def test_get_report_skills_grades(client, user_id):
    params = "?skills=Science|Maths|Writing|Complex, hard, technical skill&grades=Grade%206%20Equivalent|Grade%207%20Equivalent&business_units=Incubator for Innovation and Automation"
    endpoint = f"{SKILLS_ENDPOINT}{params}"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 4
    assert result["data"][0]["total_users"] == 10


@utils.with_logged_in_client
def test_endpoints_require_login(client, user_id):
    endpoints = [
        SKILLS_ENDPOINT,
        LANGUAGES_ENDPOINT,
        RESPONSIBILITIES_ENDPOINT,
        GRADES_ENDPOINT,
        STAFF_OVERVIEW_ENDPOINT,
        LEARNING_ENDPOINT,
    ]
    for endpoint in endpoints:
        response = client.get(endpoint)
        assert response.status_code == status.HTTP_403_FORBIDDEN


@utils.with_logged_in_admin_client
def test_skills_format(client, user_id):
    endpoint = f"{SKILLS_ENDPOINT}?format=csv"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    endpoint = f"{SKILLS_ENDPOINT}?format=json"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK


@utils.with_logged_in_admin_client
@with_setup(setup_users, teardown_users)
def test_languages_format(client, user_id):
    endpoint = f"{LANGUAGES_ENDPOINT}?type=writing&format=csv"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    endpoint = f"{LANGUAGES_ENDPOINT}?type=speaking&format=json"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    assert response.json()


@utils.with_logged_in_admin_client
@with_setup(setup_users, teardown_users)
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
    params = "?type=writing&languages=French, with, commas|Spanish|German|Portuguese&business_units=Incubator for Innovation and Automation"
    endpoint = f"{LANGUAGES_ENDPOINT}{params}"
    response = client.get(endpoint)
    result = response.json()
    data = result["data"]
    assert result["total"] == 4
    french_data = [d for d in data if d["name"] == "French, with, commas"][0]
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


@utils.with_logged_in_admin_client
@with_setup(setup_users, teardown_users)
def test_languages_endpoint_params(client, user_id):
    endpoint = (
        f"{LANGUAGES_ENDPOINT}?type=speaking&functions=Analysis&business_units=Incubator for Innovation and Automation"
    )
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] >= 3
    assert result["data"][0]["total_users"] == 6
    params = "?type=speaking&business_units=Incubator for Innovation and Automation&users=line_managers&languages=French|Spanish|German"
    endpoint = f"{LANGUAGES_ENDPOINT}{params}"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()
    assert result["total"] == 3
    assert result["data"][0]["total_users"] == 4, result["data"]


@utils.with_logged_in_admin_client
@with_setup(setup_users, teardown_users)
def test_get_responsibilities(client, user_id):
    response = client.get(RESPONSIBILITIES_ENDPOINT)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()["data"]
    assert len(result) == 3, result
    line_manager_data = [data for data in result if data["name"] == "Line managers"][0]
    mentor_data = [data for data in result if data["name"] == "Mentors"][0]
    assert line_manager_data["total_label"] == "4 (36%)"
    assert line_manager_data["total_value_total"] == 4
    assert mentor_data["total_value_percentage"] == 27
    response = client.get(f"{RESPONSIBILITIES_ENDPOINT}?format=csv")
    assert response.status_code == status.HTTP_200_OK


@utils.with_logged_in_admin_client
@with_setup(setup_users, teardown_users)
def test_get_grades(client, user_id):
    response = client.get(GRADES_ENDPOINT)
    assert response.status_code == status.HTTP_200_OK
    result = response.json()["data"]
    grade_7_data = [data for data in result if data["name"] == "Grade 7 Equivalent"][0]
    grade_6_data = [data for data in result if data["name"] == "Grade 6 Equivalent"][0]
    other_data = [data for data in result if data["name"] == "Other"][0]
    assert grade_7_data["total_label"] == "5 (45%)"
    assert grade_7_data["total_value_percentage"] == 45
    assert grade_6_data["total_value_total"] == 5
    assert other_data["total_label"] == "0 (0%)"
    response = client.get(f"{GRADES_ENDPOINT}?format=csv")
    assert response.status_code == status.HTTP_200_OK


@utils.with_logged_in_admin_client
@with_setup(setup_users, teardown_users)
def test_get_staff_overview(client, user_id):
    response = client.get(STAFF_OVERVIEW_ENDPOINT)
    assert response.status_code == status.HTTP_200_OK


@utils.with_logged_in_admin_client
def test_get_learning(client, user_id):
    response = client.get(LEARNING_ENDPOINT)
    assert response.status_code == status.HTTP_200_OK
    response = client.get(f"{LEARNING_ENDPOINT}?format=csv")
    assert response.status_code == status.HTTP_200_OK
    endpoint = f"{LEARNING_ENDPOINT}?business_units=CDIO&users=mentors&functions=Finance|Commercial|Digital"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK
    endpoint = f"{LEARNING_ENDPOINT}?functions=Analysis&grades=Grade%206%20Equivalent&business_units=Incubator for Innovation and Automation|CDIO"
    response = client.get(endpoint)
    assert response.status_code == status.HTTP_200_OK


@utils.with_logged_in_admin_client
@with_setup(setup_users, teardown_users)
def test_get_learning_params(client, user_id):
    endpoint = f"{LEARNING_ENDPOINT}?business_units=Incubator for Innovation and Automation|CDIO&users=all"
    response = client.get(endpoint)
    actual_result = response.json()
    expected_result = {
        "course_average_cost_label": "£144",
        "course_total_cost_label": "£1,300",
        "course_average_cost_value": 144,
        "course_total_cost_value": 1300,
        "goal_value_days": 5,
        "goal_value_percentage": 49,
        "distribution": [
            {"name": "Formal", "value_percentage": 28},
            {"name": "Social", "value_percentage": 69},
            {"name": "On the job", "value_percentage": 3},
        ],
    }
    assert actual_result == expected_result, actual_result


@utils.with_logged_in_admin_client
@with_setup(setup_users, teardown_users)
def test_get_learning_user_types(client, user_id):
    endpoint = f"{LEARNING_ENDPOINT}?users=mentors&functions=Analysis|Digital|Commercial"
    response = client.get(endpoint)
    result = response.json()
    assert result["course_average_cost_label"] == "£100", result
    assert result["course_total_cost_label"] == "£300", result
    endpoint = f"{LEARNING_ENDPOINT}?users=line_managers&grades=Grade%206%20Equivalent"
    response = client.get(endpoint)
    result = response.json()
    result["goal_value_days"] == 9, result


@utils.with_logged_in_admin_client
@with_setup(setup_users, teardown_users)
def test_get_learning_professions(client, user_id):
    params = "?users=all&business_units=Incubator for Innovation and Automation|ADD&professions=Operational%20research|Social%20research|Digital, Data and Technology"  # noqa
    endpoint = f"{LEARNING_ENDPOINT}{params}"
    response = client.get(endpoint)
    result = response.json()
    assert result["course_total_cost_label"] == "£500", result
    assert result["goal_value_days"] == 5, result
    params = "?users=all&business_units=Incubator for Innovation and Automation|Made, up, team, with, commas&professions=Operational%20research"  # noqa
    endpoint = f"{LEARNING_ENDPOINT}{params}"
    response = client.get(endpoint)
    result = response.json()
    assert result["course_average_cost_label"] == "£0", result
