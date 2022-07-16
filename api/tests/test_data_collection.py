import testino

from ellandi import wsgi


def test_resistration():
    agent = testino.WSGIAgent(wsgi.application, "http://testserver/")
    page = agent.get("/page/create-account")
    assert page.status_code == 200, page.status_code

    assert page.has_one("h1:contains('Create an account')")

    form = page.get_form()
    form['email'] = "ed@example.com"
    form['email_confirm'] = "fred@example.com"
    form['password'] = "foo"
    form['password_confirm'] = "boo"

    page = form.submit()

    assert page.has_one("span[data-error='Email does not match']")
    assert page.has_one("span[data-error='Password does not match']")

    form = page.get_form()
    assert form['email'] == "ed@example.com"
    assert form['email_confirm'] == "fred@example.com"
    assert form['password'] == "foo"
    assert form['password_confirm'] == "boo"

    form['email_confirm'] = "ed@example.com"
    form['password_confirm'] = "foo"

    page = form.submit().follow()
    assert page.status_code == 200, page.status_code

    assert page.has_one("h1:contains('Your details')")

    form = page.get_form()

    page = form.submit().follow()

    assert page.status_code == 200, page.status_code

    assert page.has_one("h1:contains('Grade')")
