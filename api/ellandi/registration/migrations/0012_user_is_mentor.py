# Generated by Django 3.2.15 on 2022-09-20 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0011_merge_20220920_0645"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="is_mentor",
            field=models.CharField(
                blank=True,
                choices=[("Yes", "Yes"), ("No", "No"), ("I don't know", "I don't know")],
                max_length=12,
                null=True,
            ),
        ),
    ]
