# Generated by Django 3.2.14 on 2022-07-13 16:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0034_order_grade"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="contracttype",
            options={"ordering": ["order"]},
        ),
        migrations.AlterModelOptions(
            name="grade",
            options={"ordering": ["order"]},
        ),
    ]
