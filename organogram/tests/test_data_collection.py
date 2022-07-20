import testino
from django.contrib.auth import get_user_model
from nose.tools import assert_raises

from organogram import wsgi
from organogram.registration import models


def test_favicon():
    agent = testino.WSGIAgent(wsgi.application, "http://testserver/")
    with assert_raises(testino.NotFound):
        agent.get("/favicon.ico")


def _fill_in_user_form(agent):
    page = agent.get("/")
    assert page.status_code == 200, page.status_code

    assert page.has_one("h1:contains('Create an account')")

    form = page.get_form()
    form["email"] = "bob1@example.com"
    form["email_confirm"] = "bob1@example.com"
    form["password"] = "foo"
    form["password_confirm"] = "foo"

    return form


def test_duplicate_user():
    agent = testino.WSGIAgent(wsgi.application, "http://testserver/")

    form = _fill_in_user_form(agent)
    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Your details')")

    form = _fill_in_user_form(agent)

    page = form.submit()
    assert page.has_one("span[data-error='There is already a user with that email']")


def test_resistration():
    agent = testino.WSGIAgent(wsgi.application, "http://testserver/")
    page = agent.get("/")
    assert page.status_code == 200, page.status_code

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
    assert page.has_one("h1:contains('Grade')")

    page = page.click(contains="Back")
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Your details')")

    form = page.get_form()

    form["first_name"] = "Mr"
    form["last_name"] = "Flibble"
    form["job_title"] = "Stuff doer"
    form["business_unit"] = "My Business Unit"
    form["sub_unit"] = "My Sub Unit"
    form["team"] = "The Cool Kids"
    form["line_manager_email"] = "boss@example.com"

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Grade')")

    page = page.click(contains="Back")
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Your details')")

    form = page.get_form()
    assert form["first_name"] == "Mr"
    assert form["last_name"] == "Flibble"
    assert form["job_title"] == "Stuff doer"
    assert form["business_unit"] == "My Business Unit"
    assert form["sub_unit"] == "My Sub Unit"
    assert form["team"] == "The Cool Kids"
    assert form["line_manager_email"] == "boss@example.com"

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Grade')")

    form = page.get_form()
    form.check("Grade 6 Equivalent")

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Profession')")

    form = page.get_form()
    form.check("Government Economic Service")
    form.check("Policy Profession")
    form["other"] = "Flibbler"

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code
    assert page.has_one("h1:contains('Current skills')")

    user = get_user_model().objects.get(email="bob@example.com")
    other_profession = models.Profession.objects.get(slug="flibbler")
    assert other_profession in user.professions.all()

    page = page.click(contains="Back")
    assert not page.has_text("Flibbler")
