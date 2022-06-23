"""Populate the language skill level."""
from django.db import migrations
from django.utils.text import slugify


def populate_language_skill_level(apps, schema_editor):
    LanguageSkillLevel = apps.get_model("registration", "LanguageSkillLevel")
    levels = ["Basic", "Independent", "Proficient"]
    for level in levels:
        LanguageSkillLevel(name=level, slug=slugify(level)).save()


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0017_user_profession"),
    ]

    operations = [migrations.RunPython(populate_language_skill_level)]
