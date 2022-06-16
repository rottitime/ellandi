from django.contrib.auth import get_user_model
from rest_framework import viewsets

from . import models, serializers


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = get_user_model().objects.all().order_by("-created_at")
    serializer_class = serializers.UserSerializer


class WebErrorViewSet(viewsets.ModelViewSet):
    queryset = models.WebError.objects.all().order_by("-created_at")
    serializer_class = serializers.WebErrorSerializer


class UserSkillViewSet(viewsets.ModelViewSet):
    queryset = models.UserSkill.objects.all().order_by("user")
    serializer_class = serializers.UserSkillSerializer


class OrganisationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Organisation.objects.all().order_by("name")
    serializer_class = serializers.OrganisationSerializer


class ContractTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.ContractType.objects.all().order_by("name")
    serializer_class = serializers.ContractTypeSerializer
