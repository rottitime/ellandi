import random

import numpy as np
import pandas as pd
import scipy
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


def make_skill_similarity_matrix(long_skill_df):
    """Given pandas dataframe of users (user_id), skills (skill_name) and numeric ratings (rating)
    , returns a matrix of skill similarity"""

    sparse_df = (
        long_skill_df.groupby(["user_id", "skill_name"])["rating"].sum().astype("Sparse[int]").unstack(fill_value=0)
    )
    # convert to sparse array to conserve memory
    skills_sparse = scipy.sparse.csr_matrix(sparse_df.values)

    similarity_matrix = cosine_similarity(skills_sparse.T)
    return similarity_matrix


def get_similar_skills(long_skill_df, skill_name, similarity_matrix):
    """Given a pandas dataframe of user_id, skill_name, and rating, returns a matrix of skill similarity based on
    other users the data

    skill_return_count is a hard coded value (default to 10) to specify number of skill returned."""

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
    """Given an array of job titles, uses a SentenceTransformer model to concert the array to embeddings,
    and returns the embeddings values to be stored

    The model_name (taken from sentence_transformers) is a hard coded value, and can be changed to any of the models"""

    model_name = "all-MiniLM-L6-v2"

    model = SentenceTransformer(model_name)
    # Sentences are encoded by calling model.encode()
    embeddings = model.encode(job_titles)
    embedding_df = pd.DataFrame(index=job_titles, data=embeddings)

    return embedding_df


def return_similar_title_skills(job_title, user_skills, job_embeddings):
    """Given a job title, a list of all user skills, and previously generated job embeddings, returns likely skills

    The number of skills returned is a hard coded value (default to 10), as is the model name.
    The model assumes no skill ratings are provided (and defaults to each having a score of 1)
    """

    skill_count = 60
    model_name = "all-MiniLM-L6-v2"
    missing_ratings = False

    if job_title not in job_embeddings.index.to_list():
        user_skills = user_skills[user_skills["job_title"] != job_title].copy()

    if missing_ratings:
        skills_to_dummy = user_skills[["user_id", "skill_name"]]
        long_skills = skills_to_dummy.copy().rename(columns={"user_id": "user_id"})
        long_skills["rating"] = 1

    else:
        skills_to_dummy = user_skills[["user_id", "skill_name", "rating"]]
        long_skills = skills_to_dummy.copy().rename(columns={"user_id": "user_id"})

    if job_title is None:
        top_skills = (
            long_skills.groupby("skill_name")["rating"]
            .sum()
            .sort_values(ascending=False)
            .iloc[0:skill_count]
            .index.to_list()
        )
        return top_skills, None

    sparse_df = (
        long_skills.groupby(["user_id", "skill_name"])["rating"].sum().astype("Sparse[int]").unstack(fill_value=0)
    )

    model = SentenceTransformer(model_name)
    embeddings = model.encode(job_title)
    job_embedding = embeddings.reshape((1, embeddings.shape[0]))

    dist = np.linalg.norm(job_embedding - job_embeddings, axis=1)

    title_lookup = user_skills[["user_id", "job_title"]].drop_duplicates().set_index("user_id")

    dist_df = pd.DataFrame(columns=["distance", "job_title"])

    dist_df["distance"] = dist
    dist_df["job_title"] = job_embeddings.index.to_list()

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
    return returned_skills


