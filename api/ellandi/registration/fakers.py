import random

import faker

from . import models

fake = faker.Faker()


def make_fake_course():
    data = {
        "title": fake.sentence(),
        "short_description": fake.paragraph(),
        "long_description": "\n".join(fake.paragraphs()),
        "status": random.choice(models.Course.Status.values),
        "cost_pounds": fake.pyint(),
        "duration_minutes": fake.pyint(),
        "private": random.choice((False, False, True)),
        "course_type": random.choice(models.Course.CourseType.values),
    }
    return data


def make_bool(true=1, false=1):
    choices = (True,) * true + (False,) * false
    return random.choice(choices)


def make_user_skill(seen_skills=None, develop=False):
    if not seen_skills:
        seen_skills = {}
    if len(seen_skills) > 10 and make_bool(2, 1):
        data = random.choice(seen_skills.values())
    else:
        data = dict(
            name=fake.sentence(),
            pending=make_bool(),
        )
    if not develop:
        data["level"] = random.choice(models.UserSkill.SkillLevel.values)
    return data


def _get_random_object_name(model_name):
    model = getattr(models, model_name)
    return model.objects.order_by("?").first().name


_DROP_DOWN_KEYS = (
    ("organisation", "Organisation"),
    ("location", "Location"),
    ("grade", "Grade"),
    ("primary_profession", "Profession"),
    ("function", "Function"),
    ("contract_type", "ContractType"),
)


def rand_range(num):
    return range(int(random.uniform(0, num)))


def make_fake_user():
    first_name = fake.first_name()
    last_name = fake.last_name()

    data = dict(
        first_name=first_name,
        last_name=last_name,
        email=f"{first_name}.{last_name}@example.com".lower(),
        privacy_policy_agreement=True,
        verified=make_bool(2, 1),
        is_mentor=make_bool(1, 3),
        is_line_manager=make_bool(1, 5),
        job_title=fake.job(),
        is_active=True,
    )

    drop_down_data = {k: _get_random_object_name(v) for (k, v) in _DROP_DOWN_KEYS}
    professions_data = {"professions": [_get_random_object_name("Profession") for _ in rand_range(3)]}
    data = {**professions_data, **drop_down_data, **data}
    return data


def make_admin_user():
    data = dict(
        first_name="Ad",
        last_name="Min",
        email="admin@example.com".lower(),
        privacy_policy_agreement=True,
        verified=True,
        is_staff=True,
        is_active=True,
    )
    return data


def add_users(number):
    for i in range(number):
        user_data = make_fake_user()
        while models.User.objects.filter(email=user_data["email"]).exists():
            user_data = make_fake_user()
        user = models.User(**user_data)
        user.set_password("P455W0rd")
        user.save()
        seen_skills = {}
        for _ in rand_range(10):
            skill_data = make_user_skill(seen_skills)
            user_skill = models.UserSkill(user=user, **skill_data)
            user_skill.save()
        for _ in rand_range(10):
            skill_data = make_user_skill(develop=True)
            user_skill = models.UserSkillDevelop(user=user, **skill_data)
            user_skill.save()
        yield user
    user = models.User(**make_admin_user())
    user.save()
    user.set_password("P455W0rd")
    yield user
