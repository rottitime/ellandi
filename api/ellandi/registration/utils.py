
def reverse_dict_lists(initial_dict):
    output_dict = dict()
    all_lists = list(initial_dict.values())
    all_values = {v for value in all_lists for v in value}
    for v in all_values:
        relevant_keys = {k for (k, value) in initial_dict.items() if v in value}
        output_dict[v] = list(relevant_keys)
    return output_dict
