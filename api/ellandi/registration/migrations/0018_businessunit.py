# Generated by Django 3.2.15 on 2022-10-05 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0017_line_manager_email_validation"),
    ]

    operations = [
        migrations.CreateModel(
            name="BusinessUnit",
            fields=[
                ("name", models.CharField(max_length=127)),
                ("slug", models.CharField(max_length=127, primary_key=True, serialize=False)),
                ("order", models.PositiveSmallIntegerField(null=True)),
            ],
            options={
                "ordering": ["order"],
                "abstract": False,
            },
        ),
    ]
