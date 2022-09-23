import random

import numpy as np
import pandas as pd
import scipy
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


def make_skill_similarity_matrix(long_skill_df):
    """given pandas dataframe list of users (user_id), skills (skill_name) and numeric ratings (rating)
    , returns a matrix of skill similarity"""

    # create a long dataframe with all our users and skills
    sparse_df = (
        long_skill_df.groupby(["user_id", "skill_name"])["rating"].sum().astype("Sparse[int]").unstack(fill_value=0)
    )
    # convert to sparse array to conserve memory
    skills_sparse = scipy.sparse.csr_matrix(sparse_df.values)

    # measure cosine similarity, and highlight most similar skills
    similarity_matrix = cosine_similarity(skills_sparse.T)
    return similarity_matrix


def get_similar_skills(long_skill_df, skill_name, similarity_matrix):
    """given a pandas dataframe of user_id and skill_name and rating, returns a matrix of skill similarity based on
    common use"""

    skill_return_count = 10

    sparse_df = (
        long_skill_df.groupby(["user_id", "skill_name"])["rating"].sum().astype("Sparse[int]").unstack(fill_value=0)
    )

    cosine_sim = similarity_matrix
    risk_index = np.where(sparse_df.columns == skill_name)
    similar_skills = cosine_sim[risk_index]
    sorted_skills = np.sort(similar_skills, axis=1)
    top_skill = np.flip(sparse_df.columns[np.argsort(similar_skills, axis=1)][:, -(skill_return_count + 1) : -1])
    top_scores = np.flip(sorted_skills[:, -(skill_return_count + 1) : -1])
    return top_skill, top_scores, cosine_sim


def get_job_embeddings(job_titles):
    """given an array of job titles, returns them as embedding values to be stored"""

    model_name = "all-MiniLM-L6-v2"

    model = SentenceTransformer(model_name)
    # Sentences are encoded by calling model.encode()
    embeddings = model.encode(job_titles)
    embedding_df = pd.DataFrame(index=job_titles, data=embeddings)

    return embedding_df


def get_similar_embedding_jobs(job_title, job_embeddings):
    """given a series of job embeddings, a new title and optionally top N, returns most similar jobs"""

    skill_return_count = 10
    model_name = "all-MiniLM-L6-v2"

    model = SentenceTransformer(model_name)
    job_embedding = model.encode(job_title).reshape((1, 384))

    dist = np.linalg.norm(job_embedding - job_embeddings, axis=1)
    jobs_by_dist = np.argsort(dist)

    return job_embeddings.index[jobs_by_dist][0:skill_return_count]


def return_similar_title_skills(job_title, user_skills, job_embeddings):
    """takes a list of skills per job title, and returns most common skills for similar"""

    skill_count = 10
    model_name = "all-MiniLM-L6-v2"
    missing_ratings = False

    unique_job_titles = user_skills.drop_duplicates(subset=["job_title"]).dropna(axis=0)["job_title"].to_numpy()

    if missing_ratings:
        skills_to_dummy = user_skills[["user_id", "skill_name"]]
        long_skills = skills_to_dummy.copy().rename(columns={"user_id": "user_id"})
        long_skills["rating"] = 1

    else:
        skills_to_dummy = user_skills[["user_id", "skill_name", "rating"]]
        long_skills = skills_to_dummy.copy().rename(columns={"user_id": "user_id"})

    sparse_df = (
        long_skills.groupby(["user_id", "skill_name"])["rating"].sum().astype("Sparse[int]").unstack(fill_value=0)
    )

    model = SentenceTransformer(model_name)
    job_embedding = model.encode(job_title).reshape((1, 384))

    dist = np.linalg.norm(job_embedding - job_embeddings, axis=1)
    jobs_by_dist = np.argsort(dist)

    title_lookup = user_skills[["user_id", "job_title"]].drop_duplicates().set_index("user_id")

    dist_df = pd.DataFrame(columns=["distance", "job_title"])
    dist_df["distance"] = dist
    dist_df["job_title"] = unique_job_titles

    distance_title_df = (
        title_lookup.reset_index()
        .merge(dist_df, right_on="job_title", left_on="job_title", how="left")
        .set_index("user_id")
    )
    comparison_df = (
        distance_title_df.merge(sparse_df, left_index=True, right_index=True)
        .fillna(0)
        .copy()
        .drop(columns=["job_title", "job_title"])
    )
    similar_skill_dist = comparison_df.corr()["distance"].sort_values()

    returned_skills = list(similar_skill_dist.iloc[0:skill_count].index)
    returned_jobs = unique_job_titles[jobs_by_dist][0:skill_count]
    return returned_skills, returned_jobs


def create_skill_similarity_api_call(request, user_query):
    """takes a django request and generates the skill similarity matrix"""

    skill_sample_size = 10000
    nlp_skill_df = pd.read_pickle("nlp_generated_skills.pkl")[["user_id", "skill_name", "rating"]].iloc[
        0:skill_sample_size
    ]

    df = pd.DataFrame.from_records(user_query).rename(
        columns={0: "user_id", 1: "skill_id", 2: "skill_name", 3: "job_title"}
    )

    long_df = df[["user_id", "skill_name"]].copy()

    # currently assuming all users have similar competence (1), though we can iterate on this later
    long_df["rating"] = 1
    # todo - fix to uuid
    long_df["user_id"] = long_df["user_id"].astype("string")
    long_df["skill_name"] = long_df["skill_name"].astype("string")
    long_df["rating"] = long_df["rating"].astype("int")

    combined_long_df = pd.concat([long_df, nlp_skill_df]).reset_index(drop=True)

    similarity_matrix = make_skill_similarity_matrix(combined_long_df)

    # currently saving as a numpy array - memory efficient but could be better
    np.save("similarity_matrix.npy", similarity_matrix)


