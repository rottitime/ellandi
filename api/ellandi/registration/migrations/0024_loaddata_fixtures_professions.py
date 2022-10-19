from django.core.management import call_command
from django.db import migrations


def reload_professions(apps, schema_editor):
    Profession = apps.get_model("registration", "Profession")
    Profession.objects.all().delete()
    fixture_file = "dropdown/professions.json"
    call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0023_loaddata_fixtures_learningtype"),
    ]

    operations = [migrations.RunPython(reload_professions)]
