import argparse
import getpass
import json

import httpx


def get_token_and_url(token=None, base_url=None):
    if not base_url:
        base_url = input("Base url of the site (default http://localhost)") or "http://localhost"

    if not token:
        email = input("Admin email: ")
        password = getpass.getpass("Password: ")
        with httpx.Client(base_url=base_url, timeout=30) as client:
            response = client.post("/api/login/", json={"email": email, "password": password})
            token = response.json()["token"]
            print(f"Got token: {token}")  # noqa T201

    data = {"token": token, "base_url": base_url}
    return data


def load_courses(input_file, base_url, token):
    data = json.load(input_file)

    with httpx.Client(base_url=base_url, timeout=30) as client:
        headers = {"Authorization": f"Token {token}"}
        client.headers = headers

        current_courses = client.get("/api/courses/").json()
        titles = set(course["title"] for course in current_courses)

        for course in data:
            if course["title"] in titles:
                print(f"Not adding {course['title']}")  # noqa T201
            else:
                client.patch("/api/add-course/", json=course)
                print(f"Added {course['title']}")  # noqa T201


def main():
    parser = argparse.ArgumentParser(prog="Add courses", description="Add some courses to a remote server")
    parser.add_argument("--token", default="", help="A login token")
    parser.add_argument("--base_url", default="", help="The base url of the remote server")
    parser.add_argument("--file", type=argparse.FileType("r"), help="The json file of courses", required=True)
    args = parser.parse_args()

    data = get_token_and_url(token=args.token, base_url=args.base_url)
    load_courses(input_file=args.file, **data)


if __name__ == "__main__":
    main()
