# Generated by Django 3.2.14 on 2022-07-16 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0029_populate_countries"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="department",
            field=models.CharField(blank=True, max_length=127, null=True),
        ),
    ]