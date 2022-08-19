# Generated by Django 3.2.14 on 2022-08-19 10:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import ellandi.registration.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="ContractType",
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
        migrations.CreateModel(
            name="Country",
            fields=[
                ("name", models.CharField(max_length=127)),
                ("slug", models.CharField(max_length=127, primary_key=True, serialize=False)),
                ("order", models.PositiveSmallIntegerField(null=True)),
            ],
            options={
                "verbose_name_plural": "Countries",
            },
        ),
        migrations.CreateModel(
            name="EmailSalt",
            fields=[
                (
                    "email",
                    ellandi.registration.models.LowercaseEmailField(
                        max_length=254, primary_key=True, serialize=False, unique=True, verbose_name="email"
                    ),
                ),
                ("salt", models.BinaryField(max_length=16)),
            ],
        ),
        migrations.CreateModel(
            name="Function",
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
        migrations.CreateModel(
            name="Grade",
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
        migrations.CreateModel(
            name="Language",
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
        migrations.CreateModel(
            name="LanguageSkillLevel",
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
        migrations.CreateModel(
            name="Location",
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
        migrations.CreateModel(
            name="Organisation",
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
        migrations.CreateModel(
            name="Profession",
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
        migrations.CreateModel(
            name="SkillLevel",
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
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("modified_at", models.DateTimeField(auto_now=True)),
                ("department", models.CharField(blank=True, max_length=127, null=True)),
                ("organisation", models.CharField(blank=True, max_length=128, null=True)),
                ("job_title", models.CharField(blank=True, max_length=128, null=True)),
                ("business_unit", models.CharField(blank=True, max_length=127, null=True)),
                ("location", models.CharField(blank=True, max_length=127, null=True)),
                ("location_other", models.CharField(blank=True, max_length=127, null=True)),
                (
                    "line_manager_email",
                    ellandi.registration.models.LowercaseEmailField(blank=True, max_length=128, null=True),
                ),
                ("grade", models.CharField(blank=True, max_length=127, null=True)),
                ("grade_other", models.CharField(blank=True, max_length=127, null=True)),
                ("profession_other", models.CharField(blank=True, max_length=127, null=True)),
                ("primary_profession", models.CharField(blank=True, max_length=127, null=True)),
                ("function", models.CharField(blank=True, max_length=127, null=True)),
                ("function_other", models.CharField(blank=True, max_length=127, null=True)),
                ("contract_type", models.CharField(blank=True, max_length=127, null=True)),
                ("contract_type_other", models.CharField(blank=True, max_length=127, null=True)),
                ("contact_preference", models.BooleanField(blank=True, default=None, null=True)),
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                (
                    "email",
                    ellandi.registration.models.LowercaseEmailField(max_length=254, unique=True, verbose_name="email"),
                ),
                ("privacy_policy_agreement", models.BooleanField(default=False)),
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
                ("professions", models.ManyToManyField(blank=True, to="registration.Profession")),
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
            name="UserSkillDevelop",
            fields=[
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("modified_at", models.DateTimeField(auto_now=True)),
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("name", models.CharField(blank=True, max_length=127, null=True)),
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
                "unique_together": {("user", "name")},
            },
        ),
        migrations.CreateModel(
            name="UserSkill",
            fields=[
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("modified_at", models.DateTimeField(auto_now=True)),
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=256)),
                (
                    "level",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("Beginner", "Beginner"),
                            ("Advanced beginner", "Advanced beginner"),
                            ("Competent", "Competent"),
                            ("Proficient", "Proficient"),
                            ("Expert", "Expert"),
                        ],
                        max_length=64,
                        null=True,
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
                "unique_together": {("user", "name")},
            },
        ),
        migrations.CreateModel(
            name="UserLanguage",
            fields=[
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("modified_at", models.DateTimeField(auto_now=True)),
                ("id", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("name", models.CharField(blank=True, max_length=127, null=True)),
                (
                    "speaking_level",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("Basic", "Basic"),
                            ("Independent", "Independent"),
                            ("Proficient", "Proficient"),
                            ("None", "None"),
                        ],
                        max_length=127,
                        null=True,
                    ),
                ),
                (
                    "writing_level",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("Basic", "Basic"),
                            ("Independent", "Independent"),
                            ("Proficient", "Proficient"),
                            ("None", "None"),
                        ],
                        max_length=127,
                        null=True,
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="languages",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "unique_together": {("user", "name")},
            },
        ),
    ]
