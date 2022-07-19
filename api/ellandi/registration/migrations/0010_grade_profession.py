# Generated by Django 3.2.13 on 2022-06-17 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0009_auto_20220617_1307"),
    ]

    operations = [
        migrations.CreateModel(
            name="Grade",
            fields=[
                ("name", models.CharField(max_length=127)),
                ("slug", models.CharField(max_length=127, primary_key=True, serialize=False)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Profession",
            fields=[
                ("name", models.CharField(max_length=127)),
                ("slug", models.CharField(max_length=127, primary_key=True, serialize=False)),
            ],
            options={
                "abstract": False,
            },
        ),
    ]