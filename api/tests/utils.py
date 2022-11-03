import functools

import httpx

from ellandi import wsgi
from ellandi.registration.models import (
    User,
    UserLanguage,
    UserSkill,
    UserSkillDevelop,
)

user_data = dict(
    email="jane@example.com",
    first_name="Jane",
    last_name="Green",
    organisation="DfE",
    password="P455w0rd",
    job_title="Software developer",
)

another_user_data = dict(
    email="anotheruser@example.com",
    password="P455w0rd",
)

admin_user_data = dict(
    email="joe@example.com",
    first_name="Joe",
    last_name="Brown",
    organisation="Cabinet Office",
    password="P455w0rd",
    job_title="Policy Analyst",
)

direct_report_data = dict(email="direct_report@example.com", password="P455w0rd", line_manager_email="jane@example.com")


def add_user_skills_etc(user):
    UserSkill(user=user, name="Cake making").save()
    UserLanguage(user=user, name="Dutch").save()
    UserSkillDevelop(user=user, name="Biscuit making").save()


def with_client(func):
    @functools.wraps(func)
    def _inner(*args, **kwargs):
        with httpx.Client(app=wsgi.application, base_url="http://testserver:8000") as client:
            return func(client, *args, **kwargs)

    return _inner


def with_logged_in_client(func):
    @functools.wraps(func)
    def _inner(*args, **kwargs):
        user = User.objects.create_user(**user_data)
        another_user = User.objects.create_user(**another_user_data)
        direct_report = User.objects.create_user(**direct_report_data)
        add_user_skills_etc(another_user)

        with httpx.Client(app=wsgi.application, base_url="http://testserver:8000") as client:
            response = client.post("/api/login/", json={"email": user_data["email"], "password": user_data["password"]})
            assert response.status_code == 200
            token = response.json()["token"]
            assert token

            headers = {"Authorization": f"Token {token}"}
            client.headers = headers
            try:
                return func(client, str(user.id), *args, **kwargs)
            finally:
                User.objects.filter(id=user.id).delete()
                User.objects.filter(id=another_user.id).delete()
                User.objects.filter(id=direct_report.id).delete()

    return _inner


def with_logged_in_admin_client(func):
    @functools.wraps(func)
    def _inner(*args, **kwargs):
        user = User.objects.create_user(**admin_user_data, is_staff=True)

        with httpx.Client(app=wsgi.application, base_url="http://testserver:8000") as client:
            response = client.post(
                "/api/login/", json={"email": admin_user_data["email"], "password": admin_user_data["password"]}
            )
            assert response.status_code == 200
            token = response.json()["token"]
            assert token

            headers = {"Authorization": f"Token {token}"}
            client.headers = headers
            try:
                return func(client, str(user.id), *args, **kwargs)
            finally:
                User.objects.filter(id=user.id).delete()

    return _inner
