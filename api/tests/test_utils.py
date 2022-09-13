from ellandi.registration import utils


def test_reverse_dict_lists():
    initial_dict = {
        "Customer service management": ["Service desk manager"],
        "Data analysis and synthesis": ["Data engineer", "Data architect"],
        "Data communication": ["Data architect"],
        "Data development process": ["Data engineer"],
        "Data governance": ["Data architect"],
        "Data innovation": ["Data engineer", "Data architect"],
    }
    result = utils.reverse_dict_lists(initial_dict)

    expected = {
        "Data architect": ["Data analysis and synthesis", "Data communication", "Data governance", "Data innovation"],
        "Data engineer": ["Data analysis and synthesis", "Data development process", "Data innovation"],
        "Service desk manager": ["Customer service management"],
    }
    assert result.keys() == expected.keys()
    assert set(result["Data engineer"]) == set(expected["Data engineer"])
