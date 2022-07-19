# Generated by Django 3.2.14 on 2022-07-12 10:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0026_populate_lang_skill_level_desc"),
    ]

    operations = [
        migrations.CreateModel(
            name="Country",
            fields=[
                ("name", models.CharField(max_length=127)),
                ("slug", models.CharField(max_length=127, primary_key=True, serialize=False)),
            ],
            options={
                "abstract": False,
            },
        ),
    ]