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

from settings_base import DB_URL

print(DB_URL)

Base = declarative_base()


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
    __tablename__ = "registration_skillrecommendation"
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime)
    current_skill = Column(String)
    recommended_skill = Column(String)


def create_db_objects():
    """declares and creates all our db objects"""

    DB_URL = os.getenv("DATABASE_URL")
    print("url")
    print(DB_URL)

    Base = declarative_base()
    engine = create_engine(DB_URL)
    # create all dbs
    Base.metadata.create_all(engine)


from sqlalchemy.sql import select

from sqlalchemy import Table, Column, Integer, String

engine = create_engine(DB_URL)

class UserSkills(Base):
    __table__ = Table('registration_userskill', Base.metadata, autoload=True, autoload_with=engine)
class User(Base):
    __table__ = Table('registration_user', Base.metadata, autoload=True, autoload_with=engine)



def return_db_user_skills():
    """returns a pandas dataframe with all user skills"""

    engine = create_engine(DB_URL)

    s = select(UserSkills.user_id, UserSkills.name)

    all_user_skills = pd.read_sql(s, engine)
    all_user_skills["rating"] = 1
    all_user_skills.columns = ["user_id", "skill_name", "rating"]
    all_user_skills["user_id"] = all_user_skills["user_id"].astype("string")

    return all_user_skills

from sqlalchemy.sql.expression import join

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
    joined_tbl = join(User, UserSkills, User.id == UserSkills.user_id)

    query = select(User.id, User.job_title, UserSkills.name).select_from(joined_tbl)

    engine = create_engine(DB_URL)

    all_user_skills = pd.read_sql(query, engine)
    all_user_skills["rating"] = 1
    all_user_skills["user_id"] = all_user_skills["user_id"].astype("string")
    all_user_skills.columns = ["user_id", "job_title", "skill_name", "rating"]

    return all_user_skills


def return_common_jobs():
    """returns a pandas dataframe with all user skills"""

    job_query = select(User.id, User.job_title).select_from(User)

    engine = create_engine(DB_URL)

    jobs_df = pd.read_sql(job_query, engine).reset_index()
    jobs_df.columns = ['id','job_title']

    job_count_df = jobs_df.groupby('id').count().reset_index()
    common_jobs = job_count_df[job_count_df['job_title'] > 2].unique()

    return common_jobs


def return_nlp_user_skills():
    """returns a pandas dataframe of nlp based user skills"""

    nlp_skill_df = pd.read_json("suggest/nlp_generated_skills.json")[["user_id", "job_title", "skill_name", "rating"]].iloc[0:1000]
    return nlp_skill_df
