from django.core.management.base import BaseCommand

from ellandi.registration import models


class Command(BaseCommand):
    help = "Make users admins"

    def add_arguments(self, parser):
        parser.add_argument("emails", nargs="+")

    def handle(self, *args, **kwargs):
        for email in kwargs["emails"]:
            user = models.User.objects.get(email=email)
            user.is_staff = True
            user.save()
            print(f"Made {email} an admin")  # noqa T201
