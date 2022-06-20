from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)
from rest_framework import routers

from ellandi.registration import views

router = routers.DefaultRouter()
router.register(r"organisations", views.OrganisationViewSet)
router.register(r"contract-types", views.ContractTypeViewSet)
router.register(r"locations", views.LocationViewSet)
router.register(r"languages", views.LanguageViewSet)
router.register(r"professions", views.ProfessionViewSet)
router.register(r"grades", views.GradeViewSet)
router.register(r"language-skill-levels", views.LanguageSkillLevelViewSet)
router.register(r"users", views.UserViewSet)
router.register(r"user-skills", views.UserSkillViewSet)
router.register(r"user-languages", views.UserLanguageViewSet)
router.register(r"web-error", views.WebErrorViewSet)


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

urlpatterns = api_urlpatterns + admin_urlpatterns + schema_urlpatterns
