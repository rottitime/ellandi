from rest_framework import viewsets

from . import models, serializers


class SkillViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows skills to be viewed or edited.
    """

    queryset = models.Skill.objects.all()
    serializer_class = serializers.SkillSerializer
