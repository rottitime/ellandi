# Generated by Django 3.2.13 on 2022-06-16 11:27

import datetime
import uuid

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models

import ellandi.registration.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("password", models.CharField(max_length=128, verbose_name="password")),
                ("last_login", models.DateTimeField(blank=True, null=True, verbose_name="last login")),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="staff status",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        help_text="Designates whether this user should be treated as active. Unselect this instead of deleting accounts.",
                        verbose_name="active",
                    ),
                ),
                ("date_joined", models.DateTimeField(default=django.utils.timezone.now, verbose_name="date joined")),
                ("created_at", models.DateTimeField(default=datetime.datetime.now, editable=False)),
                ("modified_at", models.DateTimeField(default=datetime.datetime.now, editable=False)),
                ("organisation", models.CharField(blank=True, max_length=128, null=True)),
                ("job_title", models.CharField(blank=True, max_length=128, null=True)),
                ("line_manager_email", models.CharField(blank=True, max_length=128, null=True)),
                ("country", models.CharField(blank=True, max_length=128, null=True)),
                (
                    "contract_type",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("permanent", "Permanent"),
                            ("fixed_term", "Fixed Term"),
                            ("agency", "Agency"),
                            ("other", "Other"),
                        ],
                        max_length=128,
                        null=True,
                    ),
                ),
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("email", models.EmailField(max_length=254, unique=True, verbose_name="email")),
                ("first_name", models.CharField(blank=True, max_length=128, null=True, verbose_name="first name")),
                ("last_name", models.CharField(blank=True, max_length=128, null=True, verbose_name="last name")),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.Group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.Permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "verbose_name": "user",
                "verbose_name_plural": "users",
                "abstract": False,
            },
            managers=[
                ("objects", ellandi.registration.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name="WebError",
            fields=[
                ("created_at", models.DateTimeField(default=datetime.datetime.now, editable=False)),
                ("modified_at", models.DateTimeField(default=datetime.datetime.now, editable=False)),
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("message", models.CharField(max_length=1024, null=True)),
                ("stack", models.CharField(max_length=16384, null=True)),
                ("user_agent", models.CharField(max_length=1024, null=True)),
                ("file_name", models.CharField(max_length=1024, null=True)),
                ("line_number", models.IntegerField(null=True)),
                ("column_number", models.IntegerField(null=True)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="UserSkill",
            fields=[
                ("created_at", models.DateTimeField(default=datetime.datetime.now, editable=False)),
                ("modified_at", models.DateTimeField(default=datetime.datetime.now, editable=False)),
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("skill_name", models.CharField(max_length=256)),
                (
                    "level",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("beginner", "Beginner"),
                            ("advanced_beginner", "Advanced Beginner"),
                            ("competent", "Competent"),
                            ("proficient", "Proficient"),
                            ("expert", "Expert"),
                        ],
                        max_length=64,
                    ),
                ),
                ("validated", models.BooleanField(default=False)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="skills", to=settings.AUTH_USER_MODEL
                    ),
                ),
            ],
            options={
                "unique_together": {("user", "skill_name")},
            },
        ),
    ]
