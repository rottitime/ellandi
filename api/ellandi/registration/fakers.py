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


def make_user_skill(develop=False):
    data = dict(
        name=fake.sentence(),
        pending=make_bool(),
    )
    if not develop:
        data["level"] = random.choice(models.UserSkill.SkillLevel.values)
    return data


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
    )
    return data


def add_users(number):
    for i in range(number):
        user_data = make_fake_user()
        while models.User.objects.filter(email=user_data["email"]).exists():
            user_data = make_fake_user()
        user = models.User(**user_data)
        user.save()
        for i in range(int(random.uniform(0, 10))):
            skill_data = make_user_skill()
            user_skill = models.UserSkill(user=user, **skill_data)
            user_skill.save()
        for i in range(int(random.uniform(0, 10))):
            skill_data = make_user_skill(develop=True)
            user_skill = models.UserSkillDevelop(user=user, **skill_data)
            user_skill.save()
        yield user
