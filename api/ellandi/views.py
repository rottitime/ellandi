from django.shortcuts import render

from ellandi.registration import models

pages = ("index",)

def get_values(model):
    values = tuple({"value": item.slug, "text": item.name} for item in model.objects.all())
    return values


def page_view(request, page_name="index"):
    grades = get_values(models.Grade)
    professions = get_values(models.Profession)
    contract_types = get_values(models.ContractType)
    languages = get_values(models.Language)

    return render(
        request,
        template_name=f"{page_name}.html",
        context={
            "grades": grades,
            "professions": professions,
            "contract_types": contract_types,
            "languages": languages,
        },
    )
