# Generated by Django 3.2.14 on 2022-08-10 18:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0051_userskilldevelop"),
    ]

    operations = [
        migrations.RenameField(
            model_name="userskill",
            old_name="skill_name",
            new_name="name",
        ),
        migrations.RenameField(
            model_name="userskilldevelop",
            old_name="skill_name",
            new_name="name",
        ),
        migrations.AlterUniqueTogether(
            name="userskill",
            unique_together={("user", "name")},
        ),
        migrations.AlterUniqueTogether(
            name="userskilldevelop",
            unique_together={("user", "name")},
        ),
    ]