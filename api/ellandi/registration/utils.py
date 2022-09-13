
def reverse_dict_lists(initial_dict):
    output_dict = dict()
    all_jobs_lists = list(initial_dict.values())
    all_jobs = {job for job_list in all_jobs_lists for job in job_list}
    for job in all_jobs:
        relevant_skills = {skill for (skill, job_list) in initial_dict.items() if job in job_list}
        output_dict[job] = list(relevant_skills)
    return output_dict
