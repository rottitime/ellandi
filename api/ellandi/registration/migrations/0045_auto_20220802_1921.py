# Generated by Django 3.2.14 on 2022-08-02 19:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0044_auto_20220802_1856"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="function",
            options={"ordering": ["order"]},
        ),
        migrations.AddField(
            model_name="function",
            name="order",
            field=models.PositiveSmallIntegerField(null=True),
        ),
    ]
