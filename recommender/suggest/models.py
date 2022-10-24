
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Float, DateTime, LargeBinary
from sqlalchemy import create_engine
import os

Base = declarative_base()



DB_URL = os.getenv('DATABASE_URL')


import pandas as pd



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

class UserSkills(Base):
    __tablename__ = "registration_userskill"
    id = Column(Integer, primary_key=True, autoincrement=True)
    createdAt = Column(DateTime)
    array = Column(LargeBinary)

class SkillRecommendations(Base):
    __tablename__ = "tblSkillRecommendations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    createdAt = Column(DateTime)
    currentSkill = Column(String)
    recommendedSkill = Column(String)

class TitleRecommendations(Base):
    __tablename__ = "tblTitleRecommendations"
    id = Column(Integer, primary_key=True, autoincrement=True)
    createdAt = Column(DateTime)
    jobTitle = Column(String)
    recommendedSkill = Column(String)

def create_db_objects():
    """ declares and creates all our db objects"""

    DB_URL = os.getenv('DATABASE_URL')
    print("url")
    print(DB_URL)

    Base = declarative_base()
    engine = create_engine(DB_URL)
    #create all dbs
    Base.metadata.create_all(engine)


def return_db_user_skills():
    """ returns a pandas dataframe with all user skills"""

    query = """
    SELECT user_id,
     name,
     FROM registration_userskill
    """

    engine = create_engine(DB_URL)

    all_user_skills = pd.read_sql(query, engine)
    all_user_skills['rating'] = 1
    all_user_skills.columns = ["user_id", "skill_name", "rating"]

    return all_user_skills

def return_db_user_title_skills():
    """ returns a pandas dataframe with all user skills"""

    query = """
    SELECT id,
    job_title,
    registration_userskill.name
    FROM registration_user
    INNER JOIN registration_userskill
    ON registration_user.id = registration_userskill.user_id
    """

    engine = create_engine(DB_URL)

    all_user_skills = pd.read_sql(query, engine)
    all_user_skills['rating'] = 1
    all_user_skills.columns = ["user_id", "job_title","skill_name", "rating"]

    return all_user_skills

def return_nlp_user_skills():
    """ returns a pandas dataframe of nlp based user skills"""

    nlp_skill_df = pd.read_json("nlp_generated_skills.json")[["user_id", "job_title","skill_name", "rating"]]
    return nlp_skill_df

