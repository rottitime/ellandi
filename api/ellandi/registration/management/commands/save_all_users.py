from django.core.management.base import BaseCommand

from ellandi.registration import models


class Command(BaseCommand):
    help = "Save all users"

    def handle(self, *args, **kwargs):
        users = models.User.objects.all()
        for user in users:
            user.save()
            print(f"Saved {user.email}")  # noqa T201
