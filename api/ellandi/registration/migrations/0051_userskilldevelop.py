# Generated by Django 3.2.14 on 2022-08-10 12:33

import uuid

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models

import ellandi.registration.models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0050_auto_20220810_1040"),
    ]

    operations = [
        migrations.CreateModel(
            name="UserSkillDevelop",
            fields=[
                ("created_at", models.DateTimeField(default=ellandi.registration.models.now, editable=False)),
                ("modified_at", models.DateTimeField(default=ellandi.registration.models.now, editable=False)),
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("skill_name", models.CharField(blank=True, max_length=127, null=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="skills_develop",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