def create_embedding_api_call(request, user_query):
    """given a django query, creates a title embedding matrix and stores as pkl"""

    skill_sample_size = 10000

    nlp_jobs_df = pd.read_pickle("nlp_generated_skills.pkl")[["user_id", "job_title"]].iloc[0:skill_sample_size]

    user_df = pd.DataFrame.from_records(user_query).rename(columns={0: "user_id", 1: "job_title"})
    # todo - fix to uuid
    user_df["user_id"] = user_df["user_id"].astype("string")
    user_df["job_title"] = user_df["job_title"].astype("string")

    df = pd.concat([user_df, nlp_jobs_df]).reset_index(drop=True)
    # converts to numpy array for speed
    unique_job_titles = df.drop_duplicates(subset=["job_title"]).dropna(axis=0)["job_title"].to_numpy()
    embeddings = get_job_embeddings(unique_job_titles)
    embeddings.to_pickle("job_title_embeddings.pkl")


def skill_recommend_api_call(request, user_query, skill_name):
    """takes a django request, a query of all skills and skill name, and returns a list of recommended skills"""

    skill_sample_size = 10000

    nlp_skill_df = pd.read_pickle("nlp_generated_skills.pkl")[["user_id", "skill_name", "rating"]].iloc[
        0:skill_sample_size
    ]

    df = pd.DataFrame.from_records(user_query).rename(
        columns={0: "user_id", 1: "skill_id", 2: "skill_name", 3: "job_title"}
    )

    long_df = df[["user_id", "skill_name"]].copy()

    # currently assuming all users have similar competence (1), though we can iterate on this later
    long_df["rating"] = 1
    # todo - fix to uuid
    long_df["user_id"] = long_df["user_id"].astype("string")
    long_df["skill_name"] = long_df["skill_name"].astype("string")
    long_df["rating"] = long_df["rating"].astype("int")

    combined_df = pd.concat([long_df, nlp_skill_df]).reset_index(drop=True)

    skill_similarity_matrix = np.load("similarity_matrix.npy")

    skill_outputs = get_similar_skills(combined_df, skill_name, skill_similarity_matrix)
    similar_skills = skill_outputs[0]
    return similar_skills


def job_title_recommend_api_call(request, user_query, job_title):
    """takes a django request, a query of all skills and job title, and returns a list of recommended job titles"""

    return_count = 10
    skill_sample_size = 10000

    nlp_jobs_df = pd.read_pickle("nlp_generated_skills.pkl")[["user_id", "skill_name", "job_title", "rating"]].iloc[
        0:skill_sample_size
    ]

    user_df = pd.DataFrame.from_records(user_query).rename(
        columns={0: "user_id", 1: "skill_id", 2: "skill_name", 3: "job_title"}
    )[["user_id", "skill_name", "job_title"]]

    user_df["rating"] = 1

    # todo - fix to uuid
    user_df["user_id"] = user_df["user_id"].astype("string")
    user_df["skill_name"] = user_df["skill_name"].astype("string")
    user_df["job_title"] = user_df["job_title"].astype("string")

    df = pd.concat([user_df, nlp_jobs_df]).reset_index(drop=True)

    loaded_embeddings = pd.read_pickle("job_title_embeddings.pkl")
    similar_title_skills_returns = return_similar_title_skills(job_title, df, loaded_embeddings)
    return similar_title_skills_returns[0]


def combined_recommend_api_call(request, user_query, skills_list, job_title):
    """takes a django request, a query of all skills, a list of skills, and a job title, and returns random selection of recommendations"""

    total_skill_count = 10
    skill_recommendation_count = 5
    title_recommendation_count = 5
    skill_sample_size = 10000

    nlp_jobs_df = pd.read_pickle("nlp_generated_skills.pkl")[["user_id", "skill_name", "job_title", "rating"]].iloc[
        0:skill_sample_size
    ]

    user_df = pd.DataFrame.from_records(user_query).rename(
        columns={0: "user_id", 1: "skill_id", 2: "skill_name", 3: "job_title"}
    )[["user_id", "skill_name", "job_title"]]

    user_df["rating"] = 1

    # todo - fix to uuid
    user_df["user_id"] = user_df["user_id"].astype("string")
    user_df["skill_name"] = user_df["skill_name"].astype("string")
    user_df["job_title"] = user_df["job_title"].astype("string")

    df = pd.concat([user_df, nlp_jobs_df]).reset_index(drop=True)
    skill_similarity_matrix = np.load("similarity_matrix.npy")
    loaded_embeddings = pd.read_pickle("job_title_embeddings.pkl")

    skill_recommended_skills = []

    for skill in skills_list:
        relevant_skills = get_similar_skills(df, skill[0], skill_similarity_matrix)
        skill_recommended_skills.extend(relevant_skills[0].tolist()[0])

    random.shuffle(skill_recommended_skills)
    if len(skill_recommended_skills) < skill_recommendation_count:
        title_recommendation_count = total_skill_count - len(skill_recommended_skills)

    job_title_skills = return_similar_title_skills(job_title, df, loaded_embeddings)[0]

    combined = skill_recommended_skills[0:skill_recommendation_count] + job_title_skills[0:title_recommendation_count]

    return combined
