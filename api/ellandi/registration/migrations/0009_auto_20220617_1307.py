# Generated by Django 3.2.13 on 2022-06-17 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0008_populate_langs"),
    ]

    operations = [
        migrations.AlterField(
            model_name="contracttype",
            name="name",
            field=models.CharField(max_length=127),
        ),
        migrations.AlterField(
            model_name="contracttype",
            name="slug",
            field=models.CharField(max_length=127, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name="language",
            name="name",
            field=models.CharField(max_length=127),
        ),
        migrations.AlterField(
            model_name="language",
            name="slug",
            field=models.CharField(max_length=127, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name="location",
            name="name",
            field=models.CharField(max_length=127),
        ),
        migrations.AlterField(
            model_name="location",
            name="slug",
            field=models.CharField(max_length=127, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name="organisation",
            name="name",
            field=models.CharField(max_length=127),
        ),
        migrations.AlterField(
            model_name="organisation",
            name="slug",
            field=models.CharField(max_length=127, primary_key=True, serialize=False),
        ),
    ]