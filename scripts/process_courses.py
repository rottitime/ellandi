import argparse
import json


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


def filter_courses(data):
    for course in data:
        course = Stub(course)
        if course.visibility == "PUBLIC":
            if course.status == "Published":
                yield course


def process_courses(data):
    for course in filter_courses(data):
        types = tuple(set(gather(course.modules, "moduleType")))
        if len(types) > 1:
            course_type = "Blended"
        elif len(types) == 1:
            course_type = types[0].capitalize()
            if course_type == "Elearning":
                course_type = "Online course"
        else:
            course_type = None

        yield {
            "id": course.id,
            "grades": flatten(gather(course.audiences, "grades")),
            "title": course.title,
            "short_description": course.shortDescription,
            "long_description": course.description,
            "learning_outcomes": course.learningOutcomes,
            "visibility": course.visibility,
            "status": course.status,
            "cost_pounds": sum(gather(course.modules, "cost")),
            "duration_minutes": sum(gather(course.modules, "duration")),
            "course_type": course_type,
        }


def main():
    parser = argparse.ArgumentParser(prog="Process courses", description="Process courses file and reduce contents")
    parser.add_argument("--input", type=argparse.FileType("r"), help="The original json file of courses", required=True)
    parser.add_argument("--output", type=argparse.FileType("w"), help="The reduced json file of courses", required=True)
    args = parser.parse_args()
    data = json.load(args.input)

    data = list(process_courses(data))

    json.dump(data, args.output, indent=2)

    return data


if __name__ == "__main__":
    main()
