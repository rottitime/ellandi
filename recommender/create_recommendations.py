
from suggest.models import return_db_user_title_skills,  create_db_objects
from suggest.recommend import *
from suggest.settings_base import DB_URL
from datetime import datetime
from sqlalchemy import create_engine
from tqdm import tqdm

create_db_objects()

job_embedding_matrix = create_job_embedding_matrix()
skill_similarity_matrix = make_skill_similarity_matrix()


engine = create_engine(DB_URL, echo=True)

current_db_skills = return_db_user_title_skills()
nlp_skills = return_db_user_title_skills()

combined_user_skills = pd.concat([current_db_skills, nlp_skills]).reset_index(drop=True)

skill_df = combined_user_skills[["user_id", "skill_name", "rating"]].drop_duplicates()


print("creating recommendations by skills")
for unique_skill in tqdm(combined_user_skills["skill_name"].unique()):
    recommended_skills = get_similar_skills(skill_df, unique_skill, skill_similarity_matrix)

    recommended_skills = pd.DataFrame(data=recommended_skills, columns=["recommendedSkill"])
    recommended_skills.createdAt = datetime.now()
    recommended_skills.currentSkill = unique_skill

    recommended_skills.to_sql("tblSkillRecommendations", engine, if_exists="append")

print("creating recommendations by job title")
for job_title in tqdm(combined_user_skills["job_title"].unique()):
    recommended_skills = return_similar_title_skills(job_title, combined_user_skills, job_embedding_matrix)

    recommended_skills = pd.DataFrame(data=recommended_skills, columns=["recommendedSkill"])
    recommended_skills.createdAt = datetime.now()
    recommended_skills.jobTitle = job_title

    recommended_skills.to_sql("tblTitleRecommendations", engine, if_exists="append")
