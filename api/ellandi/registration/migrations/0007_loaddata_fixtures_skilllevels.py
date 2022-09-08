"""Load all data from fixture for skill levels."""

from django.core.management import call_command
from django.db import migrations


def reload_skill_levels(apps, schema_editor):
    SkillLevel = apps.get_model("registration", "SkillLevel")
    SkillLevel.objects.all().delete()
    fixture_file = f"dropdown/skilllevel.json"
    call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0006_skilllevel_description"),
    ]

    operations = [migrations.RunPython(reload_skill_levels)]
