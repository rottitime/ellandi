import datetime

from django.db import models
from django.contrib.auth.models import AbstractUser


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(editable=False, default=datetime.datetime.now)
    modified_at = models.DateTimeField(editable=False, default=datetime.datetime.now)

    def save(self, *args, **kwargs):
        update_fields = kwargs.get('update_fields', None)
        if update_fields:
            kwargs['update_fields'] = set(update_fields).union({'modified'})

        super().save(*args, **kwargs)

    class Meta:
        abstract = True


class User(AbstractUser, TimeStampedModel):
    username = None
    email = models.EmailField('email', unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
