import json
import pathlib

__here__ = pathlib.Path(__file__).parent

COURSES_FILE = __here__ / ".." / "courses.json"


class Stub:
    def __init__(self, data):
        self._data = data

    def __getattr__(self, name):
        return Stub(self._data.get(name, {}))

    def __bool__(self):
        return bool(self._data)


def process_courses(data):
    for course in data:
        course = Stub(course)
        yield {
            "profession": course.owner.profession or None,
            "grades": course.audiences.grades or [],
        }


def main():
    with COURSES_FILE.open() as f:
        data = json.load(f)

    data = process_courses(data)

    return data


if __name__ == "__main__":
    main()
