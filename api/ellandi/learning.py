import datetime

from django.db.models import Avg, Sum

from ellandi.registration.models import Learning

HOURS_IN_WORK_DAY = 7.4
LEARNING_TARGET_IN_DAYS = 10
MINUTES_IN_LEARNING_TARGET = LEARNING_TARGET_IN_DAYS * HOURS_IN_WORK_DAY * 60


def get_start_financial_year():
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
    avg_cost = cost_aggregates["cost_pounds__avg"] or 0
    sum_cost = cost_aggregates["cost_pounds__sum"] or 0
    avg_cost = round(avg_cost)
    sum_cost = round(sum_cost)
    return avg_cost, sum_cost


def get_percentage_for_learning_type(type, learning_qs, total_all_types):
    if total_all_types == 0:
        return 0
    total_for_type = learning_qs.filter(learning_type=type).aggregate(Sum("duration_minutes"))["duration_minutes__sum"]
    total_for_type = total_for_type or 0
    perc = total_for_type * 100 / total_all_types
    perc = round(perc)
    return perc


def get_learning_distribution(learning_qs):
    total_all_types = learning_qs.aggregate(Sum("duration_minutes"))["duration_minutes__sum"]
    total_all_types = total_all_types or 0
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
    if not total_users:
        return 0, 0
    total_learning = learning_qs.aggregate(Sum("duration_minutes"))["duration_minutes__sum"]
    total_learning = total_learning or 0
    avg_learning_mins = total_learning / total_users
    proportion_learning_per_user = avg_learning_mins * 100 / MINUTES_IN_LEARNING_TARGET
    days_per_user = round(avg_learning_mins / (HOURS_IN_WORK_DAY * 60))
    avg_perc = round(proportion_learning_per_user)
    return days_per_user, avg_perc


def get_learning_reporting_for_single_user(learning_qs):
    start_financial_year = get_start_financial_year()
    learning_this_year_qs = learning_qs.filter(date_completed__gte=start_financial_year)
    distribution = get_learning_distribution(learning_this_year_qs)
    goal_value_days, goal_value_percentage = get_total_avg_learning_financial_year(
        learning_qs=learning_this_year_qs, total_users=1
    )
    output_dictionary = {
        "distribution": distribution,
        "goal_value_days": goal_value_days,
        "goal_value_percentage": goal_value_percentage,
    }
    return output_dictionary
