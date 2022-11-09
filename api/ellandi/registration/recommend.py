import random

from django.db.models import Count

from ellandi.registration.initial_data import DDAT_JOB_TO_SKILLS_LOOKUP
from ellandi.registration.models import RecommendedSkill, UserSkill


def recommend_skill_from_skill(existing_skill):
    """Given an existing skill, queries the pre-baked recommendations from the database"""

    query = RecommendedSkill.objects.filter(
        source_type=RecommendedSkill.SourceTypes.Skill, source_value=existing_skill
    ).order_by("-created_at")
    all_entries = tuple(set(query.values_list("recommended_skill", flat=True)))
    return all_entries


def recommend_title_from_job_title(current_title):
    """Given an existing job title, queries the pre-baked recommendations from the database"""

    query = RecommendedSkill.objects.filter(
        source_type=RecommendedSkill.SourceTypes.JobTitle, source_value=current_title
    ).order_by("-created_at")
    all_entries = tuple(set(query.values_list("recommended_skill", flat=True)))
    return all_entries


def recommend_profession_skills(profession):
    """Given a civil service profession, suggests recent popular skills for that profession"""
    if not profession:
        return tuple()

    return_count = 20

    skills_and_professions = (
        UserSkill.objects.select_related("User")
        .filter(user__primary_profession=profession)
        .only("user", "name")
        .annotate(num_skills=Count("name"))
        .order_by("-num_skills")[:return_count]
        .values_list("name", flat=True)
    )

    return skills_and_professions


def recommend_popular_skills():
    """Recommends most popular skills"""

    return_count = 20

    top_skills = (
        UserSkill.objects.only("user", "name")
        .annotate(num_skills=Count("name"))
        .order_by("-num_skills")[:return_count]
        .values_list("name", flat=True)
    )

    return top_skills


def recommend_bundled_skill_recommendations(skills, job_title, profession):
    """Given a user skill list, job title and primary profession, returns a bundle of recommended skills,
    prioritising job title skills, then profession and skills, then popular skills.
    """
    profession_skills = tuple(recommend_profession_skills(profession))

    skill_recommended_skills = tuple(
        recommend_skill for skill in skills for recommend_skill in recommend_skill_from_skill(skill))

    job_title_skills = tuple(recommend_title_from_job_title(job_title))

    ddat_recommended_skills = DDAT_JOB_TO_SKILLS_LOOKUP.get(job_title)

    if ddat_recommended_skills is not None:
        all_job_skills = tuple([*ddat_recommended_skills, *job_title_skills])
    else:
        all_job_skills = tuple(job_title_skills)

    popular_skills = tuple(recommend_popular_skills())

    all_skills = tuple(set(*profession_skills, *skill_recommended_skills, *job_title_skills, *popular_skills))

    data = {
        'profession_skills': profession_skills,
        'skill_skills': skill_recommended_skills,
        'job_title_skills': all_job_skills,
        'popular_skills': popular_skills,
        'all_skills': all_skills,
    }

    return data
