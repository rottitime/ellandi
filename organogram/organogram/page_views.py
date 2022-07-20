from django import forms
from django.contrib.auth import login
from django.forms.models import model_to_dict
from django.http import Http404
from django.shortcuts import redirect, render
from django.urls import reverse

from organogram.registration import initial_data, models

page_names = ("intro", "create-account", "your-details", "biography", "photo", "grade", "professions", "skills", "complete")


view_map = {}


def register(name):
    def _inner(func):
        view_map[name] = func
        return func

    return _inner


def get_values(model, query_kwargs=None):
    query = model.objects.all()
    if query_kwargs:
        query = query.filter(**query_kwargs)
    values = tuple({"value": item.slug, "text": item.name} for item in query.all())
    return values


def get_choices(model):
    choices = tuple((item.slug, item.name) for item in model.objects.all())
    return choices


class IntroForm(forms.Form):
    understand = forms.BooleanField()


@register("intro")
def intro_view(request, url_data):
    if request.method == "POST":
        form = IntroForm(request.POST)
        if form.is_valid():
            return redirect(url_data["next_url"])
    else:
        form = IntroForm()

    return render(request, "intro.html", {"form": form, **url_data})


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

        email_exists = models.User.objects.filter(email=email).exists()
        if email_exists:
            self.add_error("email", "There is already a user with that email")

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
    job_title = forms.CharField(max_length=128, required=False)
    business_unit = forms.CharField(max_length=128, required=False)
    sub_unit = forms.CharField(max_length=128, required=False)
    team = forms.CharField(max_length=128, required=False)
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


class BiographyForm(forms.Form):
    biography = forms.CharField(max_length=4095, required=False)


@register("biography")
def biography_view(request, url_data):
    if request.method == "POST":
        form = BiographyForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = request.user
            user.biography = data["biography"]
            user.save()
            return redirect(url_data["next_url"])
    else:
        data = model_to_dict(request.user)
        form = BiographyForm(data)

    return render(request, "biography.html", {"form": form, **url_data})


class PhotoForm(forms.Form):
    photo = forms.FileField(required=False)


@register("photo")
def photo_view(request, url_data):
    if request.method == "POST":
        form = PhotoForm(request.POST, request.FILES)
        if form.is_valid():
            data = form.cleaned_data
            if data["photo"]:
                user = request.user
                user.photo = request.FILES["photo"]
                user.save()
            return redirect(url_data["next_url"])
    else:
        data = model_to_dict(request.user)
        form = PhotoForm(data)

    return render(request, "photo.html", {"form": form, **url_data})


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
    other = forms.CharField(max_length=128, required=False)


@register("professions")
def professions_view(request, url_data):
    professions = get_values(models.Profession, query_kwargs={"show": True})
    if request.method == "POST":
        form = ProfessionsForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            user = request.user
            for value in data["professions"]:
                profession = models.Profession.objects.get(pk=value)
                user.professions.add(profession)
            if data["other"]:
                profession = models.Profession(
                    name=data["other"],
                    show=False,
                )
                profession.save()
                user.professions.add(profession)
            user.save()
            return redirect(url_data["next_url"])
    else:
        data = model_to_dict(request.user)
        form = ProfessionsForm(data)

    return render(request, "professions.html", {"form": form, "professions": professions, **url_data})


def get_skills_choices():
    skills = set(models.UserSkill.objects.all().values_list("skill_name", flat=True))
    skills = initial_data.INITIAL_SKILLS.union(skills)
    skills = tuple((skill, skill) for skill in skills)
    return skills


class SkillsForm(forms.Form):
    skill = forms.ChoiceField(required=False, choices=get_skills_choices)
    new_skill = forms.CharField(max_length=128, required=False)
    level = forms.ChoiceField(required=False, choices=models.UserSkill.SkillLevel.choices)
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
                skill = models.UserSkill(user=user, skill_name=data["new_skill"], level=data["level"])
                skill.save()
            if data["skill"]:
                skill = models.UserSkill(user=user, skill_name=data["skill"], level=data["level"])
                skill.save()
            if data["action"] == "add-skill":
                return redirect(url_data["this_url"])
            else:
                return redirect(url_data["next_url"])
    else:
        form = SkillsForm()

    return render(request, "skills.html", {"form": form, "skills": skills, "user_skills": user_skills, **url_data})


def page_view(request, page_name="intro"):
    if page_name not in page_names:
        raise Http404()

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
    else:
        return render(
            request,
            template_name=f"{page_name}.html",
            context={
                "prev_page": prev_page,
                "next_page": next_page,
                "prev_url": prev_url,
                "next_url": next_url,
            },
        )
