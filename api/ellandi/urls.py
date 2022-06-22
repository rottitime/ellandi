from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from rest_framework import routers

from ellandi import registration, views

router = routers.DefaultRouter()
router.register(r"organisations", registration.views.OrganisationViewSet)
router.register(r"contract-types", registration.views.ContractTypeViewSet)
router.register(r"locations", registration.views.LocationViewSet)
router.register(r"languages", registration.views.LanguageViewSet)
router.register(r"professions", registration.views.ProfessionViewSet)
router.register(r"grades", registration.views.GradeViewSet)
router.register(r"language-skill-levels", registration.views.LanguageSkillLevelViewSet)
router.register(r"users", registration.views.UserViewSet)
router.register(r"user-skills", registration.views.UserSkillViewSet)
router.register(r"user-languages", registration.views.UserLanguageViewSet)
router.register(r"web-error", registration.views.WebErrorViewSet)


api_urlpatterns = [
    path("", include(router.urls)),
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
