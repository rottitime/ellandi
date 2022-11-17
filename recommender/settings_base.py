import os

import furl

db_url = os.getenv("DATABASE_URL")

db_url = str(furl.furl(url=db_url, scheme="postgresql"))
