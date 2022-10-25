import pickle
from datetime import datetime

import numpy as np
import pandas as pd
from tqdm import tqdm
import scipy
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from sqlalchemy import Float, Integer, create_engine
from sqlalchemy.orm import sessionmaker
from suggest.models import (
    SkillSimilarityArray,
    TitleEmbeddingArray,
    create_db_objects,
    return_common_jobs,
    return_db_user_skills,
    return_db_user_title_skills,
    return_nlp_user_skills,
)
from suggest.settings_base import DB_URL


def make_skill_similarity_matrix():
    nlp_skill_df = return_nlp_user_skills()[["user_id", "skill_name", "rating"]]
    db_user_skills = return_db_user_skills()[["user_id", "skill_name", "rating"]]

    if len(db_user_skills) > 0:
        skill_compare_df = pd.concat([nlp_skill_df, db_user_skills]).reset_index(drop=True)

    else:
        skill_compare_df = nlp_skill_df.copy()

    sparse_df = (
        skill_compare_df.groupby(["user_id", "skill_name"])["rating"].sum().astype("Sparse[int]").unstack(fill_value=0)
    )
    # convert to sparse array to conserve memory
    skills_sparse = scipy.sparse.csr_matrix(sparse_df.values)

    similarity_matrix = cosine_similarity(skills_sparse.T)

    return similarity_matrix


def create_job_embedding_matrix():
    """creates job embeddings from existing list"""

    model_name = "all-MiniLM-L6-v2"

    qs = return_db_user_title_skills()[["user_id", "job_title"]]
    nlp_jobs_df = return_nlp_user_skills()[["user_id", "job_title"]]

    if len(qs) > 0:

        df = pd.concat([qs, nlp_jobs_df]).reset_index(drop=True)

    else:
        df = nlp_jobs_df.copy()

    # converts to numpy array for speed
    unique_job_titles = df.drop_duplicates(subset=["job_title"]).dropna(axis=0)["job_title"].to_numpy()

    model = SentenceTransformer(model_name)
    # Sentences are encoded by calling model.encode()
    embeddings = model.encode(unique_job_titles)
    embedding_df = pd.DataFrame(index=unique_job_titles, data=embeddings)

    return embedding_df


def store_matrices(skill_similarity_matrix, job_embeddings_matrix):
    """given a job and skill matrix, stores both in database for future use"""

    long_titles = job_embeddings_matrix.reset_index().rename(columns={"index": "jobTitle"}).melt(id_vars=["jobTitle"])

    create_db_objects()

    engine = create_engine(DB_URL, echo=True)

    long_titles.to_sql(
        "tblTitleEmbeddings",
        con=engine,
        index=False,
        if_exists="append",
        dtype={"jobTitle": Integer(), "variable": Integer(), "value": Float()},
    )

    # https://stackoverflow.com/questions/60278766/best-way-to-insert-python-numpy-array-into-postgresql-database
    current_array = SkillSimilarityArray(createdAt=datetime.now(), array=pickle.dumps(skill_similarity_matrix))

    Session = sessionmaker(bind=engine)
    session = Session()

    session.add(current_array)
    session.commit()


def return_similar_title_skills(job_title, user_skills, job_embeddings):
    """Given a job title, a list of all user skills, and previously generated job embeddings, returns likely skills

    The number of skills returned is a hard coded value (default to 10), as is the model name.
    The model assumes no skill ratings are provided (and defaults to each having a score of 1)
    """

    if job_title not in job_embeddings.index.to_list():
        return None

    skill_count = 5

    long_skills = user_skills[["user_id", "skill_name", "rating"]]

    sparse_df = (
        long_skills.groupby(["user_id", "skill_name"])["rating"].sum().astype("Sparse[int]").unstack(fill_value=0)
    )

    current_title_index = job_embeddings.index.to_list().index(job_title)

    job_embedding_row = job_embeddings.iloc[current_title_index].to_numpy()
    current_job_embedding = job_embedding_row.reshape((1, job_embedding_row.shape[0]))

    dist = np.linalg.norm(current_job_embedding - job_embeddings, axis=1)

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
    top_skill = np.flip(sparse_df.columns[np.argsort(similar_skills, axis=1)][:, -(skill_return_count + 1): -1])
    return top_skill[0]


