"""Add functions data to drop-down"""

from django.core.management import call_command
from django.db import migrations


def update_functions(apps, schema_editor):
    Function = apps.get_model("registration", "Function")
    Function.objects.all().delete()
    fixture_file = "dropdown/functions.json"
    call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0041_user_contact_preference"),
    ]

    operations = [migrations.RunPython(update_functions)]
