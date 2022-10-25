# Generated by Django 3.2.15 on 2022-10-25 15:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0024_loaddata_fixtures_professions"),
    ]

    operations = [
        migrations.CreateModel(
            name="Course",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(blank=True, max_length=256, null=True)),
                ("short_description", models.CharField(blank=True, max_length=1024, null=True)),
                ("long_description", models.TextField(blank=True, null=True)),
                ("visibility", models.CharField(blank=True, max_length=256, null=True)),
                (
                    "status",
                    models.CharField(
                        blank=True,
                        choices=[("ARCHIVED", "Archived"), ("DRAFT", "Draft"), ("PUBLISHED", "Published")],
                        max_length=128,
                        null=True,
                    ),
                ),
                ("cost_pounds", models.PositiveSmallIntegerField(blank=True, null=True)),
                ("duration_minutes", models.PositiveSmallIntegerField(blank=True, null=True)),
                ("private", models.BooleanField(blank=True, null=True)),
                (
                    "course_type",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("ELEARNING", "Elearning"),
                            ("FACE_TO_FACE", "Face-to-face"),
                            ("FILE", "File"),
                            ("LINK", "Link"),
                            ("VIDEO", "Video"),
                            ("MIXED", "Mixed"),
                        ],
                        max_length=256,
                        null=True,
                    ),
                ),
            ],
        ),
    ]
