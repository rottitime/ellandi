"""Load all data from fixtures for drop-down lists."""

from django.core.management import call_command
from django.db import migrations

MODELS_FIXTURES = [
    "contracttypes",
    "countries",
    "grades",
    "languages",
    "languageskilllevels",
    "locations",
    "organisations",
]


def load_all_fixtures(apps, schema_editor):
    for name in MODELS_FIXTURES:
        fixture_file = f"dropdown/{name}.json"
        call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0035_auto_20220713_1620"),
    ]

    operations = []
