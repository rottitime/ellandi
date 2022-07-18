"""Specify order of contract types."""

from django.db import migrations


def add_orders_contract_types(apps, schema_editor):
    ContractType = apps.get_model("registration", "ContractType")
    contract_types = ["permanent", "fixed-term", "agency", "other"]
    for i in range(0, 4):
        type = ContractType.objects.get(slug=contract_types[i])
        type.order = i
        type.save()


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0032_auto_20220713_1237"),
    ]

    operations = [migrations.RunPython(add_orders_contract_types)]
