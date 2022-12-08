import datetime
import random
import string

import faker

from . import initial_data, models

fake = faker.Faker()


def make_fake_course():
    data = {
        "id": fake.unique.pystr_format("?" * 22, letters=string.ascii_letters + string.digits + "_-"),
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


def make_random_date(days_ago=365):
    num_days = int(random.uniform(0, days_ago))
    date = datetime.date.today() - datetime.timedelta(days=num_days)
    return date


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
    model_map = {False: models.UserSkill, True: models.UserSkillDevelop}
    model = model_map[develop]
    if not model.objects.filter(user=user, name=skill_data["name"]).exists():
        user_skill = model(user=user, **skill_data)
        user_skill.save()


def save_language(user, language_name):
    language_data = dict(
        user = user,
        name=language_name,
        speaking_level=random.choice(models.UserLanguage.LanguageLevel.values),
        writing_level=random.choice(models.UserLanguage.LanguageLevel.values),
    )
    if not models.UserLanguage.objects.filter(user=user, name=language_data["name"]).exists():
        language_skill = models.UserLanguage(**language_data)
        language_skill.save()


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


def add_languages(user, language_names, num=2):
    languages_to_save = random.sample(language_names, k=int(random.uniform(0, num)))
    for language_name in languages_to_save:
        save_language(user, language_name)


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
    admin_data = make_admin_user()
    if not models.User.objects.filter(email=admin_data['email']).exists():
        user = models.User(**admin_data)
        user.set_password("P455W0rd")
        user.save()
        yield user
