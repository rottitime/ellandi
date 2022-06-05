
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response

from . import models, serializers


class SkillViewSet(viewsets.ViewSet):
    """
    A ViewSet for listing or retrieving skills.
    """

    queryset = models.Skill.objects.all()

    def list(self, request):
        queryset = models.Skill.objects.all()
        serializer = serializers.SkillSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = models.Skill.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = serializers.SkillSerializer(user)
        return Response(serializer.data)
