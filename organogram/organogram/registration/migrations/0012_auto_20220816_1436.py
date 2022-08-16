# Generated by Django 3.2.14 on 2022-08-16 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0011_auto_20220808_1200"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="modified_at",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name="userlanguage",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name="userlanguage",
            name="modified_at",
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name="userskill",
            name="created_at",
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name="userskill",
            name="modified_at",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
