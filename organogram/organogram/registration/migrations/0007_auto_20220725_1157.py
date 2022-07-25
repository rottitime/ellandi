# Generated by Django 3.2.14 on 2022-07-25 11:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0006_user_organogram_id"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="business_unit",
        ),
        migrations.RemoveField(
            model_name="user",
            name="sub_unit",
        ),
        migrations.CreateModel(
            name="Team",
            fields=[
                ("name", models.CharField(max_length=127)),
                ("slug", models.CharField(max_length=127, primary_key=True, serialize=False)),
                ("team_name", models.CharField(max_length=255)),
                ("sub_unit", models.CharField(max_length=255)),
                ("business_unit", models.CharField(max_length=255)),
            ],
            options={
                "unique_together": {("team_name", "sub_unit", "business_unit")},
            },
        ),
        migrations.AlterField(
            model_name="user",
            name="team",
            field=models.ForeignKey(
                blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to="registration.team"
            ),
        ),
    ]
