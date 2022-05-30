from django.contrib.auth import get_user_model
from rest_framework import serializers

from ..skills.serializers import SkillSerializer

from .models import UserSkill


class UserSerializer(serializers.HyperlinkedModelSerializer):
    skills = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name="userskill-detail")

    class Meta:
        skills = SkillSerializer(many=True, read_only=True)
        model = get_user_model()
        fields = [
            "url",
            "email",
            "first_name",
            "last_name",
            "organisation",
            "job_title",
            "line_manager_email",
            "country",
            "contract_type",
            "skills",
        ]


class WebErrorSerializer(serializers.Serializer):
    message = serializers.CharField(required=True)
    stack = serializers.CharField(required=True)
    userAgent = serializers.CharField(source="user_agent", required=True)  # noqa N815
    fileName = serializers.CharField(source="file_name", required=True)  # noqa N815
    lineNum = serializers.IntegerField(source="line_number", required=True)  # noqa N815
    colNum = serializers.IntegerField(source="column_number", required=True)  # noqa N815
    createdAt = serializers.DateTimeField(source="created_at")  # noqa N815


class UserSkillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserSkill
        fields = ["user", "skill", "level", "validated"]
