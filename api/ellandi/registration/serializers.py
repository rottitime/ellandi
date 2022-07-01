from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import (
    ContractType,
    Grade,
    Language,
    LanguageSkillLevel,
    Location,
    Organisation,
    Profession,
    UserLanguage,
    UserSkill,
    UserSalt,
)


class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organisation
        fields = ["slug", "name"]


class ContractTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractType
        fields = ["slug", "name"]


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["slug", "name"]


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ["slug", "name"]


class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profession
        fields = ["slug", "name"]


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ["slug", "name"]


class LanguageSkillLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguageSkillLevel
        fields = ["slug", "name"]


class UserSkillSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserSkill
        fields = ["id", "user", "skill_name", "level", "validated"]


class UserLanguageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserLanguage
        fields = ["id", "user", "type", "language", "level"]


class UserSerializer(serializers.HyperlinkedModelSerializer):
    skills = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name="userskill-detail")
    languages = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name="userlanguage-detail")
    email = serializers.CharField(read_only=True)

    class Meta:
        skills = UserSkillSerializer(many=True, read_only=True)
        languages = UserLanguageSerializer(many=True, read_only=True)

        model = get_user_model()
        fields = [
            "id",
            "email",
            "url",
            "first_name",
            "last_name",
            "privacy_policy_agreement",
            "organisation",
            "job_title",
            "grade",
            "profession",
            "contract_type",
            "line_manager_email",
            "location",
            "skills",
            "languages",
        ]


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class UserSaltSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSalt
        fields = ["email"]
