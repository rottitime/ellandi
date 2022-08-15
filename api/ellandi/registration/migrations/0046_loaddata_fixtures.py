"""Load all data from fixtures for drop-down lists."""

from django.core.management import call_command
from django.db import migrations

MODELS_FIXTURES = {"grades": "Grade", "professions": "Profession", "functions": "Function"}


def load_all_fixtures(apps, schema_editor):
    for fixture_name, model_name in MODELS_FIXTURES.items():
        model = apps.get_model("registration", model_name)
        model.objects.all().delete()
        fixture_file = f"dropdown/{fixture_name}.json"
        call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0045_auto_20220802_1921"),
    ]

    operations = []
