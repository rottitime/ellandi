# Generated by Django 3.2.13 on 2022-05-30 20:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0010_alter_userskill_user'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='userskill',
            unique_together={('user', 'skill')},
        ),
    ]
