
from django.db import migrations
from django.core.exceptions import MultipleObjectsReturned
from django.utils.text import slugify


def import_job_titles(apps, schema_editor):
    JobTitle = apps.get_model("registration", "JobTitle")
    filename = "ellandi/registration/migrations/jobtitles.txt"
    with open(filename) as file:
        for line in file:
            job_titles = line.split(";")
            for job_name in job_titles:
                job_name = job_name.strip()
                slug = slugify(job_name)
                try:
                    JobTitle.objects.update_or_create(name=job_name, slug=slug)
                    print(f"SAVED: {job_name} : {slug}")
                except MultipleObjectsReturned as error:
                    print("\n")
                    print(f"Error: job_name: {job_name} : slug: {slug}")
                    print(f"line: {line}")
                    print(f"job_titles: {job_titles}")


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0008_jobtitle"),
    ]

    operations = [migrations.RunPython(import_job_titles)]
