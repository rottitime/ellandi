# Generated by Django 3.2.15 on 2022-09-14 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0007_loaddata_fixtures_skilllevels"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="privacy_policy_agreement",
            field=models.BooleanField(blank=True, null=True),
        ),
    ]