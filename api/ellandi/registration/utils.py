def reverse_dict_lists(initial_dict):
    skill_map = {}
    pairs = ((job_title, key) for (key, value) in initial_dict.items() for job_title in value)
    for job_title, skill in pairs:
        skill_map.setdefault(job_title, []).append(skill)
    return skill_map
