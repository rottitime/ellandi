import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

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

VCAP_SERVICES = env.json("VCAP_SERVICES", default={})

VCAP_APPLICATION = env.json("VCAP_APPLICATION")
HOST_URL = VCAP_APPLICATION["application_uris"][0]
if not HOST_URL.startswith("http"):
    HOST_URL = f"https://{HOST_URL}"

DEV_HOSTS = (
    "localhost",
    "127.0.0.1",
    "testserver",
)

PROD_HOSTS = (
    "ellandi-api-sandbox.london.cloudapps.digital",
    "ellandi-api-temp.london.cloudapps.digital",
    "ellandi-api-develop.london.cloudapps.digital",
    "ellandi-api.london.cloudapps.digital",
)

if DEBUG:
    ALLOWED_HOSTS = DEV_HOSTS
else:
    ALLOWED_HOSTS = DEV_HOSTS + PROD_HOSTS

HOST_MAP = {
    "http://testserver": "http://testserver",
    "http://localhost:8000": "http://localhost:3000",
    "http://127.0.0.1:8000": "http://127.0.0.1:3000",
    "https://ellandi-api-sandbox.london.cloudapps.digital": "https://ellandi-web-sandbox.london.cloudapps.digital",
    "https://ellandi-api-temp.london.cloudapps.digital": "https://ellandi-web-temp.london.cloudapps.digital",
    "https://ellandi-api-develop.london.cloudapps.digital": "https://ellandi-web-develop.london.cloudapps.digital",
    "https://ellandi-api.london.cloudapps.digital": "https://ellandi-web.london.cloudapps.digital",
    "http://api:8000": "http://web:3000",
}

CORS_ALLOWED_ORIGINS = (HOST_URL, HOST_MAP[HOST_URL])

# Application definition

INSTALLED_APPS = [
    "ellandi.registration",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "knox",
    "drf_spectacular",
    "corsheaders",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "ellandi.urls"


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.jinja2.Jinja2",
        "DIRS": [
            BASE_DIR / "ellandi" / "templates",
        ],
        "OPTIONS": {"environment": "ellandi.jinja2.environment"},
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

WSGI_APPLICATION = "ellandi.wsgi.application"

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

REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_AUTHENTICATION_CLASSES": ("knox.auth.TokenAuthentication",),
    "DEFAULT_PARSER_CLASSES": ("rest_framework.parsers.JSONParser",),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
}


SENTRY_DSN = env.str("SENTRY_DSN", default="")
SENTRY_ENVIRONMENT = env.str("SENTRY_ENVIRONMENT", default="")

sentry_sdk.init(
    dsn=SENTRY_DSN,
    integrations=[
        DjangoIntegration(),
    ],
    environment=SENTRY_ENVIRONMENT,
    send_default_pii=False,
    traces_sample_rate=0.0,
)

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

SEND_VERIFICATION_EMAIL = env.bool("SEND_VERIFICATION_EMAIL", default=False)

ALLOW_EXAMPLE_EMAILS = env.bool("ALLOW_EXAMPLE_EMAILS", default=True)
