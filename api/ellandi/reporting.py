import datetime

from django.db.models import Avg, Sum
from django.utils.text import slugify
from drf_spectacular.utils import OpenApiParameter, extend_schema
from rest_framework import decorators, permissions, renderers, status
from rest_framework.response import Response
from rest_framework_csv.renderers import CSVRenderer

from ellandi.registration.exceptions import MissingLanguageTypeError
from ellandi.registration.models import (
    Grade,
    Learning,
    User,
    UserLanguage,
    UserSkill,
    UserSkillDevelop,
)

# TODO - maybe change column names for CSV
SKILLS_COL_NAME_LOOKUP_CSV = {
    "name": "name",
    "total_users": "total_users",
    "skill_value_total": "number_with_skill",
    "skill_value_percentage": "percentage_with_skill",
    "skill_develop_value_total": "number_to_develop_skill",
    "skill_develop_value_percentage": "percentage_to_develop_skill",
    "beginner_value_total": "number_beginners",
    "beginner_value_percentage": "percentage_beginners",
    "advanced_beginner_value_total": "number_advanced_beginners",
    "advanced_beginner_value_percentage": "percentage_advanced_beginners",
    "competent_value_total": "number_competent",
    "competent_value_percentage": "percentage_competent",
    "proficient_value_total": "number_proficient",
    "proficient_value_percentage": "percentage_proficient",
    "expert_value_total": "number_expert",
    "expert_value_percentage": "percentage_expert",
}
LANG_COL_NAME_LOOKUP_CSV = {
    "name": "name",
    "type": "type",
    "total_users": "total_users",
    "language_value_total": "number_with_language",
    "language_value_percentage": "percentage_with_language",
    "basic_value_total": "number_basic",
    "basic_value_percentage": "percentage_basic",
    "independent_value_total": "number_independent",
    "independent_value_percentage": "percentage_independent",
    "proficient_value_total": "number_proficient",
    "proficient_value_percentage": "percentage_proficient",
    "native_value_total": "number_native",
    "native_value_percentage": "percentage_native",
}
SKILL_LEVELS = ["Beginner", "Advanced beginner", "Competent", "Proficient", "Expert"]
LANGUAGE_LEVELS_SKILLED = ["Basic", "Independent", "Proficient", "Native"]
LANGUAGE_TYPES = ["speaking", "writing"]

HOURS_IN_WORK_DAY = 7.4
LEARNING_TARGET_IN_DAYS = 10
MINUTES_IN_LEARNING_TARGET = LEARNING_TARGET_IN_DAYS * HOURS_IN_WORK_DAY * 60


def format_perc_label(number, percentage):
    return f"{number} ({round(percentage)}%)"


def create_proportions_data_dict(name, numerator, denominator):
    percentage = (numerator / denominator) * 100
    output = {
        "name": name,
        "total_label": format_perc_label(numerator, percentage),
        "total_value_total": numerator,
        "total_value_percentage": round(percentage),
    }
    return output


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
    professions = professions.split(",")
    output_qs = User.objects.none()
    for prof_name in professions:
        users_with_prof = users_qs.filter(professions__contains=prof_name)
        output_qs = output_qs | users_with_prof
    return output_qs


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


def get_skills_list_from_params(request):
    skills = request.query_params.get("skills", None)
    if skills:
        return skills.split(",")
    skills_existing = set(UserSkill.objects.all().values_list("name", flat=True))
    skills_dev = set(UserSkillDevelop.objects.all().values_list("name", flat=True))
    skills = list(skills_existing.union(skills_dev))
    return skills


def get_language_list_from_params(request):
    languages = request.query_params.get("languages", None)
    type = request.query_params.get("type")
    type_field = f"{type}_level"
    if languages:
        return languages.split(",")
    langs_qs = UserLanguage.objects.all()
    langs_qs = langs_qs.exclude(**{type_field: None}).exclude(**{type_field: "None"})
    lang_vals = langs_qs.values_list("name", flat=True)
    languages = set(lang_vals)
    languages = list(languages)
    return languages


def format_perc_label(number, percentage):
    return f"{number} ({round(percentage)}%)"


def none_to_zero(number):
    if not number:
        number = 0
    return number


