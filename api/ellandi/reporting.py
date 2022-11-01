from drf_spectacular.utils import extend_schema
from rest_framework import decorators, permissions, status
from rest_framework.response import Response

from ellandi.registration.models import (
    Profession,
    User,
    UserSkill,
    UserSkillDevelop,
)


def get_filtered_users(request):
    users_qs = User.objects.all()
    user_type = request.query_params.get("users")
    assert user_type in ["all", "line_managers", "mentors", None]
    if user_type == "line_managers":
        users_qs = users_qs.filter(is_line_manager="Yes")
    elif user_type == "mentors":
        users_qs = users_qs.filter(is_mentor="Yes")

    functions = request.query_params.get("functions")
    grades = request.query_params.get("grades")
    business_units = request.query_params.get("business_units")
    if functions:
        functions = functions.strip(",")
        users_qs = users_qs.filter(function__in=functions)
    if grades:
        grades = grades.strip(",")
        users_qs = users_qs.filter(grade__in=grades)
    if business_units:
        business_units = business_units.strip(",")
        users_qs = users_qs.filter(business_unit__in=business_units)
    # Professions handled differently as a many-to-many field
    professions = request.query_params.get("professions")
    if professions:
        professions = professions.strip(",")
        professions_objs = []
        for profession in professions:
            try:
                profession_obj = Profession.objects.get(name=profession)
                professions_objs.append[profession_obj]
            except:  # TODO - find the right exception
                pass
                # error!
    return users_qs


def format_perc_label(number, percentage):
    return f"{number} ({round(percentage, 0)}%)"


def get_skill_data_for_users(users, user_skills, user_skills_develop, skill_name):
    # TODO - can we clean this function up?
    total_users = users.count()
    user_skills_particular = user_skills.filter(name=skill_name)
    user_skills_dev_particular = user_skills_develop.filter(name=skill_name)

    number_with_skill = user_skills_particular.count()
    number_wanting_to_develop = user_skills_dev_particular.count()
    number_beginners = user_skills_particular.filter(level="Beginner").count()
    number_adv_beginners = user_skills_particular.filter(level="Advanced beginner").count()
    number_competent = user_skills_particular.filter(level="Competent").count()
    number_proficient = user_skills_particular.filter(level="Proficient").count()
    number_expert = user_skills_particular.filter(level="Expert").count()

    percentage_with_skill = (number_with_skill / total_users) * 100
    percentage_wanting_to_develop = (number_wanting_to_develop / total_users) * 100
    if number_with_skill:
        percentage_beginners = (number_beginners / number_with_skill) * 100  # Of those with this skill
        percentage_adv_beginners = (number_adv_beginners / number_with_skill) * 100
        percentage_competent = (number_competent / number_with_skill) * 100
        percentage_proficient = (number_proficient / number_with_skill) * 100
        percentage_expert = (number_expert / number_with_skill) * 100
    else:
        percentage_beginners = 0
        percentage_adv_beginners = 0
        percentage_competent = 0
        percentage_proficient = 0
        percentage_expert = 0

    data = {
        "name": skill_name,
        "total_users": total_users,
        "skill_value_total": number_with_skill,
        "skill_value_percentage": round(percentage_with_skill, 0),
        "skill_label": format_perc_label(number_with_skill, percentage_with_skill),
        "skills_develop_value_total": number_wanting_to_develop,
        "skills_develop_value_percentage": round(percentage_wanting_to_develop, 0),
        "skills_develop_label": format_perc_label(number_wanting_to_develop, percentage_wanting_to_develop),
        "beginner_value_total": number_beginners,
        "beginner_value_percentage": percentage_beginners,
        "beginner_label": format_perc_label(number_beginners, percentage_beginners),
        "advanced_beginner_value_total": number_adv_beginners,
        "advanced_beginner_value_percentage": percentage_adv_beginners,
        "advanced_beginner_label": format_perc_label(number_adv_beginners, percentage_adv_beginners),
        "competent_value_total": number_competent,
        "competent_value_percentage": percentage_competent,
        "competent_label": format_perc_label(number_competent, percentage_competent),
        "proficient_value_total": number_proficient,
        "proficient_value_percentage": percentage_proficient,
        "proficient_label": format_perc_label(number_proficient, percentage_proficient),
        "expert_value_total": number_expert,
        "expert_value_percentage": percentage_expert,
        "expert_label": format_perc_label(number_expert, percentage_expert),
    }
    return data


@extend_schema(request=None, responses=None)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.AllowAny,))  # TODO - change after testing!
def report_skills_view(request):  # user_id
    # TODO - get skills from query params
    skills = request.query_params.get("skills", None)
    if not skills:  # TODO - in this case, I think actually return error
        skills = UserSkill.objects.all().values_list("name", flat=True)
    else:
        skills = skills.strip(",")

    users = get_filtered_users(request)
    user_skills = UserSkill.objects.filter(user__in=users).filter(name__in=skills)
    user_skills_develop = UserSkillDevelop.objects.filter(user__in=users).filter(name__in=skills)

    total_users = users.count()
    total_skills = len(skills)
    skill_data_list = []
    for skill_name in skills:
        skill_data = get_skill_data_for_users(users, user_skills, user_skills_develop, skill_name)
        skill_data_list.append(skill_data)

    output_data = {
        # TODO - add pagination?
        # "page":"number", //e.g. 1
        # "per_page":"number", //e.g. 10
        "total": total_users,
        "total_pages": total_skills,
        "data": skill_data_list,
    }
    return Response(data=output_data, status=status.HTTP_200_OK)
