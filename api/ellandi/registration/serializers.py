from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import serializers

from . import exceptions, models

POSITIVE_INTEGER_FIELD_MAX = 2147483647


def check_email_domain(email):
    email_split = email.lower().split("@")
    domain_name = email_split[-1]
    if domain_name not in settings.ALLOWED_DOMAINS:
        raise exceptions.IncorrectDomainError
    return email


class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Organisation
        fields = ["slug", "name", "order"]


class ContractTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ContractType
        fields = ["slug", "name", "order"]


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Location
        fields = ["slug", "name", "order"]


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Language
        fields = ["slug", "name", "order"]


class ProfessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profession
        fields = ["slug", "name", "order"]


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Grade
        fields = ["slug", "name", "order"]


class LanguageSkillLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LanguageSkillLevel
        fields = ["slug", "name", "order", "description"]


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = ["slug", "name", "order"]


class FunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Function
        fields = ["slug", "name", "order"]


class SkillLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SkillLevel
        fields = ["slug", "name", "order", "description"]


class JobTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.JobTitle
        fields = ["slug", "name", "order"]


class BusinessUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BusinessUnit
        fields = ["slug", "name", "order"]


class LearningTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.LearningType
        fields = ["slug", "name", "order", "description"]


class UserSkillSerializer(serializers.ModelSerializer):
    level = serializers.ChoiceField(
        choices=models.UserSkill.SkillLevel.choices, allow_blank=True, allow_null=True, required=False
    )

    class Meta:
        model = models.UserSkill
        fields = ["id", "user", "name", "level", "validated", "pending", "created_at", "modified_at"]


class UserLanguageSerializer(serializers.ModelSerializer):
    speaking_level = serializers.ChoiceField(
        choices=models.UserLanguage.LanguageLevel.choices, allow_blank=True, allow_null=True, required=False
    )
    writing_level = serializers.ChoiceField(
        choices=models.UserLanguage.LanguageLevel.choices, allow_blank=True, allow_null=True, required=False
    )

    class Meta:
        model = models.UserLanguage
        fields = ["id", "user", "name", "speaking_level", "writing_level", "created_at", "modified_at"]


class UserSkillDevelopSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserSkillDevelop
        fields = ["id", "user", "name", "pending", "created_at", "modified_at"]


class UserSkillSerializerNested(serializers.ModelSerializer):
    level = serializers.ChoiceField(
        choices=models.UserSkill.SkillLevel.choices, allow_blank=True, allow_null=True, required=False
    )

    class Meta:
        model = models.UserSkill
        fields = ["id", "name", "level", "validated", "pending"]


class UserLanguageSerializerNested(serializers.ModelSerializer):
    speaking_level = serializers.ChoiceField(
        choices=models.UserLanguage.LanguageLevel.choices, allow_blank=True, allow_null=True, required=False
    )
    writing_level = serializers.ChoiceField(
        choices=models.UserLanguage.LanguageLevel.choices, allow_blank=True, allow_null=True, required=False
    )

    class Meta:
        model = models.UserLanguage
        fields = ["id", "name", "speaking_level", "writing_level"]


class UserSkillDevelopSerializerNested(serializers.ModelSerializer):
    class Meta:
        model = models.UserSkillDevelop
        fields = ["id", "name", "pending"]


class LearningListSerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        user = self.context["user"]
        updated_items = []
        for item, valid_data in zip(instance, validated_data):
            if item:
                id = item.id
            else:
                id = None
            learning, _ = models.Learning.objects.update_or_create(user=user, id=id, defaults=valid_data)
            updated_items.append(learning)
        return updated_items


class BaseLearningSerializer(serializers.Serializer):
    id = serializers.UUIDField(format="hex_verbose", required=False)
    name = serializers.CharField(max_length=255, required=False)
    duration_minutes = serializers.IntegerField(
        max_value=POSITIVE_INTEGER_FIELD_MAX, min_value=0, required=False, allow_null=True
    )
    date_completed = serializers.DateField(required=False, allow_null=True)
    cost_pounds = serializers.IntegerField(
        max_value=POSITIVE_INTEGER_FIELD_MAX, min_value=0, required=False, allow_null=True
    )
    cost_unknown = serializers.BooleanField(required=False)

    class Meta:
        list_serializer_class = LearningListSerializer


