# Generated by Django 3.2.13 on 2022-06-20 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0012_user_privacy_policy_agreement"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="grade",
            field=models.CharField(blank=True, max_length=127, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="location",
            field=models.CharField(blank=True, max_length=127, null=True),
        ),
    ]