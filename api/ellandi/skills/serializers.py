from rest_framework import serializers

from .models import Skill


class SkillSerializer(serializers.Serializer):
    class meta:
        model = Skill
        ordering = ["-id"]
        fields = (
            "id",
            "name",
            "users",
            "auditing",
            "bookkeeping",
            "communication",
            "design",
            "enthusiasm",
            "microsoft_office",
            "negotiation",
            "project_management",
        )
        extra_kwargs = {"users": {"required": False}}

    name = serializers.CharField(required=True)
    users = serializers.RelatedField(many=True, read_only=True)
    sample_skill = serializers.CharField(required=True)