def get_skill_data_for_users(users, skill_name):
    total_users = users.count()
    user_skills = UserSkill.objects.filter(user__in=users).filter(name=skill_name)
    user_skills_develop = UserSkillDevelop.objects.filter(user__in=users).filter(name=skill_name)

    number_with_skill = user_skills.count()
    number_wanting_to_develop = user_skills_develop.count()
    if total_users:
        percentage_with_skill = number_with_skill * 100 / total_users
        percentage_wanting_to_develop = number_wanting_to_develop * 100 / total_users
    else:
        percentage_with_skill = 0
        percentage_wanting_to_develop = 0

    data = {
        "name": skill_name,
        "total_users": total_users,
        "skill_value_total": number_with_skill,
        "skill_value_percentage": round(percentage_with_skill),
        "skill_label": format_perc_label(number_with_skill, percentage_with_skill),
        "skill_develop_value_total": number_wanting_to_develop,
        "skill_develop_value_percentage": round(percentage_wanting_to_develop),
        "skill_develop_label": format_perc_label(number_wanting_to_develop, percentage_wanting_to_develop),
    }

    number_at_each_level = []
    for level in SKILL_LEVELS:
        number = user_skills.filter(level=level).count()
        number_at_each_level.append(number)

    if number_with_skill:
        percentage_at_each_level = [(x * 100 / number_with_skill) for x in number_at_each_level]
    else:
        percentage_at_each_level = [0, 0, 0, 0, 0]

    for i in range(0, 5):
        level = SKILL_LEVELS[i]
        number = number_at_each_level[i]
        percentage = percentage_at_each_level[i]
        label = format_perc_label(number, percentage)
        slug = slugify(level).replace("-", "_")
        data[f"{slug}_value_total"] = number
        data[f"{slug}_value_percentage"] = round(percentage)
        data[f"{slug}_label"] = label
    return data


def get_lang_data_for_users(users, lang_name, lang_type):
    total_users = users.count()
    user_langs = UserLanguage.objects.filter(user__in=users).filter(name=lang_name)
    type_field = f"{lang_type}_level"
    user_langs = user_langs.exclude(**{type_field: "None"})

    number_with_language = user_langs.count()
    if total_users:
        percentage_with_language = round((number_with_language * 100) / total_users)
    else:
        percentage_with_language = 0

    data = {
        "name": lang_name,
        "type": lang_type,
        "total_users": total_users,
        "language_value_total": number_with_language,
        "language_value_percentage": percentage_with_language,
    }
    number_at_each_level = []
    for level in LANGUAGE_LEVELS_SKILLED:
        number = user_langs.filter(**{type_field: level}).count()
        number_at_each_level.append(number)

    if number_with_language:
        percentage_at_each_level = [(x * 100 / number_with_language) for x in number_at_each_level]
    else:
        percentage_at_each_level = [0, 0, 0, 0]

    for i in range(0, 4):
        level = LANGUAGE_LEVELS_SKILLED[i]
        number = number_at_each_level[i]
        percentage = percentage_at_each_level[i]
        label = format_perc_label(number, percentage)
        slug = slugify(level).replace("-", "_")
        data[f"{slug}_value_total"] = number
        data[f"{slug}_value_percentage"] = round(percentage)
        data[f"{slug}_label"] = label
    return data


def format_data_for_csv(data_list, lookup_list):
    output_list = []
    for data_dict in data_list:
        output_dict = {lookup_list[key]: data_dict[key] for key in lookup_list}
        output_list.append(output_dict)
    return output_list


class CSVRendererSkills(CSVRenderer):
    header = list(SKILLS_COL_NAME_LOOKUP_CSV.values())


class CSVRendererLanguages(CSVRenderer):
    header = list(LANG_COL_NAME_LOOKUP_CSV.values())


