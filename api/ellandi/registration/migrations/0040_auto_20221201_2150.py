# Generated by Django 3.2.16 on 2022-12-01 21:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0039_change_course_types"),
    ]

    operations = [
        migrations.AlterField(
            model_name="course",
            name="duration_minutes",
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="learning",
            name="duration_minutes",
            field=models.PositiveIntegerField(null=True),
        ),
    ]
