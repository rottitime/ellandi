from django.shortcuts import render

from ellandi.registration import models




def page_view(request, page_num):
    grades = tuple({'value': grade.slug, 'text': grade.name} for grade in models.Grade.objects.all())
    professions = tuple({'value': profession.slug, 'text': profession.name} for profession in models.Profession.objects.all())
    return render(
        request,
        template_name=f"page{page_num}.html",
        context={'grades': grades, 'professions': professions},
    )
