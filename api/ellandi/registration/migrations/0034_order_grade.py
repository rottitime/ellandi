"""Add order for grades"""

from django.db import migrations


def add_order_grades(apps, schema_editor):
    Grade = apps.get_model("registration", "Grade")
    grades = [
        "Administrative Officer (AO) Equivalent",
        "Administrative Assistant (AA) Equivalent",
        "Executive Officer (EO) Equivalent",
        "Higher Executive Officer (HEO) Equivalent",
        "Senior Executive Officer (SEO) Equivalent",
        "Grade 7 Equivalent",
        "Grade 6 Equivalent",
        "Senior Civil Servant - Deputy Director (PB1/1A)",
        "Senior Civil Servant - Director (PB2)",
        "Senior Civil Servant - Director General (PB3)",
        "Senior Civil Servant - Permanent Secretary",
        "Other",
    ]
    for i in range(0, 12):
        grade = Grade.objects.get(name=grades[i])
        grade.order = i
        grade.save()


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0033_order_professions"),
    ]

    operations = [migrations.RunPython(add_order_grades)]
