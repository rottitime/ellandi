from datetime import datetime

import pandas as pd
from sqlalchemy import create_engine
from models import (
    create_db_objects,
    return_db_user_title_skills,
    return_nlp_user_skills,
)
from recommend import (
    create_job_embedding_matrix,
    get_similar_skills,
    make_skill_similarity_matrix,
    return_all_title_recommendations,
    main
)
from settings_base import DB_URL
from tqdm import tqdm


main()
