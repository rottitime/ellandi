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
