# Generated by Django 3.2.13 on 2022-05-19 14:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0004_user_contract_type'),
    ]

    operations = [
        migrations.CreateModel(
            name='WebError',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=datetime.datetime.now, editable=False)),
                ('modified_at', models.DateTimeField(default=datetime.datetime.now, editable=False)),
                ('message', models.CharField(max_length=1024, null=True)),
                ('stack', models.CharField(max_length=16384, null=True)),
                ('user_agent', models.CharField(max_length=1024, null=True)),
                ('file_name', models.CharField(max_length=1024, null=True)),
                ('line_number', models.IntegerField(null=True)),
                ('column_number', models.IntegerField(null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
