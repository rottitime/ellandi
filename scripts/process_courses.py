import json
import pathlib

__here__ = pathlib.Path(__file__).parent

COURSES_FILE = __here__ / ".." / "courses.json"
OUTPUT_FILE = __here__ / ".." / "output.json"


class Stub:
    def __init__(self, data):
        self._data = data

    def __getattr__(self, name):
        if (name == "items") or name.startswith("__"):
            return super().__getattr__(name)
        result = self._data.get(name, {})
        if isinstance(result, dict):
            result = Stub(result)
        return result

    def __bool__(self):
        return bool(self._data)

    def items(self):
        return self._data.items()

    @property
    def __class__(self):
        if not self._data:
            return type(None)
        else:
            return type(self._data)


def gather(seq, name):
    return tuple(item.get(name, ()) for item in seq if item.get(name))


def flatten(seq):
    return tuple(set([subitem for item in seq for subitem in item]))


def process_courses(data):
    for course in data:
        course = Stub(course)
        yield {
            "profession": course.owner.profession,
            "grades": flatten(gather(course.audiences, "grades")),
            "title": course.title,
            "short_description": course.shortDescription,
            "long_description": course.description,
            "learning_outcomes": course.learningOutcomes,
            "visibility": course.visibility,
            "status": course.status,
            "cost": sum(gather(course.modules, "cost")),
            "duration": sum(gather(course.modules, "duration")),
            "types": tuple(set(gather(course.modules, "moduleType"))),
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
