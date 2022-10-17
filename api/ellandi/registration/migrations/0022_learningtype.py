# Generated by Django 3.2.15 on 2022-10-13 10:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0021_auto_20221011_0817"),
    ]

    operations = [
        migrations.CreateModel(
            name="LearningType",
            fields=[
                ("name", models.CharField(max_length=127)),
                ("slug", models.CharField(max_length=127, primary_key=True, serialize=False)),
                ("order", models.PositiveSmallIntegerField(null=True)),
                ("description", models.CharField(blank=True, default="", max_length=255, null=True)),
            ],
            options={
                "ordering": ["order"],
                "abstract": False,
            },
        ),
    ]