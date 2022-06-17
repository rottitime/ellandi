from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from drf_spectacular.views import (SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView)

from ellandi.registration import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"web-error", views.WebErrorViewSet)
router.register(r"user-skills", views.UserSkillViewSet)
router.register(r"organisations", views.OrganisationViewSet)
router.register(r"contract-types", views.ContractTypeViewSet)
router.register(r"locations", views.LocationViewSet)
router.register(r"languages", views.LanguageViewSet)

schema_urlpatterns = [
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/schema/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),

]

urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("admin/", admin.site.urls),
] + schema_urlpatterns
