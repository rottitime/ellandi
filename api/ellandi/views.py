from django import forms
from django.contrib.auth import login
from django.forms.models import model_to_dict
from django.shortcuts import redirect, render
from django.urls import reverse

from ellandi.registration import initial_data, models

page_names = ("create-account", "your-details", "grade", "professions", "skills", "complete")

view_map = {}


def register(name):
    def _inner(func):
        view_map[name] = func
        return func

    return _inner


def get_values(model):
    values = tuple({"value": item.slug, "text": item.name} for item in model.objects.all())
    return values


def get_choices(model):
    choices = tuple((item.slug, item.name) for item in model.objects.all())
    return choices


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
    line_manager_email = forms.CharField(max_length=128, required=False)


@register("your-details")
def your_details_view(request, url_data):
    if request.method == "POST":
        form = YourDetailsForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = request.user
            for key, value in data.items():
                setattr(user, key, value)
            user.save()
            return redirect(url_data["next_url"])
    else:
        data = model_to_dict(request.user)
        form = YourDetailsForm(data)

    return render(request, "your-details.html", {"form": form, **url_data})


class GradeForm(forms.Form):
    grade = forms.ChoiceField(required=False, choices=lambda: get_choices(models.Grade))


@register("grade")
def grade_view(request, url_data):
    grades = get_values(models.Grade)
    if request.method == "POST":
        form = GradeForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = request.user
            for key, value in data.items():
                setattr(user, key, value)
            user.save()
            return redirect(url_data["next_url"])
    else:
        data = model_to_dict(request.user)
        form = GradeForm(data)

    return render(request, "grade.html", {"form": form, "grades": grades, **url_data})


class ProfessionsForm(forms.Form):
    professions = forms.MultipleChoiceField(required=False, choices=lambda: get_choices(models.Profession))


@register("professions")
def professions_view(request, url_data):
    professions = get_values(models.Profession)
    if request.method == "POST":
        form = ProfessionsForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = request.user
            for value in data["professions"]:
                profession = models.Profession.objects.get(pk=value)
                user.professions.add(profession)
            user.save()
            return redirect(url_data["next_url"])
    else:
        data = model_to_dict(request.user)
        form = ProfessionsForm(data)

    return render(request, "professions.html", {"form": form, "professions": professions, **url_data})


class SkillsForm(forms.Form):
    skill = forms.ChoiceField(required=False, choices=[])
    new_skill = forms.CharField(max_length=128, required=False)
    action = forms.CharField(max_length=128, required=False)


@register("skills")
def skills_view(request, url_data):
    skills = set(models.UserSkill.objects.all().values_list("skill_name", flat=True))
    skills = initial_data.INITIAL_SKILLS.union(skills)
    skills = tuple({"value": skill, "text": skill} for skill in skills)
    user = request.user
    user_skills = user.skills.all()

    if request.method == "POST":
        form = SkillsForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            if data["new_skill"]:
                skill = models.UserSkill(user=user, skill_name=data["new_skill"])
                skill.save()
            if data["skill"]:
                skill = models.UserSkill(user=user, skill_name=data["skill"])
                skill.save()
            if data["action"] == "add-skill":
                return redirect(url_data["this_url"])
            else:
                return redirect(url_data["next_url"])
    else:
        form = SkillsForm()

    return render(request, "skills.html", {"form": form, "skills": skills, "user_skills": user_skills, **url_data})


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
    this_url = reverse("pages", args=(page_name,))
    next_url = next_page and reverse("pages", args=(next_page,))

    if page_name in view_map:
        url_data = {
            "index": index,
            "prev_page": prev_page,
            "next_page": next_page,
            "prev_url": prev_url,
            "this_url": this_url,
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
