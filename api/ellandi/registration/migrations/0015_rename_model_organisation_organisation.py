# Generated by Django 3.2.13 on 2022-06-13 13:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0014_organisation"),
    ]

    operations = [
        migrations.RenameField(
            model_name="organisation",
            old_name="model",
            new_name="organisation",
        ),
    ]
