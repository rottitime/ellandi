from django.shortcuts import render

from ellandi.registration import models


def page_view(request, page_num):
    grades = tuple({"value": grade.slug, "text": grade.name} for grade in models.Grade.objects.all())
    professions = tuple(
        {"value": profession.slug, "text": profession.name} for profession in models.Profession.objects.all()
    )
    contract_types = tuple(
        {"value": contract_type.slug, "text": contract_type.name} for contract_type in models.ContractType.objects.all()
    )

    return render(
        request,
        template_name=f"page{page_num}.html",
        context={"grades": grades, "professions": professions, "contract_types": contract_types},
    )
