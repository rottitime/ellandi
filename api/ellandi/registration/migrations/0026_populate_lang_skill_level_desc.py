"""Populate new field for description of each language level."""
from django.db import migrations

BASIC_DESC = "You can understand and use basic phrases, introduce yourself and describe in simple terms aspects of your background and environment"  # noqa
INDEPENDENT_DESC = "You can deal with most situations likely to arise while travelling in an area where the language is spoken and interact with a degree of fluency"  # noqa
PROFICIENT_DESC = "You can express ideas fluently and spontaneously and can use the language flexibly for social, academic and professional purposes"  # noqa
LEVEL_DESC = {"basic": BASIC_DESC, "independent": INDEPENDENT_DESC, "proficient": PROFICIENT_DESC}


def populate_locations(apps, schema_editor):
    LanguageSkillLevel = apps.get_model("registration", "LanguageSkillLevel")

    for slug in LEVEL_DESC:
        level = LanguageSkillLevel.objects.get(slug=slug)
        level.description = LEVEL_DESC[slug]
        level.save()


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0025_languageskilllevel_description"),
    ]

    operations = [migrations.RunPython(populate_locations)]