def create_skill_similarity_matrix(user_query):
    """Given a django request with user skill details (from views.generate_skill_similarity) generates a skill
    similarity matrix and saves as a numpy array

    The array is based of the user query as well as a sample of nlp generated skill from nlp_generated_skills.json

    It is stored in the same directory as the script, and is named 'skill_similarity_matrix.npy'"""

    skill_sample_size = 10000

    nlp_skill_df = pd.read_json("nlp_generated_skills.json")[["user_id", "skill_name", "rating"]].iloc[
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

    # todo - add to database in some way
    np.save("similarity_matrix.npy", similarity_matrix)


def create_job_title_embeddings(user_query):
    """Given a django query (from views.create_job_embeddings) produces an embedding matrix of skills and job titles

    User data will be combined with a sample of nlp generated data from nlp_generated_skills.json.
    The sample size is hardcoded (default to 10000), can be reduced to speed up processing time based on load testing

     The final matrix is stored as a pickle file in the api directory"""

    skill_sample_size = 10000

    nlp_jobs_df = pd.read_json("nlp_generated_skills.json")[["user_id", "job_title"]].iloc[0:skill_sample_size]

    if len(user_query) > 0:

        user_df = pd.DataFrame.from_records(user_query).rename(columns={0: "user_id", 1: "job_title"})
        # todo - fix to uuid
        user_df["user_id"] = user_df["user_id"].astype("string")
        user_df["job_title"] = user_df["job_title"].astype("string")

        df = pd.concat([user_df, nlp_jobs_df]).reset_index(drop=True)

    else:
        df = nlp_jobs_df.copy()

    # converts to numpy array for speed
    unique_job_titles = df.drop_duplicates(subset=["job_title"]).dropna(axis=0)["job_title"].to_numpy()
    embeddings = get_job_embeddings(unique_job_titles)

    # todo - add to database in some way
    embeddings.to_pickle("job_title_embeddings.pkl")


def recommend_skill_relevant_skills(user_query, skill_name):
    """Given a Django request of user skills and skill name, combines them with nlp skills to return recommended skills

    User data will be combined with a sample of nlp generated data from nlp_generated_skills.json.
    The sample size is hardcoded (default to 10000), can be reduced to speed up processing time based on load testing

    Returns a list of skills as strings"""

    skill_sample_size = 10000

    nlp_skill_df = pd.read_json("nlp_generated_skills.json")[["user_id", "skill_name", "rating"]].iloc[
        0:skill_sample_size
    ]

    if len(user_query) > 0:

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

    else:
        combined_df = nlp_skill_df.copy()

    try:
        skill_similarity_matrix = np.load("similarity_matrix.npy")
    except FileNotFoundError:
        Exception("no similarity matrix found, it must be created")
        return None

    skill_outputs = get_similar_skills(combined_df, skill_name, skill_similarity_matrix)
    similar_skills = skill_outputs[0]
    return similar_skills


def recommend_relevant_job_skills(user_query, job_title):
    """Given a Django request of user skills and job title, and returns a list of recommended skills for that title

    All existing users skill will be combined with a sample from nlp_generated_skills.json
    """

    skill_sample_size = 10000

    nlp_jobs_df = pd.read_json("nlp_generated_skills.json")[["user_id", "skill_name", "job_title", "rating"]].iloc[
        0:skill_sample_size
    ]

    if len(user_query) > 0:

        user_df = pd.DataFrame.from_records(user_query).rename(
            columns={0: "user_id", 1: "skill_id", 2: "skill_name", 3: "job_title"}
        )[["user_id", "skill_name", "job_title"]]
        user_df["rating"] = 1
        # todo - fix to uuid
        user_df["user_id"] = user_df["user_id"].astype("string")
        user_df["skill_name"] = user_df["skill_name"].astype("string")
        user_df["job_title"] = user_df["job_title"].astype("string")
        df = pd.concat([user_df, nlp_jobs_df]).reset_index(drop=True)

    else:
        df = nlp_jobs_df.copy()

    try:
        loaded_embeddings = pd.read_pickle("job_title_embeddings.pkl")
    except FileNotFoundError:
        Exception("no embeddings found, they must be created")
        return None

    similar_title_skills_returns = return_similar_title_skills(job_title, df, loaded_embeddings)
    return similar_title_skills_returns


def recommend_relevant_user_skills(user_query, skills_list, job_title):
    """Given a Django request of user skills, a list of skills, and a job title, and returns a random selection
    of recommendations, by comining recommendations based on title and each individual skill into a bundle

    Alter hard-coded variables to change the number of recommendations returned, and how many are linked to job title
    or existing skills.  If there are insufficient skills generated by skill similarity, will substitute for job title.
    """

    total_skill_count = 10
    skill_recommendation_count = 5
    title_recommendation_count = 5
    skill_sample_size = 10000

    try:
        skill_similarity_matrix = np.load("similarity_matrix.npy")
    except FileNotFoundError:
        Exception("no skill similarity matrix found, it must be created")
        return None
    try:
        loaded_embeddings = pd.read_pickle("job_title_embeddings.pkl")
    except FileNotFoundError:
        Exception("no embeddings found, they must be created")
        return None

    nlp_jobs_df = pd.read_json("nlp_generated_skills.json")[["user_id", "skill_name", "job_title", "rating"]].iloc[
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

    skill_recommended_skills = []

    if len(skills_list) > 0:

        for skill in skills_list:
            relevant_skills = get_similar_skills(df, skill[0], skill_similarity_matrix)
            skill_recommended_skills.extend(relevant_skills[0].tolist()[0])

    random.shuffle(skill_recommended_skills)
    if len(skill_recommended_skills) < skill_recommendation_count:
        title_recommendation_count = total_skill_count - len(skill_recommended_skills)

    job_title_skills = return_similar_title_skills(job_title, df, loaded_embeddings)

    combined = skill_recommended_skills[0:skill_recommendation_count] + job_title_skills[0:title_recommendation_count]

    return combined


def recommend_skill_from_db(existing_skill):
    """Given an existing skill, queries the pre-baked recommendations from the database"""

    all_entries = Tblskillrecommendations.objects.filter(currentskill=existing_skill).order_by("-createdat").values()
    df = pd.DataFrame(list(all_entries)).drop_duplicates(subset=["recommendedskill"])
    return df["recommendedskill"].tolist()


def recommend_title_from_db(current_title):
    """Given an existing job title, queries the pre-baked recommendations from the database"""

    all_entries = Tbltitlerecommendations.objects.filter(job_title=current_title).order_by("-index").values()
    df = pd.DataFrame(list(all_entries)).drop_duplicates(subset=["recommendedskill"])
    return df["recommendedskill"].tolist()
