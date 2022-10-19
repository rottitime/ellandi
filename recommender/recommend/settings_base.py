import environ

env = environ.Env()

DB_URL = env("DATABASE_URL")

