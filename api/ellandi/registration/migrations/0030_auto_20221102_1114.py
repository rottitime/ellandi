# Generated by Django 3.2.16 on 2022-11-02 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0029_userskilldevelop_pending"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="professions",
        ),
        migrations.AddField(
            model_name="user",
            name="professions",
            field=models.JSONField(default=list),
        ),
    ]
