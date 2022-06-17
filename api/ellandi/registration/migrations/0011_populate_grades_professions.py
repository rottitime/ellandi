"""
Initial values for grades and professions drop-down.
"""
from django.db import migrations
from django.utils.text import slugify


def populate_model(model, filename):
    all_objs = []
    with open(filename) as file:
        for line in file:
            line = line.strip()
            slug = slugify(line)
            obj = model(name=line, slug=slug)
            all_objs.append(obj)
    model.objects.bulk_create(all_objs)


def populate_grades(apps, schema_editor):
    Grade = apps.get_model("registration", "Grade")
    filename = "ellandi/registration/migrations/0011_grades.txt"
    populate_model(Grade, filename)


def populate_professions(apps, schema_editor):
    Profession = apps.get_model("registration", "Profession")
    filename = "ellandi/registration/migrations/0011_professions.txt"
    populate_model(Profession, filename)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0010_grade_profession"),
    ]

    operations = [migrations.RunPython(populate_grades), migrations.RunPython(populate_professions)]
