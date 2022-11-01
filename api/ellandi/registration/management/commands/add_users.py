from django.core.management.base import BaseCommand

from ellandi.registration import fakers, models


class Command(BaseCommand):
    help = "Add some fake users"

    def add_arguments(self, parser):
        parser.add_argument("-n", "--number", type=int, default=32, help="How many to add")

    def handle(self, *args, **kwargs):
        number = kwargs["number"]

        for user in fakers.add_users(number):
            print(f"Added: {user}")
