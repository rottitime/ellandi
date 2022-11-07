import random

from django.db.models import Count

from ellandi.registration.initial_data import DDAT_JOB_TO_SKILLS_LOOKUP
from ellandi.registration.models import (
    RecommendedSkill,
    UserSkill,
)


def recommend_skill_from_db(existing_skill):
    """Given an existing skill, queries the pre-baked recommendations from the database"""

    query = RecommendedSkill.objects.filter(source_type=RecommendedSkill.SourceTypes.Skill, source_value=existing_skill).order_by("-created_at")
    all_entries = tuple(set(query.values_list("recommended_skill", flat=True)))
    return all_entries


def recommend_title_from_db(current_title):
    """Given an existing job title, queries the pre-baked recommendations from the database"""

    query = RecommendedSkill.objects.filter(source_type=RecommendedSkill.SourceTypes.JobTitle, source_value=current_title).order_by("-created_at")
    all_entries = tuple(set(query.values_list("recommended_skill", flat=True)))
    return all_entries


def recommend_profession_skills(profession):
    """Given a civil service profession, suggests recent popular skills for that profession"""

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


def recommend_bundled_skill_recommendations(skills_list, job_title, profession):
    """Given a user skill list, job title and primary profession, returns a bundle of recommended skills,
    prioritising job title skills, then profession and skills, then popular skills.

    Returns 40 skills by default.
    """

    total_skill_count = 40

    profession_skills = []

    if profession is not None:
        profession_skills = list(recommend_profession_skills(profession))

    skill_recommended_skills = []

    if len(skills_list) > 0:

        for skill in skills_list:
            skill_recommendation = recommend_skill_from_db(skill)
            if skill_recommendation is not None:
                skill_recommended_skills.extend(skill_recommendation)

    job_title_skills = list(recommend_title_from_db(job_title))

    ddat_recommended_skills = DDAT_JOB_TO_SKILLS_LOOKUP.get(job_title)

    if ddat_recommended_skills is not None:
        all_job_skills = [*ddat_recommended_skills, *job_title_skills]
    else:
        all_job_skills = [*job_title_skills]

    if len(all_job_skills) >= total_skill_count:
        return all_job_skills

    else:
        remaining_skill_count = total_skill_count - len(all_job_skills)
        bespoke_skill_bundle = [*skill_recommended_skills, *profession_skills][:remaining_skill_count]
        random.shuffle(bespoke_skill_bundle)
        random.shuffle(all_job_skills)
        custom_skill_bundle = [*all_job_skills, *bespoke_skill_bundle]

        if len(custom_skill_bundle) < total_skill_count:
            popular_skills = list(recommend_popular_skills())
            random.shuffle(popular_skills)
            missing_skill_count = total_skill_count - len(custom_skill_bundle)
            combined_recommendations = [*custom_skill_bundle, *popular_skills[:missing_skill_count]]
            return combined_recommendations

        else:
            return custom_skill_bundle
