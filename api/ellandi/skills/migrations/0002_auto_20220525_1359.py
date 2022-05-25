# Generated by Django 3.2.13 on 2022-05-25 13:59

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("skills", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Skill",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("users", models.ManyToManyField(blank=True, related_name="skills", to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name="Skills",
        ),
    ]
