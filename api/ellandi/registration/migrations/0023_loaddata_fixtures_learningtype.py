from django.core.management import call_command
from django.db import migrations


def reload_learning_type(apps, schema_editor):
    LearningType = apps.get_model("registration", "LearningType")
    LearningType.objects.all().delete()
    fixture_file = "dropdown/learning-types.json"
    call_command("loaddata", fixture_file, app_label="registration", ignorenonexistent=True)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0022_learningtype"),
    ]

    operations = [migrations.RunPython(reload_learning_type)]
