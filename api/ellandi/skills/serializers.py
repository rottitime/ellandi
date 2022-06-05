from rest_framework import serializers

from .models import Skill


class SkillSerializer(serializers.Serializer):
    class Meta:
        model = Skill
        ordering = ["-id"]
        fields = (
            "id",
            "name",
            "users",
            "skill",
        )
        extra_kwargs = {"users": {"required": False},
                        "name": {"required": True},
                        "skill": {"required": True}}

    name = serializers.CharField(required=True)
    users = serializers.RelatedField(many=True, queryset=Skill.objects.all())
    skill = serializers.CharField(required=True)
