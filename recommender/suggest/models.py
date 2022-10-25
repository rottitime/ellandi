import os

import pandas as pd
from sqlalchemy import (
    Column,
    DateTime,
    Float,
    Integer,
    LargeBinary,
    String,
    create_engine,
)
from sqlalchemy.orm import declarative_base

Base = declarative_base()

DB_URL = os.getenv("DATABASE_URL")


class TitleEmbeddingArray(Base):
    __tablename__ = "tblTitleEmbeddings"
    id = Column(Integer, primary_key=True, autoincrement=True)
    jobTitle = Column(String)
    variable = Column(Integer)
    value = Column(Float)


class SkillSimilarityArray(Base):
    __tablename__ = "tblSkillArray"
    id = Column(Integer, primary_key=True, autoincrement=True)
    createdAt = Column(DateTime)
    array = Column(LargeBinary)


class SkillRecommendations(Base):
    __tablename__ = "tblSkillRecommendations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    createdAt = Column(DateTime)
    currentSkill = Column(String)
    recommendedSkill = Column(String)


def create_db_objects():
    """declares and creates all our db objects"""

    DB_URL = os.getenv("DATABASE_URL")
    print("url")
    print(DB_URL)

    Base = declarative_base()
    engine = create_engine(DB_URL)
    # create all dbs
    Base.metadata.create_all(engine)


def return_db_user_skills():
    """returns a pandas dataframe with all user skills"""

    query = """
    SELECT user_id,
     name
     FROM registration_userskill
    """

    engine = create_engine(DB_URL)

    all_user_skills = pd.read_sql(query, engine)
    all_user_skills["rating"] = 1
    all_user_skills.columns = ["user_id", "skill_name", "rating"]
    all_user_skills["user_id"] = all_user_skills["user_id"].astype("string")

    return all_user_skills


def return_db_user_title_skills():
    """returns a pandas dataframe with all user skills"""

    query = """
    SELECT registration_user.id as user_id,
    job_title,
    registration_userskill.name as skill_name
    FROM registration_user
    INNER JOIN registration_userskill
    ON registration_user.id = registration_userskill.user_id
    """

    engine = create_engine(DB_URL)

    all_user_skills = pd.read_sql(query, engine)
    all_user_skills["rating"] = 1
    all_user_skills["user_id"] = all_user_skills["user_id"].astype("string")
    all_user_skills.columns = ["user_id", "job_title", "skill_name", "rating"]

    return all_user_skills


def return_common_jobs():
    """returns a pandas dataframe with all user skills"""

    query = """
    SELECT job_count,
    job_title
    FROM (SELECT COUNT(id) as job_count,
    job_title
    FROM registration_user
    GROUP BY job_title) AS tblJobCount
    WHERE job_count > 2
    """

    engine = create_engine(DB_URL)

    jobs_df = pd.read_sql(query, engine)
    common_jobs = jobs_df["job_title"].unique()

    return common_jobs


def return_nlp_user_skills():
    """returns a pandas dataframe of nlp based user skills"""

    nlp_skill_df = pd.read_json("suggest/nlp_generated_skills.json")[["user_id", "job_title", "skill_name", "rating"]]
    return nlp_skill_df
