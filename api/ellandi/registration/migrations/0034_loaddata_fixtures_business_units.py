from django.core.management import call_command
from django.db import migrations


def reload_business_units(apps, schema_editor):
    BusinessUnit = apps.get_model("registration", "BusinessUnit")
    BusinessUnit.objects.all().delete()
    fixture_file = "dropdown/businessunits.json.json"
    call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0033_auto_20221113_2014"),
    ]

    operations = [migrations.RunPython(reload_business_units)]
