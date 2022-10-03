"""Get rid of invalid line manager emails."""

from django.db import migrations
from django.db.models import F


def remove_invalid_line_manager_emails(apps, schema_editor):
    User = apps.get_model("registration", "User")
    invalid_qs = User.objects.filter(email=F("line_manager_email"))
    for user in invalid_qs:
        user.line_manager_email = None
        user.save()


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0016_loaddata_fixtures_jobtitles"),
    ]

    operations = [migrations.RunPython(remove_invalid_line_manager_emails)]
