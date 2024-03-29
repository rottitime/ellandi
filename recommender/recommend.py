from datetime import datetime

import models
import numpy as np
import pandas as pd
import scipy
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from tqdm import tqdm


def make_skill_similarity_matrix():
    """Queries skills from NLP and the database, and creates a skill similarity matrix that is returned as a sparse
    matrix"""

    nlp_skill_df = models.return_nlp_user_skills()[["user_id", "skill_name", "rating"]]
    db_user_skills = pd.DataFrame(models.get_user_skills())

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
    """Obtains user skills and NLP generated jobs, and uses a hard_coded sentence transformer models (hard coded but
    can be changed) to product a list of embeddings.

    Returns a pandas dataframe with a row per job"""

    model_name = "all-MiniLM-L6-v2"

    user_skill = models.get_user_title_skills()
    nlp_jobs_df = models.return_nlp_user_skills()[["user_id", "job_title"]]

    if len(user_skill) > 0:
        qs = pd.DataFrame(user_skill)[["user_id", "job_title"]]
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
    top_skill = np.flip(sparse_df.columns[np.argsort(similar_skills, axis=1)][:, -(skill_return_count + 1) : -1])
    return top_skill[0]


def return_all_title_recommendations(user_skills, job_embeddings):
    """Given  a list of all user skills, and previously generated job embeddings, returns likely skills

    The number of skills returned is a hard coded value (default to 10), as is the model name.
    The model assumes no skill ratings are provided (and defaults to each having a score of 1)
    """
    min_unique_job_count = 3
    returned_skill_count = 10

    job_in_db = list(models.get_common_jobs())
    nlp_jobs = models.return_nlp_user_skills()
    job_count = nlp_jobs[["user_id", "job_title"]].drop_duplicates().groupby("job_title").count().reset_index()
    unique_nlp_jobs = list(job_count[job_count["user_id"] >= min_unique_job_count]["job_title"].unique())

    if len(job_in_db) > 0:
        combined_meaningful_job_list = job_in_db + unique_nlp_jobs
    else:
        combined_meaningful_job_list = unique_nlp_jobs

    long_skills = user_skills[["user_id", "skill_name", "rating"]]

    skill_count = long_skills[["user_id", "skill_name"]].groupby("skill_name").count().reset_index()

    popular_skills = skill_count[skill_count["user_id"] > 2]["skill_name"].to_list()

    common_skill_df = long_skills[long_skills["skill_name"].isin(popular_skills)].copy()

    job_embeddings = job_embeddings[(job_embeddings.index.isin(combined_meaningful_job_list))].copy()

    sparse_df = (
        common_skill_df.groupby(["user_id", "skill_name"])["rating"].sum().astype("Sparse[int]").unstack(fill_value=0)
    )

    all_df = []

    for index, row in tqdm(job_embeddings.iterrows()):
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

        returned_skills = list(similar_skill_dist.iloc[0:returned_skill_count].index)
        skill_df = pd.DataFrame(returned_skills)
        skill_df.columns = ["recommended_skill"]
        skill_df["source_value"] = current_title
        all_df.append(skill_df)

    all_recommendations = pd.concat(all_df)
    return all_recommendations


def main():
    """Runs the recommendation process"""
    job_embedding_matrix = create_job_embedding_matrix()
    skill_similarity_matrix = make_skill_similarity_matrix()
    current_db_skills = pd.DataFrame(models.get_user_title_skills())
    nlp_skills = models.return_nlp_user_skills()
    combined_user_skills = pd.concat([current_db_skills, nlp_skills]).reset_index(drop=True)
    skill_df = combined_user_skills[["user_id", "skill_name", "rating"]].drop_duplicates().reset_index(drop=True)
    all_recommendations = return_all_title_recommendations(combined_user_skills, job_embedding_matrix)
    all_recommendations["created_at"] = datetime.now()
    all_recommendations["modified_at"] = datetime.now()
    all_recommendations["source_type"] = "Job title"
    models.insert_titles((dict(title) for index, title in all_recommendations.iterrows()))
    all_skill_recommendations_list = []
    for unique_skill in tqdm(combined_user_skills["skill_name"].unique()):
        recommended_skills = get_similar_skills(skill_df, unique_skill, skill_similarity_matrix)

        recommended_skills = pd.DataFrame(recommended_skills)
        recommended_skills.columns = ["recommended_skill"]
        recommended_skills["created_at"] = datetime.now()
        recommended_skills["modified_at"] = datetime.now()
        recommended_skills["source_type"] = "Skill"
        recommended_skills["source_value"] = unique_skill
        all_skill_recommendations_list.append(recommended_skills)

    combined_recommendations = pd.concat(all_skill_recommendations_list).reset_index(drop=True)
    models.insert_skills((dict(skill) for index, skill in combined_recommendations.iterrows()))


if __name__ == "__main__":
    main()
