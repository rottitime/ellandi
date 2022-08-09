from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import (
    ContractType,
    Country,
    EmailSalt,
    Function,
    Grade,
    Language,
    LanguageSkillLevel,
    Location,
    Organisation,
    Profession,
    User,
    UserLanguage,
    UserSkill,
)


class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organisation
        fields = ["slug", "name"]


class ContractTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContractType
        fields = ["slug", "name", "order"]


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
        fields = ["slug", "name", "order"]


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ["slug", "name", "order"]


class LanguageSkillLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = LanguageSkillLevel
        fields = ["slug", "name", "description"]


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ["slug", "name"]


class FunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Function
        fields = ["slug", "name", "order"]


class UserSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSkill
        fields = ["id", "user", "skill_name", "level", "validated", "created_at", "modified_at"]


class UserLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLanguage
        fields = ["id", "user", "type", "language", "level", "created_at", "modified_at"]


class UserSkillSerializerNested(serializers.ModelSerializer):
    class Meta:
        model = UserSkill
        fields = ["skill_name", "level", "validated"]


class UserLanguageSerializerNested(serializers.ModelSerializer):
    class Meta:
        model = UserLanguage
        fields = ["language", "speaking_level", "writing_level"]


class UserSerializer(serializers.ModelSerializer):
    skills = UserSkillSerializerNested(many=True, read_only=False, required=False)
    languages = UserLanguageSerializerNested(many=True, read_only=False, required=False)
    email = serializers.CharField(read_only=True)
    professions = serializers.SlugRelatedField(
        many=True, queryset=Profession.objects.all(), read_only=False, slug_field="name", required=False
    )

    def update(self, instance, validated_data):
        single_fields_to_update = [
            "privacy_policy_agreement",
            "first_name",
            "last_name",
            "department",
            "organisation",
            "job_title",
            "business_unit",
            "location",
            "line_manager_email",
            "grade",
            "grade_other",
            "profession_other",
            "primary_profession",
            "function",
            "function_other",
            "contract_type",
            "contract_type_other",
            "contact_preference",
        ]

        for field in single_fields_to_update:
            if field in validated_data:
                value = validated_data[field]
                setattr(instance, field, value)

        # Replace exisiting professions with new list
        if "professions" in validated_data:
            instance.professions.set(validated_data["professions"])

        # For skills and languages - append to exisiting lists of skills/langs
        if "skills" in validated_data:
            for skill_data in validated_data["skills"]:
                UserSkill.objects.update_or_create(user=instance, **skill_data)

        if "languages" in validated_data:
            for language_data in validated_data["languages"]:
                UserLanguage.objects.update_or_create(user=instance, **language_data)

        instance.save()
        return instance

    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "email",
            "privacy_policy_agreement",
            "first_name",
            "last_name",
            "department",
            "organisation",
            "job_title",
            "business_unit",
            "location",
            "line_manager_email",
            "grade",
            "grade_other",
            "professions",
            "profession_other",
            "primary_profession",
            "function",
            "function_other",
            "contract_type",
            "contract_type_other",
            "contact_preference",
            "skills",
            "languages",
            "created_at",
            "modified_at",
        ]


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class EmailSaltSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSalt
        fields = ["email"]


class UserLoginSerializer(serializers.ModelSerializer):
    one_time_token = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ["email", "one_time_token"]


class OneTimeTokenSerializer(serializers.Serializer):
    one_time_token = serializers.CharField(required=True)
