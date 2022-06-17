"""Populate the contract type models with initial values."""
from django.db import migrations
from django.utils.text import slugify


def populate_contract_types(apps, schema_editor):
    ContractType = apps.get_model("registration", "ContractType")
    types = ["Permanent", "Fixed-term", "Agency", "Other"]
    for type in types:
        ContractType(name=type, slug=slugify(type)).save()


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0003_contracttype"),
    ]

    operations = [migrations.RunPython(populate_contract_types)]
