from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from ellandi import auth, verification
from ellandi.registration import views

api_urlpatterns = [
    path("", include(views.registration_router.urls)),
    path("me/", views.me_view),
    path("me/skills/", views.me_skills_view),
    path("me/languages/", views.me_languages_view),
    path("me/skills-develop/", views.me_skills_develop_view),
    path("me/skills/<uuid:skill_id>/", views.me_skill_delete_view),
    path("me/languages/<uuid:language_id>/", views.me_language_delete_view),
    path("me/skills-develop/<uuid:skill_develop_id>/", views.me_skill_develop_delete_view),
    path("me/direct-reports/", views.me_direct_reports_view),
    path("me/password-change/", verification.password_change_view),
    path("me/skills-suggested/", views.me_suggested_skills),
    path("me/learning-work/", views.me_learning_work_view),
    path("me/learning-social/", views.me_learning_social_view),
    path("me/learning-formal/", views.me_learning_formal_view),
    path("me/learnings/", views.me_learning_view),
    path("user/<uuid:user_id>/verify/<str:token>/", verification.verification_view),
    path("password-reset/", verification.password_reset_ask_view),
    path("user/<uuid:user_id>/password-reset/<str:token>/", verification.password_reset_use_view),
    path("register/", views.register_view),
    path("skills/", views.skills_list_view),
    path("one-time-login-token/", views.create_one_time_login_view),
    path("first-time-login/", views.first_log_in_view),
    path("create-error/", views.create_error),
]

schema_urlpatterns = [
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema")),
    path("api/schema/redoc/", SpectacularRedocView.as_view(url_name="schema")),
]

admin_urlpatterns = [
    path("admin/", admin.site.urls),
]

auth_urlpatterns = [
    path(r"login/", auth.LoginView.as_view()),
    path(r"logout/", auth.LogoutView.as_view()),
    path(r"logoutall/", auth.LogoutAllView.as_view()),
]

urlpatterns = api_urlpatterns + admin_urlpatterns + schema_urlpatterns + auth_urlpatterns
