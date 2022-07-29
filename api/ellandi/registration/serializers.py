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
        fields = ["user", "type", "language", "level"]





class UserSerializer(serializers.ModelSerializer):
    skills = UserSkillSerializerNested(many=True, read_only=False, required=False)
    languages = UserLanguageSerializerNested(many=True, read_only=False, required=False)
    email = serializers.CharField(read_only=True)
    professions = serializers.SlugRelatedField(
        many=True, queryset=Profession.objects.all(), read_only=False, slug_field="name", required=False
    )

    def update(self, instance, validated_data):
        single_fields_to_update = [
            "first_name",
            "last_name",
            "privacy_policy_agreement",
            "organisation",
            "job_title",
            "grade",
            "contract_type",
            "line_manager_email",
            "location",
        ]  # TODO - and the rest

        for field in single_fields_to_update:
            value = validated_data.get(field, getattr(instance, field))
            setattr(instance, field, value)
        instance.save()

        # TODO - append professions?
        # professions_to_add = validated_data.get("professions", [])
        # for profession in professions_to_add:
        #     profession_obj = Profession.objects.get(name=profession)
        #     instance.professions.add(profession_obj)

        # TODO - this doesn't delete exisitng - check with Jas/product team?
        skills_list = validated_data.get("skills", [])
        for skill_data in skills_list:
            UserSkill.objects.update_or_create(user=instance, **skill_data)

        languages_list = validated_data.get("languages", [])
        for language_data in languages_list:
            UserLanguage.objects.update_or_create(user=instance, **language_data)

        # TODO - add professions
        return instance

    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "email",
            "url",
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
