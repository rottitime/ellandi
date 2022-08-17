"""Load all data from fixtures for drop-down lists."""

from django.core.management import call_command
from django.db import migrations

DROPDOWN_MODELS = {
    "LanguageSkillLevel": "languageskilllevels",
}


def load_all_fixtures(apps, schema_editor):
    for model_name, fixture_name in DROPDOWN_MODELS.items():
        model = apps.get_model("registration", model_name)
        model.objects.all().delete()
        fixture_file = f"dropdown/{fixture_name}.json"
        call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0059_auto_20220816_1038"),
    ]

    operations = [migrations.RunPython(load_all_fixtures)]
