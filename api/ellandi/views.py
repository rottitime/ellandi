from django.shortcuts import render

from ellandi.registration import models

page_names = ("index", "your-details",)


def get_values(model):
    values = tuple({"value": item.slug, "text": item.name} for item in model.objects.all())
    return values


def page_view(request, page_name="index"):
    grades = get_values(models.Grade)
    professions = get_values(models.Profession)
    contract_types = get_values(models.ContractType)
    languages = get_values(models.Language)
    assert page_name in page_names

    index = page_names.index(page_name)
    prev_page = index and page_names[index-1] or None
    next_page = (index < len(page_names)-1) and page_names[index+1] or None

    return render(
        request,
        template_name=f"{page_name}.html",
        context={
            "grades": grades,
            "professions": professions,
            "contract_types": contract_types,
            "languages": languages,
            "prev_page": prev_page,
            "next_page": next_page,
        },
    )
