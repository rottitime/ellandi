import getpass
import json
import pathlib
import sys

import httpx


__here__ = pathlib.Path(__file__).parent
courses_file = __here__ / ".." / "courses-summary.json"


def get_token_and_url(token=None):
    base_url  = input("Base url of the site (default http://localhost)") or "http://localhost"

    if not token:
        email = input("Admin email: ")
        password = getpass.getpass("Password: ")
    with httpx.Client(base_url=base_url) as client:
        response = client.post("/api/login/", json={'email': email, 'password': password})
        print(response)
        print(response.json())
        token = response.json()['token']


    data = {
        'token': token,
        'base_url': base_url
    }
    return data


def load_courses(base_url, token):
    with courses_file.open() as f:
        data = json.load(f)

    with httpx.Client(base_url="http://localhost", timeout=30) as client:
        headers = {"Authorization": f"Token {token}"}
        client.headers = headers

        for course in data:
            client.patch("/api/add-course/", json=course)


def main():
    if len(sys.argv) > 1:
        token = sys.argv[1]
    else:
        token = None
    data = get_token_and_url(token)
    load_courses(**data)


if __name__ == '__main__':
    main()
