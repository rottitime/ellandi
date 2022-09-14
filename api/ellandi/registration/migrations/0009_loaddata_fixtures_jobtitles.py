"""Load all data from fixture for job titles."""

from django.core.management import call_command
from django.db import migrations


def reload_jobtitles(apps, schema_editor):
    JobTitle = apps.get_model("registration", "JobTitle")
    JobTitle.objects.all().delete()
    fixture_file = "dropdown/jobtitles.json"
    call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0008_jobtitle"),
    ]

    operations = [migrations.RunPython(reload_jobtitles)]
