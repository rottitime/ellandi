import testino

from ellandi import wsgi


def test_resistration():
    agent = testino.WSGIAgent(wsgi.application, "http://testserver/")
    page = agent.get("/page/create-account")
    assert page.status_code == 200, page.status_code

    form = page.get_form()
    form['email'] = "ed@example.com"
    form['email_confirm'] = "fred@example.com"
    form['password'] = "foo"
    form['password_confirm'] = "boo"

    page = form.submit()

    assert page.has_one("span[data-error='Email does not match']")
    assert page.has_one("span[data-error='Password does not match']")
