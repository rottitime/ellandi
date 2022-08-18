"""Load all data from fixtures for drop-down lists."""

from django.core.management import call_command
from django.db import migrations

MODELS_FIXTURES = {"grades": "Grade", "professions": "Profession", "functions": "Function"}


def load_fixture(apps, schema_editor):
    SkillLevel = apps.get_model("registration", "SkillLevel")
    SkillLevel.objects.all().delete()
    fixture_file = f"dropdown/skilllevel.json"
    call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0054_skilllevel"),
    ]

    operations = []
