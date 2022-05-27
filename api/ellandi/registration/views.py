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