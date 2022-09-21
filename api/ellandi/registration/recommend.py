from sklearn.metrics.pairwise import cosine_similarity
import scipy
import numpy as np
from sentence_transformers import SentenceTransformer
import pandas as pd


def make_skill_similarity_matrix(long_skill_df):
    """given a lit of users and their skills, returns a similarity matrix"""

    #create a long datframe with all our users and skills
    sparse_df = long_skill_df.groupby(["user_id", "skill_name"])['rating'].sum().astype('Sparse[int]').unstack(
        fill_value=0)
    #convert to sparse array to conserve memory
    skills_sparse = scipy.sparse.csr_matrix(sparse_df.values)

    #measure cosine similarity, and highliht most similar skills
    similarity_matrix = cosine_similarity(skills_sparse.T)
    return similarity_matrix

def get_similar_skills(long_skill_df, skill_name, similarity_matrix, n=10):
    """ given a long dataframe of user_id and skill_name and rating, returns a matrix of skill similarity based on common use"""


    #create a long datframe with all our users and skills
    sparse_df = long_skill_df.groupby(["user_id", "skill_name"])['rating'].sum().astype('Sparse[int]').unstack(
        fill_value=0)

    cosine_sim = similarity_matrix
    risk_index = np.where(sparse_df.columns == skill_name)
    similar_skills = cosine_sim[risk_index]
    sorted_skills = np.sort(similar_skills, axis=1)
    top_skill = np.flip(sparse_df.columns[np.argsort(similar_skills, axis=1)][:,-(n+1):-1])
    top_scores = np.flip(sorted_skills[:,-(n+1):-1])
    return top_skill, top_scores, cosine_sim


def get_job_embeddings(job_titles, model_name = 'all-MiniLM-L6-v2'):
    """ given an array of job titles, returns them as embedding values to be stored"""

    model = SentenceTransformer(model_name)
    # Sentences are encoded by calling model.encode()
    embeddings = model.encode(job_titles)
    embedding_df = pd.DataFrame(index=job_titles, data=embeddings)

    return embedding_df

def get_similar_embedding_jobs(job_title, job_embeddings, n=10,model_name = 'all-MiniLM-L6-v2'):
    """ given a series of job embeddings, a new title and optionally top N, returns most similar jobs"""

    model = SentenceTransformer(model_name)
    job_embedding = model.encode(job_title).reshape((1, 384))

    dist = np.linalg.norm(job_embedding - job_embeddings, axis=1)
    jobs_by_dist = np.argsort(dist)

    return job_embeddings.index[jobs_by_dist][0:n]

def return_similar_title_skills(job_title, user_skills, job_embeddings, n=10,model_name = 'all-MiniLM-L6-v2', missing_ratings=True):
    """ takes a list of skills per job title, and returns most common skills for similar"""


    unique_job_titles = user_skills.drop_duplicates(subset=['clean_title']).dropna(axis=0)['clean_title'].to_numpy()

    if missing_ratings:
        skills_to_dummy = user_skills[["vacancy_id", "skill_name"]]
        long_skills = skills_to_dummy.copy().rename(columns={'vacancy_id': 'user_id'})
        long_skills['rating'] = 1

    else :
        skills_to_dummy = user_skills[["vacancy_id", "skill_name","rating"]]
        long_skills = skills_to_dummy.copy().rename(columns={'vacancy_id': 'user_id'})

    sparse_df = long_skills.groupby(["user_id", "skill_name"])['rating'].sum().astype('Sparse[int]').unstack(
        fill_value=0)

    model = SentenceTransformer(model_name)
    job_embedding = model.encode(job_title).reshape((1, 384))

    dist = np.linalg.norm(job_embedding - job_embeddings, axis=1)
    jobs_by_dist = np.argsort(dist)


    title_lookup = user_skills[["vacancy_id", "clean_title"]].drop_duplicates().set_index("vacancy_id")

    dist_df = pd.DataFrame(columns=["distance", "job_title"])
    dist_df["distance"] = dist
    dist_df["job_title"] = unique_job_titles

    distance_title_df = title_lookup.reset_index().merge(dist_df, right_on="job_title", left_on="clean_title",
                                                         how="left").set_index("vacancy_id")
    comparison_df = distance_title_df.merge(sparse_df, left_index=True, right_index=True).fillna(0).copy().drop(
        columns=["clean_title", "job_title"])
    similar_skill_dist = comparison_df.corr()["distance"].sort_values()

    returned_skills = list(similar_skill_dist.iloc[0:n].index)
    returned_jobs =   unique_job_titles[jobs_by_dist][0:n]
    return returned_skills, returned_jobs