@extend_schema(
    parameters=[
        OpenApiParameter(name="skills", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(
            name="users",
            location=OpenApiParameter.QUERY,
            required=False,
            type=str,
            enum=["all", "line_managers", "mentors"],
        ),
        OpenApiParameter(name="professions", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(name="functions", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(name="grades", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(name="business_units", location=OpenApiParameter.QUERY, required=False, type=str),
    ],
    responses=None,
)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAdminUser,))
@decorators.renderer_classes(
    (
        renderers.JSONRenderer,
        CSVRendererSkills,
    )
)
def report_skills_view(request):
    skills = get_skills_list_from_params(request)
    users = get_filtered_users(request)

    skill_data_list = []
    for skill_name in skills:
        skill_data = get_skill_data_for_users(users, skill_name)
        skill_data_list.append(skill_data)

    format = request.query_params.get("format", "json")
    if format == "csv":
        data = format_data_for_csv(skill_data_list, SKILLS_COL_NAME_LOOKUP_CSV)
        return Response(data=data, status=status.HTTP_200_OK, content_type="text/csv")

    output_data = {
        # TODO - add pagination?
        # "page":"number", //e.g. 1
        # "per_page":"number", //e.g. 10
        "total": len(skills),
        # "total_pages": total_skills,
        "data": skill_data_list,
    }
    return Response(data=output_data, status=status.HTTP_200_OK, content_type="application/json")


@extend_schema(
    parameters=[
        OpenApiParameter(name="languages", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(name="type", location=OpenApiParameter.QUERY, required=False, type=str, enum=LANGUAGE_TYPES),
        OpenApiParameter(
            name="users",
            location=OpenApiParameter.QUERY,
            required=False,
            type=str,
            enum=["all", "line_managers", "mentors"],
        ),
        OpenApiParameter(name="professions", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(name="functions", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(name="grades", location=OpenApiParameter.QUERY, required=False, type=str),
        OpenApiParameter(name="business_units", location=OpenApiParameter.QUERY, required=False, type=str),
    ],
    responses=None,
)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAdminUser,))
@decorators.renderer_classes(
    (
        renderers.JSONRenderer,
        CSVRendererLanguages,
    )
)
def report_languages_view(request):
    type = request.query_params.get("type")
    if type not in LANGUAGE_TYPES:
        raise MissingLanguageTypeError
    languages = get_language_list_from_params(request)
    users = get_filtered_users(request)

    language_data_list = []
    for language_name in languages:
        language_data = get_lang_data_for_users(users, language_name, type)
        language_data_list.append(language_data)

    format = request.query_params.get("format", "json")
    if format == "csv":
        data = format_data_for_csv(language_data_list, LANG_COL_NAME_LOOKUP_CSV)
        return Response(data=data, status=status.HTTP_200_OK, content_type="text/csv")

    output_data = {
        # TODO - add pagination?
        # "page":"number", //e.g. 1
        # "per_page":"number", //e.g. 10
        "total": len(languages),
        # "total_pages": total_skills,
        "data": language_data_list,
    }
    return Response(data=output_data, status=status.HTTP_200_OK, content_type="application/json")


def get_responsibilities_data():
    all_users = User.objects.all()
    total_users = all_users.count()
    number_line_managers = all_users.filter(is_line_manager="Yes").count()
    number_mentors = all_users.filter(is_mentor="Yes").count()
    responsibilities_data = [
        create_proportions_data_dict("Line managers", numerator=number_line_managers, denominator=total_users),
        create_proportions_data_dict("Mentors", numerator=number_mentors, denominator=total_users),
    ]
    total_users_data = {
        "name": "Total users",
        "total_label": total_users,
        "total_value_total": total_users,
        "total_value_percentage": 100,
    }

    return responsibilities_data, total_users_data


def get_grades_data():
    all_users = User.objects.all()
    total_users = all_users.count()
    output_list = []
    all_grades = Grade.objects.all().order_by("order").values_list("name", flat=True)
    for grade in all_grades:
        number_at_grade = all_users.filter(grade=grade).count()
        data_dict = create_proportions_data_dict(name=grade, numerator=number_at_grade, denominator=total_users)
        output_list.append(data_dict)
    return output_list


@extend_schema(request=None, responses=None)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAdminUser,))
@decorators.renderer_classes(
    (
        renderers.JSONRenderer,
        CSVRenderer,
    )
)
def responsibilities_view(request):
    data, total_users_data = get_responsibilities_data()
    data.append(total_users_data)
    format = request.query_params.get("format", "json")
    if format == "csv":
        return Response(data=data, status=status.HTTP_200_OK, content_type="text/csv")
    data = {"data": data}
    return Response(data=data, status=status.HTTP_200_OK, content_type="application/json")


@extend_schema(request=None, responses=None)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAdminUser,))
@decorators.renderer_classes(
    (
        renderers.JSONRenderer,
        CSVRenderer,
    )
)
def grades_view(request):
    output_list = get_grades_data()
    format = request.query_params.get("format", "json")
    if format == "csv":
        return Response(data=output_list, status=status.HTTP_200_OK, content_type="text/csv")
    return Response(data={"data": output_list}, status=status.HTTP_200_OK, content_type="application/json")


