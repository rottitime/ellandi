"""Initial location data."""

from django.db import migrations
from django.utils.text import slugify


def populate_locations(apps, schema_editor):
    Location = apps.get_model("registration", "Location")
    locations = []
    with open("ellandi/registration/migrations/0006_populate_locations.txt") as file:
        for line in file:
            line = line.strip()
            slug = slugify(line)
            location = Location(name=line, slug=slug)
            locations.append(location)
    Location.objects.bulk_create(locations)


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0005_location"),
    ]

    operations = [migrations.RunPython(populate_locations)]
