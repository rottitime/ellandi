from rest_framework import viewsets
from . import models, serializers


class SkillsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows skills to be viewed or edited.
    """

    queryset = models.Skills.objects.all()  # .order_by("-users")
    serializer_class = serializers.SkillsSerializer
