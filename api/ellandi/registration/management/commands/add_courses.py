from django.core.management.base import BaseCommand

from ellandi.registration import fakers, models


class Command(BaseCommand):
    help = 'Add some fake courses'

    def add_arguments(self, parser):
        parser.add_argument('-n', '--number', type=int, default=32, help='How many to add')

    def handle(self, *args, **kwargs):
        number = kwargs['number']

        for i in range(number):
            data = fakers.make_fake_course()
            course = models.Course(**data)
            course.save()
