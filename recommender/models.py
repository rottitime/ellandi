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
    func,
)
from sqlalchemy.orm import Session, declarative_base
from sqlalchemy.sql import select
from sqlalchemy.sql.expression import join, literal

engine = create_engine(db_url)

base_object = declarative_base()


class UserSkills(base_object):
    __table__ = Table("registration_userskill", base_object.metadata, autoload=True, autoload_with=engine)


class User(base_object):
    __table__ = Table("registration_user", base_object.metadata, autoload=True, autoload_with=engine)


class SkillRecommendation(base_object):
    __table__ = Table("registration_skillrecommendation", base_object.metadata, autoload=True, autoload_with=engine)


class TitleRecommendation(base_object):
    __table__ = Table("registration_titlerecommendation", base_object.metadata, autoload=True, autoload_with=engine)


def get_user_skills():
    """Queries the database and returns a pandas dataframe with all user skills"""
    query = select(UserSkills.user_id, UserSkills.name.label("skill_name"), literal(1).label("rating"))
    result = engine.execute(query).all()
    return result


def get_user_title_skills():
    """Queries the database and returns a pandas dataframe with all user skills and titles"""
    joined_tbl = join(User, UserSkills, User.id == UserSkills.user_id)
    query = select(
        User.id.label("user_id"),
        User.job_title.label("job_title"),
        UserSkills.name.label("skill_name"),
        literal(1).label("rating"),
    ).select_from(joined_tbl)
    engine = create_engine(db_url)
    result = engine.execute(query).all()
    return result


def get_common_jobs():
    """Queries the database and returns a list of job titles that appear over a specific number of times

    The default count for minimum_job_count is hardcoded to 3 as default
    """
    mininum_job_count = 3
    job_query = (
        select(User.job_title)
        .select_from(User)
        .group_by(User.job_title)
        .having(func.count(User.job_title) >= mininum_job_count)
    )
    common_jobs = engine.execute(job_query).scalars().all()
    return common_jobs


def return_nlp_user_skills():
    """Reads the local json file with generated user jobs, and returns a dataframe for processing"""

    nlp_skill_df = pd.read_csv("nlp_generated_skills.csv")[["user_id", "job_title", "skill_name", "rating"]].iloc[
        0:10000
    ]

    return nlp_skill_df


def insert_titles(titles):
    session = Session(engine)
    session.bulk_insert_mappings(TitleRecommendation, titles)
    session.commit()


def insert_skills(skills):
    session = Session(engine)
    session.bulk_insert_mappings(TitleRecommendation, skills)
    session.commit()
