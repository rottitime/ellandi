# Generated by Django 3.2.13 on 2022-06-16 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0006_populate_locations"),
    ]

    operations = [
        migrations.CreateModel(
            name="Language",
            fields=[
                ("name", models.CharField(max_length=20)),
                ("slug", models.SlugField(max_length=20, primary_key=True, serialize=False)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.AlterField(
            model_name="location",
            name="slug",
            field=models.SlugField(max_length=15, primary_key=True, serialize=False),
        ),
    ]