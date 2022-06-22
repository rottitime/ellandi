from django.shortcuts import render

from ellandi.registration import models




def page_view(request, page_num):
    grades = tuple({'value': grade.slug, 'text': grade.name} for grade in models.Grade.objects.all())
    return render(
        request,
        template_name=f"page{page_num}.html",
        context={'grades': grades},
    )
