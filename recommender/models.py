import pandas as pd
from settings_base import db_url
from sqlalchemy import (
    Column,
    DateTime,
    Float,
    Integer,
    LargeBinary,
    String,
    Table,
    create_engine,
)
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import select
from sqlalchemy.sql.expression import join

engine = create_engine(db_url)

base_object = declarative_base()


class TitleEmbeddingArray(base_object):
    __tablename__ = "recommend_titleembeddings"
    id = Column(Integer, primary_key=True, autoincrement=True)
    jobTitle = Column(String)
    variable = Column(Integer)
    value = Column(Float)


class SkillSimilarityArray(base_object):
    __tablename__ = "recommend_skillsimilarity"
    id = Column(Integer, primary_key=True, autoincrement=True)
    createdAt = Column(DateTime)
    array = Column(LargeBinary)


class SkillRecommendations(base_object):
    __tablename__ = "registration_skillrecommendation"
    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime)
    current_skill = Column(String)
    recommended_skill = Column(String)


class UserSkills(base_object):
    __table__ = Table("registration_userskill", base_object.metadata, autoload=True, autoload_with=engine)


class User(base_object):
    __table__ = Table("registration_user", base_object.metadata, autoload=True, autoload_with=engine)


def create_db_objects():
    """Declares and creates any database objectes if not previously created as part of API"""

    base_object = declarative_base()
    engine = create_engine(db_url)
    # create all dbs
    base_object.metadata.create_all(engine)


def return_db_user_skills():
    """Queries the database and returns a pandas dataframe with all user skills"""

    engine = create_engine(db_url)

    s = select(UserSkills.user_id, UserSkills.name)

    all_user_skills = pd.read_sql(s, engine)
    all_user_skills["rating"] = 1
    all_user_skills.columns = ["user_id", "skill_name", "rating"]
    all_user_skills["user_id"] = all_user_skills["user_id"].astype("string")

    return all_user_skills


def return_db_user_title_skills():
    """Queries the database and returns a pandas dataframe with all user skills and titles"""

    joined_tbl = join(User, UserSkills, User.id == UserSkills.user_id)

    query = select(User.id, User.job_title, UserSkills.name).select_from(joined_tbl)

    engine = create_engine(db_url)

    all_user_skills = pd.read_sql(query, engine)
    all_user_skills.columns = ["user_id", "job_title", "skill_name"]
    all_user_skills["rating"] = 1
    all_user_skills["user_id"] = all_user_skills["user_id"].astype("string")

    return all_user_skills


def return_common_jobs():
    """Queries the database and returns a list of job titles that appear over a specific number of times

    The default count for minimum_job_count is hardcoded to 3 as default
    """
    mininum_job_count = 3

    job_query = select(User.id, User.job_title).select_from(User)

    engine = create_engine(db_url)

    jobs_df = pd.read_sql(job_query, engine)
    jobs_df.columns = ["id", "job_title"]

    job_count_df = jobs_df.groupby("id").count().reset_index()
    common_jobs = job_count_df[job_count_df["job_title"] > mininum_job_count]["job_title"].unique()

    return common_jobs


def return_nlp_user_skills():
    """Reads the local json file with generated user jobs, and returns a dataframe for processing"""

    nlp_skill_df = pd.read_json("nlp_generated_skills.json")[["user_id", "job_title", "skill_name", "rating"]].iloc[
        0:10000
    ]
    return nlp_skill_df
