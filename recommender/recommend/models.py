
import pandas as pd
from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, Float, DateTime, LargeBinary
from sqlalchemy import create_engine
from datetime import datetime
import pickle
import numpy as np
from sqlalchemy import Index
from settings_base import DB_URL


class TitleEmbeddingArray(Base):
    __tablename__ = "tblTitleEmbeddings"
    id = Column(Integer, primary_key=True, autoincrement=True)
    jobTitle = Column(Integer)
    variable = Column(Integer)
    value = Column(Float)


class SkillSimilarityArray(Base):
    __tablename__ = "tblSkillArray"
    id = Column(Integer, primary_key=True, autoincrement=True)
    createdAt = Column(DateTime)
    array = Column(LargeBinary)

def create_db_objects():
    """ declares and creates all our db objects"""


    Base = declarative_base()
    engine = create_engine(DB_URL)
    #create all dbs
    Base.metadata.create_all(engine)
