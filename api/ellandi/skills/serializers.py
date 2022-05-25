from rest_framework import serializers

from .models import Skills


class SkillsSerializer(serializers.Serializer):
    class meta:
        model = Skills
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
    auditing = serializers.CharField(required=True)
    bookkeeping = serializers.CharField(required=True)
    communication = serializers.CharField(required=True)
    design = serializers.CharField(required=True)
    enthusiasm = serializers.CharField(required=True)
    microsoft_office = serializers.CharField(required=True)
    negotiation = serializers.CharField(required=True)
    project_management = serializers.CharField(required=True)
