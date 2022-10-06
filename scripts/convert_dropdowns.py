"""
Convert JSON data from fixtures to a different structure
- for frontend to prefetch.
"""
import json
import pathlib

ROOT_DIR = pathlib.Path(__file__).parent.parent
INPUT_FOLDER = ROOT_DIR.joinpath("api", "ellandi", "registration", "fixtures", "dropdown")
OUTPUT_FOLDER = ROOT_DIR.joinpath("web", "prefetch")

ENDPOINT_LOOKUP = {
    "businessunits.json": "business-units.json",
    "contracttypes.json": "contract-types.json",
    "jobtitles.json": "job-titles.json",
    "languages.json": "languages.json",
    "languageskilllevels.json": "language-skill-levels.json",
    "skilllevel.json": "skill-levels.json",
}


def convert_dictionary(input_data):
    output_data = []
    for item in input_data:
        converted = {"slug": item["pk"]}
        fields_dict = item["fields"]
        for field in fields_dict:
            converted[field] = fields_dict[field]
        output_data.append(converted)
    orders = [x["order"] for x in output_data]
    if None in orders:
        output_data = sorted(output_data, key=lambda x: x["slug"])
    else:
        output_data = sorted(output_data, key=lambda x: x["order"])
    return output_data


def convert_json_file(input_file, output_file):
    with open(input_file) as fixture_data:
        fixture_dict = json.load(fixture_data)
        output_data = convert_dictionary(fixture_dict)
    with open(output_file, "w") as f:
        json.dump(output_data, f, indent=2)


def convert_all_files():
    dropdowns = INPUT_FOLDER.iterdir()
    for file in dropdowns:
        fixture_filename = file.name
        if fixture_filename.endswith(".json"):
            output_file_name = ENDPOINT_LOOKUP.get(fixture_filename, fixture_filename)
            output_file = OUTPUT_FOLDER.joinpath(output_file_name)
            convert_json_file(input_file=file, output_file=output_file)


if __name__ == "__main__":
    convert_all_files()
