from django.utils.text import slugify
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import decorators, permissions, renderers, status
from rest_framework.response import Response
from rest_framework_csv.renderers import CSVRenderer

from ellandi.registration.models import User, UserSkill, UserSkillDevelop


def filter_users_type(request, users_qs):
    user_type = request.query_params.get("users")
    assert user_type in ["all", "line_managers", "mentors", None]
    if user_type == "line_managers":
        users_qs = users_qs.filter(is_line_manager="Yes")
    elif user_type == "mentors":
        users_qs = users_qs.filter(is_mentor="Yes")
    return users_qs


def filter_users_professions(request, users_qs):
    professions = request.query_params.get("professions")
    if not professions:
        return users_qs
    professions = professions.strip(",")
    # Have to find users which have any profession in the query
    output_users_qs = User.objects.none()
    for profession in professions:
        prof_users_qs = users_qs.filter(profession__contains=profession)
        output_users_qs = output_users_qs | prof_users_qs
    return output_users_qs


def filter_users_other_params(request, users_qs):
    functions = request.query_params.get("functions")
    grades = request.query_params.get("grades")
    business_units = request.query_params.get("business_units")
    if functions:
        functions = functions.split(",")
        users_qs = users_qs.filter(function__in=functions)
    if grades:
        grades = grades.split(",")
        users_qs = users_qs.filter(grade__in=grades)
    if business_units:
        business_units = business_units.split(",")
        users_qs = users_qs.filter(business_unit__in=business_units)
    return users_qs


def get_filtered_users(request):
    users_qs = User.objects.all()
    users_qs = filter_users_type(request, users_qs)
    users_qs = filter_users_professions(request, users_qs)
    users_qs = filter_users_other_params(request, users_qs)
    return users_qs


def format_perc_label(number, percentage):
    return f"{number} ({int(percentage)}%)"


def get_skill_data_for_users(users, user_skills, user_skills_develop, skill_name):
    total_users = users.count()
    user_skills_particular = user_skills.filter(name=skill_name)
    user_skills_dev_particular = user_skills_develop.filter(name=skill_name)

    number_with_skill = user_skills_particular.count()
    number_wanting_to_develop = user_skills_dev_particular.count()
    if total_users:
        percentage_with_skill = (number_with_skill / total_users) * 100
        percentage_wanting_to_develop = (number_wanting_to_develop / total_users) * 100
    else:
        percentage_with_skill = 0
        percentage_wanting_to_develop = 0

    data = {
        "name": skill_name,
        "total_users": total_users,
        "skill_value_total": number_with_skill,
        "skill_value_percentage": int(percentage_with_skill),
        "skill_label": format_perc_label(number_with_skill, percentage_with_skill),
        "skills_develop_value_total": number_wanting_to_develop,
        "skills_develop_value_percentage": int(percentage_wanting_to_develop),
        "skills_develop_label": format_perc_label(number_wanting_to_develop, percentage_wanting_to_develop),
    }

    number_at_each_level = []
    skill_levels = ["Beginner", "Advanced beginner", "Competent", "Proficient", "Expert"]
    for level in skill_levels:
        number = user_skills_particular.filter(level=level).count()
        number_at_each_level.append(number)

    if number_with_skill:
        percentage_at_each_level = [(x / number_with_skill) * 100 for x in number_at_each_level]
    else:
        percentage_at_each_level = [0, 0, 0, 0, 0]

    for i in range(0, 5):
        level = skill_levels[i]
        number = number_at_each_level[i]
        percentage = percentage_at_each_level[i]
        label = format_perc_label(number, percentage)
        slug = slugify(level).replace("-", "_")
        data[f"{slug}_value_total"] = number
        data[f"{slug}_value_percentage"] = int(percentage)
        data[f"{slug}_label"] = label
    return data


@extend_schema(
    parameters=[
        OpenApiParameter(name="skills", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(name="users", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(name="professions", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(name="functions", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(name="grades", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(name="business_units", location=OpenApiParameter.QUERY, required=False, type=str),
    ],
    responses=None,
)
@decorators.api_view(["GET"])
# TODO - needs to be changed to "reporting permissions" - details TBC
@decorators.permission_classes((permissions.AllowAny,))  # TODO - change to admin user after testing!
@decorators.renderer_classes(
    (
        renderers.JSONRenderer,
        CSVRenderer,
    )
)
def report_skills_view(request):
    skills = request.query_params.get("skills", None)
    if skills:
        skills = skills.split(",")
    else:
        skills_existing = set(UserSkill.objects.all().values_list("name", flat=True))
        skills_dev = set(UserSkillDevelop.objects.all().values_list("name", flat=True))
        skills = list(skills_existing.union(skills_dev))

    users = get_filtered_users(request)
    user_skills = UserSkill.objects.filter(user__in=users).filter(name__in=skills)
    user_skills_develop = UserSkillDevelop.objects.filter(user__in=users).filter(name__in=skills)

    skill_data_list = []
    for skill_name in skills:
        skill_data = get_skill_data_for_users(users, user_skills, user_skills_develop, skill_name)
        skill_data_list.append(skill_data)

    format = request.query_params.get("format", "json")
    # TODO - can we reorder the columns in the CSV?
    if format == "csv":
        return Response(data=skill_data_list, status=status.HTTP_200_OK, content_type="text/csv")

    output_data = {
        # TODO - add pagination?
        # "page":"number", //e.g. 1
        # "per_page":"number", //e.g. 10
        "total": len(skills),
        # "total_pages": total_skills,
        "data": skill_data_list,
    }
    return Response(data=output_data, status=status.HTTP_200_OK, content_type="application/json")
