
from api.ellandi.registration import exceptions, initial_data, models, serializers
import scipy
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from sqlalchemy import Column, Integer, String, Float, DateTime, LargeBinary
from sqlalchemy import create_engine
from datetime import datetime
import pickle
from sqlalchemy.orm import sessionmaker

from models import TitleEmbeddingArray, SkillSimilarityArray, create_db_objects
from settings_base import DB_URL



def make_skill_similarity_matrix():
    nlp_skill_df = pd.read_json("nlp_generated_skills.json")[["user_id", "skill_name", "rating"]]
    qs = models.UserSkill.objects.all().values_list("user__id", "id", "name", "user__job_title")

    if len(qs) > 0:

        df = pd.DataFrame.from_records(qs).rename(
            columns={0: "user_id", 1: "skill_id", 2: "skill_name", 3: "job_title"}
        )

        long_df = df[["user_id", "skill_name"]].copy()

        # currently assuming all users have similar competence (1), though we can iterate on this later
        long_df["rating"] = 1
        # todo - fix to uuid
        long_df["user_id"] = long_df["user_id"].astype("string")
        long_df["skill_name"] = long_df["skill_name"].astype("string")
        long_df["rating"] = long_df["rating"].astype("int")

        skill_compare_df = pd.concat([long_df, nlp_skill_df]).reset_index(drop=True)

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
    """ creates job embeddings from existing list """

    model_name = "all-MiniLM-L6-v2"

    qs = models.UserSkill.objects.all().values_list("user__id", "user__job_title")

    nlp_jobs_df = pd.read_json("nlp_generated_skills.json")[["user_id", "job_title"]]

    if len(qs) > 0:

        user_df = pd.DataFrame.from_records(qs).rename(columns={0: "user_id", 1: "job_title"})
        # todo - fix to uuid
        user_df["user_id"] = user_df["user_id"].astype("string")
        user_df["job_title"] = user_df["job_title"].astype("string")

        df = pd.concat([user_df, nlp_jobs_df]).reset_index(drop=True)

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
    """ given a job and skill matrix, stores both in database for future use"""

    long_titles = job_embeddings_matrix.reset_index().rename(columns={'index':'jobTitle'}).melt(id_vars=['jobTitle'])

    create_db_objects()

    engine = create_engine(DB_URL, echo=True)

    long_titles.to_sql('tblTitleEmbeddings', con=engine, index=False,
                       if_exists='append',
                       dtype={"jobTitle": Integer(),
                     "variable": Integer(),
                     "value": Float()})


    # adapted from https://stackoverflow.com/questions/60278766/best-way-to-insert-python-numpy-array-into-postgresql-database
    current_array = SkillSimilarityArray(createdAt=datetime.now(), array=pickle.dumps(skill_similarity_matrix))

    Session = sessionmaker(bind=engine)
    session = Session()

    session.add(current_array)
    session.commit()

