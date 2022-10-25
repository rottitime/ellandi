from datetime import datetime

import pandas as pd
from sqlalchemy import create_engine
from suggest.models import (
    create_db_objects,
    return_db_user_title_skills,
    return_nlp_user_skills,
)
from suggest.recommend import (
    create_job_embedding_matrix,
    get_similar_skills,
    make_skill_similarity_matrix,
    return_all_title_recommendations,
)
from suggest.settings_base import DB_URL
from tqdm import tqdm

create_db_objects()

job_embedding_matrix = create_job_embedding_matrix()
skill_similarity_matrix = make_skill_similarity_matrix()


engine = create_engine(DB_URL, echo=True)

current_db_skills = return_db_user_title_skills()

nlp_skills = return_nlp_user_skills()

combined_user_skills = pd.concat([current_db_skills, nlp_skills]).reset_index(drop=True)

skill_df = combined_user_skills[["user_id", "skill_name", "rating"]].drop_duplicates().reset_index(drop=True)

print("creating recommendations by job title")
all_recommendations = return_all_title_recommendations(combined_user_skills, job_embedding_matrix)
all_recommendations.createdAt = datetime.now()
all_recommendations.to_sql("tblTitleRecommendations", engine, if_exists="append")


print("creating recommendations by skills")
for unique_skill in tqdm(combined_user_skills["skill_name"].unique()):
    print("for skill")
    print(unique_skill)
    recommended_skills = get_similar_skills(skill_df, unique_skill, skill_similarity_matrix)
    print(recommended_skills)

    recommended_skills = pd.DataFrame(recommended_skills)
    recommended_skills.columns = ["recommendedSkill"]
    recommended_skills.createdAt = datetime.now()
    recommended_skills.currentSkill = unique_skill

    recommended_skills.to_sql("tblSkillRecommendations", engine, if_exists="append")