@extend_schema(request=None, responses=None)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAdminUser,))
@decorators.renderer_classes((CSVRenderer,))
def staff_overview_view(request):
    data, _ = get_responsibilities_data()
    grades_data = get_grades_data()
    data.extend(grades_data)
    return Response(data=data, status=status.HTTP_200_OK, content_type="text/csv")


def get_start_financial_year():
    # TODO - assumed financial year starts 1st Apr - check
    today = datetime.date.today()
    year = today.year
    if today.month < 4:
        year = year - 1
    start_financial_year = datetime.date(year, 4, 1)
    return start_financial_year


def get_learning_for_users_since_start_year(users_qs):
    start_financial_year = get_start_financial_year()
    learning_qs = Learning.objects.filter(user__in=users_qs).filter(date_completed__gte=start_financial_year)
    return learning_qs


def get_summary_course_costs(learning_qs):
    formal_learning_with_costs = learning_qs.filter(learning_type="Formal").exclude(cost_unknown=True)
    cost_aggregates = formal_learning_with_costs.aggregate(Sum("cost_pounds"), Avg("cost_pounds"))
    avg_cost = none_to_zero(cost_aggregates["cost_pounds__avg"])
    sum_cost = none_to_zero(cost_aggregates["cost_pounds__sum"])
    return round(avg_cost), round(sum_cost)


def get_percentage_for_learning_type(type, learning_qs, total_all_types):
    if total_all_types == 0:
        return 0
    total_for_type = learning_qs.filter(learning_type=type).aggregate(Sum("duration_minutes"))["duration_minutes__sum"]
    total_for_type = none_to_zero(total_for_type)
    perc = total_for_type / total_all_types * 100
    return round(perc)


def get_learning_distribution(learning_qs):
    total_all_types = learning_qs.filter(learning_type="Formal").aggregate(Sum("duration_minutes"))[
        "duration_minutes__sum"
    ]
    total_all_types = none_to_zero(total_all_types)
    output = [
        {
            "name": "Formal",
            "value_percentage": get_percentage_for_learning_type("Formal", learning_qs, total_all_types),
        },
        {
            "name": "Social",
            "value_percentage": get_percentage_for_learning_type("Social", learning_qs, total_all_types),
        },
        {
            "name": "On the job",
            "value_percentage": get_percentage_for_learning_type("On the job", learning_qs, total_all_types),
        },
    ]
    return output


def get_total_avg_learning_financial_year(learning_qs, total_users):
    total_learning = learning_qs.aggregate(Sum("duration_minutes"))["duration_minutes__sum"]
    total_learning = none_to_zero(total_learning)
    avg_learning_mins = total_learning / total_users
    proportion_learning_per_user = avg_learning_mins / MINUTES_IN_LEARNING_TARGET * 100
    days_per_user = proportion_learning_per_user
    avg_perc = round(proportion_learning_per_user * 100)
    return round(days_per_user), avg_perc


@extend_schema(request=None, responses=None)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAdminUser,))
def learning_view(request):
    users_qs = get_filtered_users(request)
    total_users = users_qs.count()
    learning_qs = get_learning_for_users_since_start_year(users_qs)
    course_average_cost, course_total_cost = get_summary_course_costs(learning_qs)
    avg_completed_this_year, perc_completed_this_year = get_total_avg_learning_financial_year(learning_qs, total_users)
    learning_distribution = get_learning_distribution(learning_qs)
    output_dict = {
        "course_average_cost_label": f"{course_average_cost:,}",
        "course_total_cost_label": f"{course_total_cost:,}",
        "goal_value_days": avg_completed_this_year,
        "goal_value_percentage": perc_completed_this_year,
        "distribution": learning_distribution,
    }
    return Response(data=output_dict, status=status.HTTP_200_OK, content_type="application/json")
