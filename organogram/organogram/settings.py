from .settings_base import (
    BASE_DIR,
    SECRET_KEY,
    STATIC_ROOT,
    STATIC_URL,
    STATICFILES_DIRS,
    env,
)

SECRET_KEY = SECRET_KEY
STATIC_URL = STATIC_URL
STATICFILES_DIRS = STATICFILES_DIRS
STATIC_ROOT = STATIC_ROOT

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DEBUG", default=False)

VCAP_SERVICES = env.json("VCAP_SERVICES")
VCAP_APPLICATION = env.json("VCAP_APPLICATION")

if VCAP_SERVICES:
    # AWS
    AWS_CREDENTIALS = VCAP_SERVICES["aws-s3-bucket"][0]["credentials"]
    AWS_SECRET_ACCESS_KEY = AWS_CREDENTIALS["aws_secret_access_key"]
    AWS_STORAGE_BUCKET_NAME = AWS_CREDENTIALS["bucket_name"]
    AWS_ACCESS_KEY_ID = AWS_CREDENTIALS["aws_access_key_id"]
    AWS_REGION = AWS_CREDENTIALS["aws_region"]
    AWS_S3_ENDPOINT_URL = minio = env("AWS_S3_ENDPOINT_URL", default=None)  # Needed for MinIO only, not set in PaaS

if DEBUG:
    ALLOWED_HOSTS = [
        "localhost",
        "127.0.0.1",
    ]
else:
    ALLOWED_HOSTS = [
        "digital-organogram.london.cloudapps.digital",
        "organogram-develop.london.cloudapps.digital",
        "organogram-sandbox.london.cloudapps.digital",
        "localhost",
        "127.0.0.1",
        "testserver",
    ]

HOST_URL = VCAP_APPLICATION["application_uris"][0]

# Application definition

INSTALLED_APPS = [
    "organogram.registration",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "organogram.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.jinja2.Jinja2",
        "DIRS": [
            BASE_DIR / "organogram" / "templates",
        ],
        "OPTIONS": {"environment": "organogram.jinja2.environment"},
    },
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "organogram.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        **env.db("DATABASE_URL"),
        **{"ATOMIC_REQUESTS": True},
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "registration.User"

# Email

EMAIL_BACKEND_TYPE = env.str("EMAIL_BACKEND_TYPE")

if EMAIL_BACKEND_TYPE == "FILE":
    EMAIL_BACKEND = "django.core.mail.backends.filebased.EmailBackend"
    EMAIL_FILE_PATH = env.str("EMAIL_FILE_PATH")
elif EMAIL_BACKEND_TYPE == "CONSOLE":
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
elif EMAIL_BACKEND_TYPE == "GOVUKNOTIFY":
    EMAIL_BACKEND = "django_gov_notify.backends.NotifyEmailBackend"
    GOVUK_NOTIFY_API_KEY = env.str("GOVUK_NOTIFY_API_KEY")
    GOVUK_NOTIFY_PLAIN_EMAIL_TEMPLATE_ID = env.str("GOVUK_NOTIFY_PLAIN_EMAIL_TEMPLATE_ID")
else:
    assert EMAIL_BACKEND_TYPE in ("FILE", "CONSOLE", "GOVUKNOTIFY")
