"""
Populate the languages endpoint with a basic list as a starting point.
"""
from django.db import migrations
from django.utils.text import slugify


def populate_languages(apps, schema_editor):
    Language = apps.get_model("registration", "Language")
    languages = [
        "English",
        "Mandarin Chinese",
        "Hindi",
        "Spanish",
        "French",
        "Arabic",
        "Bengali",
        "Russian",
        "Portuguese",
        "Indonesian",
        "Other",
    ]
    for lang in languages:
        Language(name=lang, slug=slugify(lang)).save()


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0007_auto_20220616_1820"),
    ]

    operations = [migrations.RunPython(populate_languages)]
