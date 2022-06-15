"""Populate organisation model."""
import csv

from django.db import migrations
from django.utils.text import slugify


def populate_orgs(apps, schema_editor):
    Organisation = apps.get_model("registration", "Organisation")
    orgs = []
    with open("ellandi/registration/migrations/0018_populate_orgs.txt") as file:
        for line in file:
            line = line.strip("\n")
            slug = slugify(line)
            org = Organisation(organisation=line, org_slug=slug)
            orgs.append(org)
    Organisation.objects.bulk_create(orgs)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0014_organisations"),
    ]

    operations = [migrations.RunPython(populate_orgs)]
