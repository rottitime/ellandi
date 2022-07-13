"""Make changes to existing drop-downs"""

from django.db import migrations
from django.utils.text import slugify


def add_profession(apps, schema_editor):
    Profession = apps.get_model("registration", "Profession")
    name = "Medical Profession"
    medical_profession = Profession(name=name, slug=slugify(name))
    medical_profession.save()


def change_grade(apps, schema_editor):
    Grade = apps.get_model("registration", "Grade")
    other_equiv_grade = Grade.objects.get(slug="other-equivalent-grade")
    other_equiv_grade.delete()
    name = "Other"
    other_grade = Grade(name=name, slug=slugify(name))
    other_grade.save()


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0029_populate_countries"),
    ]

    operations = [migrations.RunPython(add_profession), migrations.RunPython(change_grade)]
