# Generated by Django 3.2.14 on 2022-07-13 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0031_alter_country_options"),
    ]

    operations = [
        migrations.AddField(
            model_name="contracttype",
            name="order",
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AddField(
            model_name="grade",
            name="order",
            field=models.PositiveSmallIntegerField(null=True),
        ),
    ]
