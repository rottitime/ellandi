# Generated by Django 3.2.16 on 2022-11-24 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0036_alter_course_grades'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='id',
            field=models.CharField(max_length=64, primary_key=True, serialize=False),
        ),
    ]
