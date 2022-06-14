"""Populate organisation model."""
import csv

from django.db import migrations


def populate_orgs(apps, schema_editor):
    Organisation = apps.get_model("registration", "Organisation")
    orgs = []
    with open("ellandi/registration/migrations/0016_populate_orgs.csv") as csv_file:
        reader = csv.reader(csv_file)
        for row in reader:
            org = Organisation(organisation=row[0])
            orgs.append(org)
    Organisation.objects.bulk_create(orgs)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0015_rename_model_organisation_organisation"),
    ]

    operations = [migrations.RunPython(populate_orgs)]
