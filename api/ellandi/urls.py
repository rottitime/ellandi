from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from ellandi.registration import views

router = routers.DefaultRouter()
router.register(r"users", views.UserViewSet)
router.register(r"web-error", views.WebErrorViewSet)
router.register(r"user-skills", views.UserSkillViewSet)
router.register(r"organisations", views.OrganisationViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("admin/", admin.site.urls),
]
