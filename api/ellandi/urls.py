import knox.views
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from ellandi import auth, views
from ellandi import views
from ellandi.registration.views import (
    one_time_login_view,
    register_view,
    registration_router,
    first_log_in_view,
    skills_list_view
)
api_urlpatterns = [
    path("", include(registration_router.urls)),
    path("register/", register_view, name="register"),
    path("skills/", skills_list_view, name="skills"),
    path("one-time-login-token/", one_time_login_view),
    path("first-time-login/", first_log_in_view),
]

schema_urlpatterns = [
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/schema/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]

admin_urlpatterns = [
    path("admin/", admin.site.urls),
]

page_urlpatterns = [
    path("page/<int:page_num>", views.page_view),
]

auth_urlpatterns = [
    path(r"login/", auth.LoginView.as_view(), name="login"),
    path(r"logout/", knox.views.LogoutView.as_view(), name="logout"),
    path(r"logoutall/", knox.views.LogoutAllView.as_view(), name="logoutall"),
]

urlpatterns = api_urlpatterns + admin_urlpatterns + schema_urlpatterns + page_urlpatterns + auth_urlpatterns
