import os
import pathlib

import testino
from django.conf import settings
from django.contrib.auth import get_user_model
from nose.tools import assert_raises

from organogram import wsgi
from organogram.registration import models


def test_favicon():
    agent = testino.WSGIAgent(wsgi.application, "http://testserver/")
    with assert_raises(testino.NotFound):
        agent.get("/favicon.ico")


def _fill_in_user_form(agent, data):
    page = agent.get("/create-account")
    assert page.status_code == 200, page.status_code

    assert page.has_one("h1:contains('Create an account')")

    form = page.get_form()
    form["email"] = data["email"]
    form["email_confirm"] = data["email_confirm"]
    form["password"] = data["password"]
    form["password_confirm"] = data["password_confirm"]

    return form


def _get_latest_email_url():
    email_dir = pathlib.Path(settings.EMAIL_FILE_PATH)
    latest_email_path = max(email_dir.iterdir(), key=os.path.getmtime)
    with latest_email_path.open() as f:
        lines = f.readlines()
    url_lines = tuple(line for line in lines if line.startswith("http://testserver/"))
    assert len(url_lines) == 1
    email_url = url_lines[0].strip()
    return email_url


def test_email_verification():
    data = {
        "email": "billy@example.com",
        "email_confirm": "billy@example.com",
        "password": "foo",
        "password_confirm": "foo",
    }

    agent = testino.WSGIAgent(wsgi.application, "http://testserver/")
    form = _fill_in_user_form(agent, data)
    page = form.submit().follow()
    url = _get_latest_email_url()
    page = agent.get(url).follow()

    assert page.path == "/your-details"

    user = get_user_model().objects.get(email=data["email"])
    assert user.verified


def test_duplicate_user():
    data = {
        "email": "bob1@example.com",
        "email_confirm": "bob1@example.com",
        "password": "foo",
        "password_confirm": "foo",
    }

    agent = testino.WSGIAgent(wsgi.application, "http://testserver/")

    form = _fill_in_user_form(agent, data)
    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Your details')")

    form = _fill_in_user_form(agent, data)

    page = form.submit()
    assert page.has_one("span[data-error='There is already a user with that email']")


def test_registration():
    agent = testino.WSGIAgent(wsgi.application, "http://testserver/")
    page = agent.get("/")
    assert page.status_code == 200, page.status_code

    assert page.has_one("h1:contains('Welcome')")
    form = page.get_form()
    form["understand"] = True
    page = form.submit().follow()

    assert page.has_one("h1:contains('Create an account')")

    form = page.get_form()
    form["email"] = "bob@example.com"
    form["email_confirm"] = "fred@example.com"
    form["password"] = "foo"
    form["password_confirm"] = "boo"

    page = form.submit()

    assert page.has_one("span[data-error='Email does not match']")
    assert page.has_one("span[data-error='Password does not match']")

    form = page.get_form()
    assert form["email"] == "bob@example.com"
    assert form["email_confirm"] == "fred@example.com"
    assert form["password"] == "foo"
    assert form["password_confirm"] == "boo"

    form["email_confirm"] = "bob@example.com"
    form["password_confirm"] = "foo"

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Your details')")

    form = page.get_form()

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Team')")

    page = page.click(contains="Back")
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Your details')")

    form = page.get_form()

    form["first_name"] = "Mr"
    form["last_name"] = "Flibble"
    form["job_title"] = "Stuff doer"
    form["line_manager_email"] = "boss@example.com"
    form["organogram_id"] = "5"

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    page = form.submit().follow()
    assert page.status_code == 200, page.status_code

    assert page.has_one("h1:contains('Team')")

    page = page.click(contains="Back")
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Your details')")

    form = page.get_form()
    assert form["first_name"] == "Mr"
    assert form["last_name"] == "Flibble"
    assert form["job_title"] == "Stuff doer"
    assert form["line_manager_email"] == "boss@example.com"
    assert form["organogram_id"] == "5"

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Team')")

    # Submit empty form
    form = page.get_form()
    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Biography')")
    page = page.click(contains="Back")
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Team')")

    form = page.get_form()
    form["other_team"] = "Team name"
    form["other_sub_unit"] = "Sub unit"
    form["other_business_unit"] = "Business unit"
    page = form.submit().follow()

    page = page.click(contains="Back")
    assert page.has_one("option:contains('Business unit | Sub unit | Team name')")
    form = page.get_form()
    form.select("team", "business-unit-_-sub-unit-_-team-name")
    page = form.submit().follow()

    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Biography')")
    form = page.get_form()
    form["biography"] = "blah, blah, blah"
    page = form.submit().follow()

    assert page.has_one("h1:contains('Upload a photo')")

    form = page.get_form()
    page = form.submit().follow()

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Grade')")

    form = page.get_form()
    form.check("Grade 6 Equivalent")

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Profession')")

    form = page.get_form()
    form.check("Economic Service")
    form.check("Policy")
    form["other"] = "Flibbler"

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Primary profession')")

    form = page.get_form()
    form.check("Policy")

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Current skills')")

    user = get_user_model().objects.get(email="bob@example.com")
    other_profession = models.Profession.objects.get(slug="flibbler")
    assert other_profession in user.professions.all()
