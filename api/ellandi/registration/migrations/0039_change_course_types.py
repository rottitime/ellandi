"""Rename some types for courses."""

from django.db import migrations


def rename_course_types(apps, schema_editor):
    Course = apps.get_model("registration", "Course")
    elearning_courses = Course.objects.filter(course_type="Elearning")
    for course in elearning_courses:
        course.course_type = "Online course"
        course.save()
    mixed_courses = Course.objects.filter(course_type="Mixed")
    for course in mixed_courses:
        course.course_type = "Blended"
        course.save()


class Migration(migrations.Migration):

    dependencies = [
        ("registration", "0038_alter_course_course_type"),
    ]

    operations = [
        migrations.RunPython(rename_course_types),
    ]
