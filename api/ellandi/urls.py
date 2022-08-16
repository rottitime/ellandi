import knox.views
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from ellandi import auth
from ellandi.registration import views


api_urlpatterns = [
    path("", include(views.registration_router.urls)),
    path("me", views.me_view, name="me"),
    path("me/skills/", views.me_skills_view, name="me-skills"),
    path("me/languages/", views.me_languages_view, name="me-languages"),
    path("me/skills-develop/", views.me_skills_develop_view, name="me-skills-develop"),
    path("me/skills/<str:skill_id>/", views.me_skill_delete_view, name="me-skill-delete"),
    path("me/languages/<str:language_id>/", views.me_language_delete_view, name="me-language-delete"),
    path("me/skills-develop/<str:skill_develop_id>/", views.me_skill_develop_delete_view, name="me-skill-develop-delete"),
    path("users/<str:user_id>/skills/", views.user_skills_view, name="user-skills"),
    path("users/<str:user_id>/languages/", views.user_languages_view, name="user-languages"),
    path("users/<str:user_id>/skills-develop/", views.user_skills_develop_view, name="user-skill-develop"),
    path("users/<str:user_id>/skills/<str:skill_id>/", views.users_skill_delete_view, name="user-skill-delete"),
    path("users/<str:user_id>/languages/<str:language_id>/", views.users_language_delete_view, name="user-language-delete"),
    path(
        "users/<str:user_id>/skills-develop/<str:skill_develop_id>/",
        views.users_skill_develop_delete_view,
        name="user-skill-develop",
    ),
    path("register/", views.register_view, name="register"),
    path("skills/", views.skills_list_view, name="skills"),
    path("one-time-login-token/", views.create_one_time_login_view),
    path("first-time-login/", views.first_log_in_view),
]

schema_urlpatterns = [
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/schema/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]

admin_urlpatterns = [
    path("admin/", admin.site.urls),
]

auth_urlpatterns = [
    path(r"login/", auth.LoginView.as_view(), name="login"),
    path(r"logout/", knox.views.LogoutView.as_view(), name="logout"),
    path(r"logoutall/", knox.views.LogoutAllView.as_view(), name="logoutall"),
]

urlpatterns = api_urlpatterns + admin_urlpatterns + schema_urlpatterns + auth_urlpatterns
