from django.shortcuts import render

from ellandi.registration import models


def get_values(model):
    values = tuple({"value": item.slug, "text": item.name} for item in model.objects.all())
    return values


def page_view(request, page_num):
    grades = get_values(models.Grade)
    professions = get_values(models.Profession)
    contract_types = get_values(models.ContractType)
    languages = get_values(models.Language)

    return render(
        request,
        template_name=f"page{page_num}.html",
        context={
            "grades": grades,
            "professions": professions,
            "contract_types": contract_types,
            "languages": languages,
        },
    )
