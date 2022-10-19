import json
import pathlib

__here__ = pathlib.Path(__file__).parent

COURSES_FILE = __here__ / ".." / "courses.json"
OUTPUT_FILE = __here__ / ".." / "output.json"


class Stub(dict):
    def __init__(self, data):
        self._data = data

    def __getattr__(self, name):
        if name.startswith("__"):
            return super().__getattr__(name)
        result = self._data.get(name, {})
        if isinstance(result, dict):
            result = Stub(result)
        return result

    def __bool__(self):
        return bool(self._data)


def gather(seq, name):
    return tuple(set([subitem for item in seq for subitem in item.get(name, [])]))


def process_courses(data):
    for course in data:
        course = Stub(course)
        yield {
            "profession": course.owner.profession or None,
            "grades": gather(course.audiences, "grades"),
        }


def main():
    with COURSES_FILE.open() as f:
        data = json.load(f)

    data = list(process_courses(data))

    with OUTPUT_FILE.open("w") as f:
        json.dump(data, f, indent=2)

    return data


if __name__ == "__main__":
    main()
