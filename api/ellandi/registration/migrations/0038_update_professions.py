"""Update to latest list of professions"""

from django.core.management import call_command
from django.db import migrations


def load_all_fixtures(apps, schema_editor):
    Profession = apps.get_model("registration", "Profession")
    Profession.objects.all().delete()
    fixture_file = "dropdown/professions.json"
    call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0037_merge_20220718_1053"),
    ]

    operations = [migrations.RunPython(load_all_fixtures)]