class LearningSerializer(BaseLearningSerializer):
    learning_type = serializers.ChoiceField(choices=models.Learning.LearningType.choices, required=False)


class UserSerializer(serializers.ModelSerializer):
    skills = UserSkillSerializerNested(many=True, read_only=False, required=False)
    languages = UserLanguageSerializerNested(many=True, read_only=False, required=False)
    skills_develop = UserSkillDevelopSerializerNested(many=True, read_only=False, required=False)
    email = serializers.CharField(read_only=True)
    professions = serializers.ListField(child=serializers.CharField(), read_only=False, required=False)
    has_direct_reports = serializers.BooleanField(required=False)
    has_reports_access = serializers.BooleanField(read_only=True, source="is_staff")

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
            "is_mentor",
            "is_line_manager",
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
        ]

        for field in single_fields_to_update:
            if field in validated_data:
                value = validated_data[field]
                setattr(instance, field, value)

        # For skills and languages - append to existing lists of skills/langs
        if "skills" in validated_data:
            for skill_data in validated_data["skills"]:
                name = skill_data["name"]
                models.UserSkill.objects.update_or_create(user=instance, name=name, defaults=skill_data)

        if "languages" in validated_data:
            for language_data in validated_data["languages"]:
                name = language_data["name"]
                models.UserLanguage.objects.update_or_create(user=instance, name=name, defaults=language_data)

        if "skills_develop" in validated_data:
            for skill_data in validated_data["skills_develop"]:
                name = skill_data["name"]
                models.UserSkillDevelop.objects.update_or_create(user=instance, name=name, defaults=skill_data)

        instance.save()
        return instance

    class Meta:
        model = get_user_model()
        fields = [
            "id",
            "email",
            "verified",
            "privacy_policy_agreement",
            "first_name",
            "last_name",
            "department",
            "organisation",
            "job_title",
            "business_unit",
            "location",
            "line_manager_email",
            "has_direct_reports",
            "is_line_manager",
            "is_mentor",
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
            "skills_develop",
            "created_at",
            "modified_at",
            "has_reports_access",
        ]
        read_only_fields = ["verified"]


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(validators=[check_email_domain])
    password = serializers.CharField(min_length=8)
    privacy_policy_agreement = serializers.BooleanField(required=False)


class PasswordResetAskSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetUseSerializer(serializers.Serializer):
    new_password = serializers.CharField()


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField()


class EmailSaltSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[check_email_domain])

    class Meta:
        model = models.EmailSalt
        fields = ["email"]


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[check_email_domain])
    one_time_token = serializers.CharField(required=True)

    class Meta:
        model = models.User
        fields = ["email", "one_time_token"]


class OneTimeTokenSerializer(serializers.Serializer):
    one_time_token = serializers.CharField(required=True)


class SkillTitleSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = models.UserSkill
        fields = ["name"]


class IsValidSerializer(serializers.Serializer):
    valid = serializers.BooleanField(required=True)


class CourseSerializer(serializers.ModelSerializer):
    status = serializers.ChoiceField(
        choices=models.Course.Status.choices, allow_blank=True, allow_null=True, required=False
    )
    grades = serializers.MultipleChoiceField(
        choices=models.Course.Grade.choices, allow_blank=True, allow_null=True, required=False
    )
    duration_minutes = serializers.IntegerField(
        max_value=POSITIVE_INTEGER_FIELD_MAX, min_value=0, required=False, allow_null=True
    )
    cost_pounds = serializers.IntegerField(
        max_value=POSITIVE_INTEGER_FIELD_MAX, min_value=0, required=False, allow_null=True
    )

    class Meta:
        model = models.Course
        fields = "__all__"


class InviteCreateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[check_email_domain])

    class Meta:
        model = models.Invite
        fields = ("email", "first_name")


class InviteListSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[check_email_domain])

    class Meta:
        model = models.Invite
        fields = ("email", "first_name", "status")
