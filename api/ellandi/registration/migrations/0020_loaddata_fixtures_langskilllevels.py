"""Reload data for language skill levels as updated."""

from django.core.management import call_command
from django.db import migrations


def reload_language_skill_levels(apps, schema_editor):
    LanguageSkillLevel = apps.get_model("registration", "LanguageSkillLevel")
    LanguageSkillLevel.objects.all().delete()
    fixture_file = "dropdown/languageskilllevels.json"
    call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0019_loaddata_fixtures_businessunit"),
    ]

    operations = [migrations.RunPython(reload_language_skill_levels)]
