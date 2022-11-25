import random

import faker

from . import initial_data, models

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


def make_yes_no(yes=1, no=1):
    if make_bool(yes, no):
        return "Yes"
    else:
        return "No"


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


def get_ddat_job_title():
    return random.choice(tuple(initial_data.DDAT_JOB_TO_SKILLS_LOOKUP.keys()))


def make_fake_user():
    first_name = fake.first_name()
    last_name = fake.last_name()

    data = dict(
        first_name=first_name,
        last_name=last_name,
        email=f"{first_name}.{last_name}@example.com".lower(),
        privacy_policy_agreement=True,
        verified=make_bool(2, 1),
        is_mentor=make_yes_no(1, 3),
        is_line_manager=make_yes_no(1, 5),
        job_title=get_ddat_job_title(),
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


def make_user_skill(name, develop=False):
    data = dict(
        name=name,
        pending=make_bool(),
    )
    if not develop:
        data["level"] = random.choice(models.UserSkill.SkillLevel.values)
    return data


def save_skill(user, skill_name, develop=False):
    skill_data = make_user_skill(skill_name, develop=develop)
    if not models.UserSkill.objects.filter(user=user, name=skill_data["name"]).exists():
        user_skill = models.UserSkill(user=user, **skill_data)
        user_skill.save()


def add_ddat_skills(user):
    skills = initial_data.DDAT_JOB_TO_SKILLS_LOOKUP[user.job_title]
    for skill_name in skills:
        save_skill(user, skill_name)


def add_initial_skills(user, num=5):
    skills = random.sample(initial_data.INITIAL_SKILLS, k=int(random.uniform(0, num)))
    for skill_name in skills:
        save_skill(user, skill_name)


def add_develop_skills(user, num=5):
    skills = random.sample(initial_data.INITIAL_SKILLS, k=int(random.uniform(0, num)))
    for skill_name in skills:
        save_skill(user, skill_name, develop=True)


def add_users(number):
    for i in range(number):
        user_data = make_fake_user()
        while models.User.objects.filter(email=user_data["email"]).exists():
            user_data = make_fake_user()
        user = models.User(**user_data)
        user.set_password("P455W0rd")
        user.save()
        add_ddat_skills(user)
        add_initial_skills(user)
        add_develop_skills(user)
        yield user
    user = models.User(**make_admin_user())
    user.set_password("P455W0rd")
    user.save()
    yield user
