# Generated by Django 3.2.15 on 2022-09-29 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0014_alter_learning_learning_type"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="is_line_manager",
            field=models.CharField(
                blank=True,
                choices=[("Yes", "Yes"), ("No", "No"), ("I don't know", "I don't know")],
                max_length=12,
                null=True,
            ),
        ),
    ]
