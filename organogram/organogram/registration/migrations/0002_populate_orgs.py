"""Populate organisation model."""

from django.db import migrations
from django.utils.text import slugify


def populate_orgs(apps, schema_editor):
    Organisation = apps.get_model("registration", "Organisation")
    orgs = []
    with open("organogram/registration/migrations/0002_populate_orgs.txt") as file:
        for line in file:
            line = line.strip()
            slug = slugify(line)
            org = Organisation(name=line, slug=slug)
            orgs.append(org)
    Organisation.objects.bulk_create(orgs)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0001_initial"),
    ]

    operations = [migrations.RunPython(populate_orgs)]
