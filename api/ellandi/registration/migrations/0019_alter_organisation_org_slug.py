# Generated by Django 3.2.13 on 2022-06-15 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0018_populate_orgs"),
    ]

    operations = [
        migrations.AlterField(
            model_name="organisation",
            name="org_slug",
            field=models.SlugField(max_length=100, primary_key=True, serialize=False),
        ),
    ]