def store_skill_recommendations(skill_similarity_matrix):
    """creates recommended skills for all skills, and stores in db"""

    engine = create_engine(DB_URL, echo=True)

    nlp_skill_df = return_nlp_user_skills()
    db_user_skills = return_db_user_skills()
    skill_compare_df = pd.concat([nlp_skill_df, db_user_skills]).reset_index(drop=True)

    for unique_skill in skill_compare_df["skill_name"].unique():
        recommended_skills = get_similar_skills(skill_compare_df, unique_skill, skill_similarity_matrix)

        recommended_skills = pd.DataFrame(data=recommended_skills, columns=["recommendedSkill"])
        recommended_skills.createdAt = datetime.now()
        recommended_skills.currentSkill = unique_skill

        recommended_skills.to_sql("tblSkillRecommendations", engine, if_exists="append")


def store_title_recommendations(job_embeddings):
    """creates recommended skills for all job_titles, and stores in db"""

    engine = create_engine(DB_URL, echo=True)

    qs = return_db_user_title_skills()[["user_id", "job_title"]]
    nlp_jobs_df = return_nlp_user_skills()[["user_id", "job_title"]]

    user_skills = return_db_user_title_skills()

    title_compare_df = pd.concat([qs, nlp_jobs_df]).reset_index(drop=True)

    for job_title in title_compare_df["job_title"].unique():
        recommended_skills = return_similar_title_skills(job_title, user_skills, job_embeddings)

        recommended_skills = pd.DataFrame(data=recommended_skills, columns=["recommendedSkill"])
        recommended_skills.createdAt = datetime.now()
        recommended_skills.jobTitle = job_title

        recommended_skills.to_sql("tblTitleRecommendations", engine, if_exists="append")


def return_all_title_recommendations(user_skills, job_embeddings):
    """Given  a list of all user skills, and previously generated job embeddings, returns likely skills

    The number of skills returned is a hard coded value (default to 10), as is the model name.
    The model assumes no skill ratings are provided (and defaults to each having a score of 1)
    """

    skill_count = 5

    job_in_db = list(return_common_jobs())
    print(job_in_db)
    nlp_jobs = return_nlp_user_skills()
    job_count = nlp_jobs[["user_id", "job_title"]].drop_duplicates().groupby("job_title").count().reset_index()
    unique_nlp_jobs = list(job_count[job_count["user_id"] >= 2]["job_title"].unique())
    print(nlp_jobs)

    if len(job_in_db) > 0:
        combined_meaningful_job_list = job_in_db + unique_nlp_jobs
    else:
        combined_meaningful_job_list = unique_nlp_jobs

    job_embeddings = job_embeddings[job_embeddings.index.isin(combined_meaningful_job_list)].copy()

    long_skills = user_skills[["user_id", "skill_name", "rating"]]

    sparse_df = (
        long_skills.groupby(["user_id", "skill_name"])["rating"].sum().astype("Sparse[int]").unstack(fill_value=0)
    )

    all_df = []

    print("remaining jobs")
    print(job_embeddings.shape[0])

    for index, row in tqdm(job_embeddings.iterrows()):
        print(index)
        current_title = index
        job_embedding_row = row.to_numpy()
        current_job_embedding = job_embedding_row.reshape((1, job_embedding_row.shape[0]))

        dist = np.linalg.norm(current_job_embedding - job_embeddings, axis=1)

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
        print(returned_skills)
        skill_df = pd.DataFrame(returned_skills)
        skill_df.columns = ["recommendedSkill"]
        skill_df["job_title"] = current_title
        all_df.append(skill_df)

    all_recommendations = pd.concat(all_df)
    return all_recommendations
