"""Load all data from fixture for languages."""

from django.core.management import call_command
from django.db import migrations


def reload_langs(apps, schema_editor):
    Language = apps.get_model("registration", "Language")
    Language.objects.all().delete()
    fixture_file = f"dropdown/languages.json"
    call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0002_loaddata_fixtures"),
    ]

    operations = [migrations.RunPython(reload_langs)]
