from django.contrib.auth import get_user_model
from rest_framework import routers, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from . import models, serializers

registration_router = routers.DefaultRouter()


def register(name):
    def _inner(cls):
        registration_router.register(name, cls)
        return cls

    return _inner


@register("users")
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = get_user_model().objects.all().order_by("-created_at")
    serializer_class = serializers.UserSerializer

    @action(detail=True, methods=["get"])
    def skills(self, request, pk):
        skills_qs = models.UserSkill.objects.filter(user__id=pk)
        serializer = serializers.UserSkillSerializer(skills_qs, many=True, context={"request": request})
        return Response(serializer.data)


@register("web-error")
class WebErrorViewSet(viewsets.ModelViewSet):
    queryset = models.WebError.objects.all().order_by("-created_at")
    serializer_class = serializers.WebErrorSerializer


@register("user-skills")
class UserSkillViewSet(viewsets.ModelViewSet):
    queryset = models.UserSkill.objects.all().order_by("user")
    serializer_class = serializers.UserSkillSerializer


@register("user-languages")
class UserLanguageViewSet(viewsets.ModelViewSet):
    queryset = models.UserLanguage.objects.all().order_by("user")
    serializer_class = serializers.UserLanguageSerializer


@register("organisations")
class OrganisationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Organisation.objects.all().order_by("name")
    serializer_class = serializers.OrganisationSerializer


@register("contract-types")
class ContractTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.ContractType.objects.all().order_by("name")
    serializer_class = serializers.ContractTypeSerializer


@register("locations")
class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Location.objects.all().order_by("name")
    serializer_class = serializers.LocationSerializer


@register("languages")
class LanguageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Language.objects.all().order_by("name")
    serializer_class = serializers.LanguageSerializer


@register("professions")
class ProfessionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Profession.objects.all().order_by("name")
    serializer_class = serializers.ProfessionSerializer


@register("grades")
class GradeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Grade.objects.all().order_by("name")
    serializer_class = serializers.GradeSerializer


@register("language-skill-levels")
class LanguageSkillLevelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.LanguageSkillLevel.objects.all().order_by("name")
    serializer_class = serializers.LanguageSkillLevelSerializer
