from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from ellandi import views
from ellandi.registration.views import registration_router

api_urlpatterns = [
    path("", include(registration_router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
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

urlpatterns = api_urlpatterns + admin_urlpatterns + schema_urlpatterns + page_urlpatterns
