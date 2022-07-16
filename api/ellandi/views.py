from django import forms
from django.contrib.auth import login
from django.shortcuts import redirect, render
from django.urls import reverse

from ellandi.registration import models

page_names = (
    "create-account",
    "your-details",
    "grade",
)

view_map = {}


def register(name):
    def _inner(func):
        view_map[name] = func
        return func

    return _inner


def get_values(model):
    values = tuple({"value": item.slug, "text": item.name} for item in model.objects.all())
    return values


class CreateAccountForm(forms.Form):
    email = forms.CharField(max_length=128)
    email_confirm = forms.CharField(max_length=128)
    password = forms.CharField(max_length=128)
    password_confirm = forms.CharField(max_length=128)

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password_confirm = cleaned_data.get("password_confirm")

        if password != password_confirm:
            self.add_error("password_confirm", "Password does not match")

        email = cleaned_data.get("email")
        email_confirm = cleaned_data.get("email_confirm")

        if email != email_confirm:
            self.add_error("email_confirm", "Email does not match")

        return cleaned_data


@register("create-account")
def create_account_view(request, url_data):
    if request.method == "POST":
        form = CreateAccountForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = models.User.objects.create_user(email=data["email"], password=data["password"])
            user = login(request, user)
            return redirect(url_data["next_url"])
    else:
        form = CreateAccountForm()

    return render(request, "create-account.html", {"form": form})


class YourDetailsForm(forms.Form):
    last_name = forms.CharField(max_length=128, required=False)
    first_name = forms.CharField(max_length=128, required=False)
    department = forms.CharField(max_length=128, required=False)
    job_title = forms.CharField(max_length=128, required=False)
    line_manager = forms.CharField(max_length=128, required=False)


@register("your-details")
def your_details_view(request, url_data):
    if request.method == "POST":
        form = YourDetailsForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = request.user
            for key, value in data.items():
                setattr(user, key, value)
            return redirect(url_data["next_url"])
    else:
        form = YourDetailsForm()

    return render(request, "your-details.html", {"form": form})


def page_view(request, page_name="create-account"):
    grades = get_values(models.Grade)
    professions = get_values(models.Profession)
    contract_types = get_values(models.ContractType)
    languages = get_values(models.Language)
    assert page_name in page_names

    index = page_names.index(page_name)
    prev_page = index and page_names[index - 1] or None
    next_page = (index < len(page_names) - 1) and page_names[index + 1] or None
    prev_url = prev_page and reverse("pages", args=(prev_page,))
    next_url = next_page and reverse("pages", args=(next_page,))

    if page_name in view_map:
        url_data = {
            "index": index,
            "prev_page": prev_page,
            "next_page": next_page,
            "prev_url": prev_url,
            "next_url": next_url,
        }
        return view_map[page_name](request, url_data)

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
            "prev_url": prev_url,
            "next_url": next_url,
        },
    )
