from django.db import migrations


def delete_users(apps, schema_editor):
    User = apps.get_model("registration", "User")
    User.objects.all().delete()


class Migration(migrations.Migration):
    dependencies = [
        ("registration", "0013_alter_userskill_level"),
    ]

    operations = [migrations.RunPython(delete_users)]
