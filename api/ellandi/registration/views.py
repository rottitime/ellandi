import os

from django.conf import settings
from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema
from rest_framework import decorators, permissions, routers, status, viewsets
from rest_framework.response import Response
from rest_framework.serializers import ValidationError

from ellandi.verification import send_verification_email

from . import exceptions, initial_data, models, serializers

registration_router = routers.DefaultRouter()


def register(name):
    def _inner(cls):
        registration_router.register(name, cls)
        return cls

    return _inner


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = get_user_model().objects.all().order_by("-created_at")
    serializer_class = serializers.UserSerializer
    http_method_names = ["get", "patch"]


@register("user-skills")
class UserSkillViewSet(viewsets.ModelViewSet):
    queryset = models.UserSkill.objects.all().order_by("user")
    serializer_class = serializers.UserSkillSerializer
    http_method_names = ["get", "post", "patch", "delete"]


@register("user-languages")
class UserLanguageViewSet(viewsets.ModelViewSet):
    queryset = models.UserLanguage.objects.all().order_by("user")
    serializer_class = serializers.UserLanguageSerializer
    http_method_names = ["get", "post", "patch", "delete"]


@register("user-skills-develop")
class UserSkillDevelopViewSet(viewsets.ModelViewSet):
    queryset = models.UserSkillDevelop.objects.all().order_by("user")
    serializer_class = serializers.UserSkillDevelopSerializer
    http_method_names = ["get", "post", "patch", "delete"]


@register("organisations")
class OrganisationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Organisation.objects.all().order_by("name")
    serializer_class = serializers.OrganisationSerializer
    permission_classes = (permissions.AllowAny,)


@register("contract-types")
class ContractTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.ContractType.objects.all().order_by("order")
    serializer_class = serializers.ContractTypeSerializer
    permission_classes = (permissions.AllowAny,)


@register("locations")
class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Location.objects.all().order_by("name")
    serializer_class = serializers.LocationSerializer
    permission_classes = (permissions.AllowAny,)


@register("languages")
class LanguageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Language.objects.all().order_by("name")
    serializer_class = serializers.LanguageSerializer
    permission_classes = (permissions.AllowAny,)


@register("professions")
class ProfessionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Profession.objects.all().order_by("order")
    serializer_class = serializers.ProfessionSerializer
    permission_classes = (permissions.AllowAny,)


@register("grades")
class GradeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Grade.objects.all().order_by("order")
    serializer_class = serializers.GradeSerializer
    permission_classes = (permissions.AllowAny,)


@register("language-skill-levels")
class LanguageSkillLevelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.LanguageSkillLevel.objects.all().order_by("name")
    serializer_class = serializers.LanguageSkillLevelSerializer
    permission_classes = (permissions.AllowAny,)


@register("countries")
class CountryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Country.objects.all().order_by("name")
    serializer_class = serializers.CountrySerializer
    permission_classes = (permissions.AllowAny,)


@register("functions")
class FunctionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Function.objects.all().order_by("order")
    serializer_class = serializers.FunctionSerializer
    permission_classes = (permissions.AllowAny,)


@register("skill-levels")
class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.SkillLevel.objects.all().order_by("order")
    serializer_class = serializers.SkillLevelSerializer
    permission_classes = (permissions.AllowAny,)


@extend_schema(
    request=serializers.RegisterSerializer,
    responses=serializers.UserSerializer,
)
@decorators.api_view(["POST"])
@decorators.permission_classes((permissions.AllowAny,))
def register_view(request):
    serializers.RegisterSerializer(data=request.data).is_valid(raise_exception=True)
    email = request.data.get("email")
    password = request.data.get("password")
    if get_user_model().objects.filter(email=email).exists():
        raise exceptions.RegistrationError()
    user = get_user_model().objects.create_user(email=email, password=password)
    user_data = serializers.UserSerializer(user, context={"request": request}).data
    if settings.SEND_VERIFICATION_EMAIL:
        send_verification_email(user)
    return Response(user_data)


@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.AllowAny,))
def skills_list_view(request):
    existing_skills = set(models.UserSkill.objects.all().values_list("name", flat=True))
    skills_to_develop = set(models.UserSkillDevelop.objects.all().values_list("name", flat=True))
    initial_skills = initial_data.INITIAL_SKILLS.union(initial_data.NLP_DERIVED_SKILLS)
    skills = initial_skills.union(existing_skills)
    skills = skills.union(skills_to_develop)
    skills = sorted(skills)
    return Response(skills)


@extend_schema(request=serializers.EmailSaltSerializer, responses=serializers.OneTimeTokenSerializer)
@decorators.api_view(["POST"])
@decorators.permission_classes((permissions.AllowAny,))
def create_one_time_login_view(request):
    if "email" not in request.data:
        raise exceptions.LoginMissingEmailError
    serializers.EmailSaltSerializer(data=request.data).is_valid(raise_exception=True)
    email = request.data["email"]
    email = email.lower()
    try:
        email_salt = models.EmailSalt.objects.get(email__iexact=email)
    except models.EmailSalt.DoesNotExist:
        email_salt = models.EmailSalt(email=email, salt=os.urandom(16))
    email_salt.save()
    one_time_login_token = email_salt.get_one_time_login()
    return Response(data={"one_time_token": one_time_login_token}, status=status.HTTP_200_OK)


@extend_schema(request=serializers.UserLoginSerializer)
@decorators.api_view(["POST"])
@decorators.permission_classes((permissions.AllowAny,))
def first_log_in_view(request):
    serializers.UserLoginSerializer(data=request.data).is_valid(raise_exception=True)
    email = request.data["email"]
    email = email.lower()
    one_time_token = request.data["one_time_token"]
    try:
        email_salt = models.EmailSalt.objects.get(email__iexact=email)
    except models.EmailSalt.DoesNotExist:
        raise exceptions.LoginNoTokenError
    correct_token = email_salt.get_one_time_login()
    if correct_token != one_time_token:
        raise exceptions.LoginIncorrectTokenError
    models.User.objects.update_or_create(email=email)
    # TODO - in future will change so can only log-in once with same token
    response = Response(status=status.HTTP_201_CREATED)
    return response


@extend_schema(methods=["PATCH"], request=serializers.UserSerializer(many=False))
@decorators.api_view(["GET", "PATCH"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_view(request):
    user = request.user
    if request.method == "GET":
        data = serializers.UserSerializer(user, context={"request": request}).data
        data["id"] = str(user.id)
        return Response(data=data, status=status.HTTP_200_OK)
    elif request.method == "PATCH":
        data = request.data
        serializer = serializers.UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def list_skills_langs(request, user, model_name, field_name):
    """
    For a given user, return the associated skills or languages or skills to develop.
    Specify skills/languages/skills to develop with model_name and field_name.
    """
    model = getattr(models, model_name)
    serializer = getattr(serializers, f"{model_name}Serializer")
    if request.method == "GET":
        qs = model.objects.filter(user=user)
        serializer = serializer(qs, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PATCH":
        data = request.data
        data = {field_name: data}
        serializer = serializers.UserSerializer(user, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(methods=["PATCH"], request=serializers.UserSkillSerializerNested(many=True))
@decorators.api_view(["GET", "PATCH"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_skills_view(request):
    model_name = "UserSkill"
    field_name = "skills"
    return list_skills_langs(request, request.user, model_name=model_name, field_name=field_name)


@extend_schema(methods=["PATCH"], request=serializers.UserLanguageSerializerNested(many=True))
@decorators.api_view(["GET", "PATCH"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_languages_view(request):
    model_name = "UserLanguage"
    field_name = "languages"
    return list_skills_langs(request, request.user, model_name=model_name, field_name=field_name)


@extend_schema(methods=["PATCH"], request=serializers.UserSkillDevelopSerializerNested(many=True))
@decorators.api_view(["GET", "PATCH"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_skills_develop_view(request):
    model_name = "UserSkillDevelop"
    field_name = "skills_develop"
    return list_skills_langs(request, request.user, model_name=model_name, field_name=field_name)


@extend_schema(methods=["PATCH"], request=serializers.UserSkillSerializerNested(many=True))
@decorators.api_view(["GET", "PATCH"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def user_skills_view(request, user_id):
    try:
        user = models.User.objects.get(id=user_id)
    except models.User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    model_name = "UserSkill"
    field_name = "skills"
    return list_skills_langs(request, user, model_name=model_name, field_name=field_name)


@extend_schema(methods=["PATCH"], request=serializers.UserLanguageSerializerNested(many=True))
@decorators.api_view(["GET", "PATCH"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def user_languages_view(request, user_id):
    try:
        user = models.User.objects.get(id=user_id)
    except models.User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    model_name = "UserLanguage"
    field_name = "languages"
    return list_skills_langs(request, user, model_name=model_name, field_name=field_name)


@extend_schema(methods=["PATCH"], request=serializers.UserSkillDevelopSerializerNested(many=True))
@decorators.api_view(["GET", "PATCH"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def user_skills_develop_view(request, user_id):
    try:
        user = models.User.objects.get(id=user_id)
    except models.User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    model_name = "UserSkillDevelop"
    field_name = "skills_develop"
    return list_skills_langs(request, user, model_name=model_name, field_name=field_name)


def skill_lang_delete(user, id, model_name):
    """
    For a given user, delete the skill/language/skill to develop specified by ID.
    model_name - is UserSkill/UserLanguage/UserSkillDevelop
    """
    model_to_delete = getattr(models, model_name)
    try:
        item_to_delete = model_to_delete.objects.get(user=user, id=id)
        item_to_delete.delete()
        return Response(status=status.HTTP_200_OK)
    except model_to_delete.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_skill_delete_view(request, skill_id):
    model_name = "UserSkill"
    return skill_lang_delete(user=request.user, id=skill_id, model_name=model_name)


@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_language_delete_view(request, language_id):
    model_name = "UserLanguage"
    return skill_lang_delete(user=request.user, id=language_id, model_name=model_name)


@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_skill_develop_delete_view(request, skill_develop_id):
    model_name = "UserSkillDevelop"
    return skill_lang_delete(user=request.user, id=skill_develop_id, model_name=model_name)


@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def users_skill_delete_view(request, user_id, skill_id):
    try:
        user = models.User.objects.get(id=user_id)
    except models.User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    model_name = "UserSkill"
    return skill_lang_delete(user=user, id=skill_id, model_name=model_name)


@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def users_language_delete_view(request, user_id, language_id):
    try:
        user = models.User.objects.get(id=user_id)
    except models.User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    model_name = "UserLanguage"
    return skill_lang_delete(user=user, id=language_id, model_name=model_name)


@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def users_skill_develop_delete_view(request, user_id, skill_develop_id):
    try:
        user = models.User.objects.get(id=user_id)
    except models.User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    model_name = "UserSkillDevelop"
    return skill_lang_delete(user=user, id=skill_develop_id, model_name=model_name)


def list_direct_reports(request, user):
    email = user.email
    direct_reports = models.User.objects.filter(line_manager_email=email)
    data = serializers.UserSerializer(direct_reports, many=True).data
    response = Response(data=data, status=status.HTTP_200_OK)
    return response


@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_direct_reports_view(request):
    user = request.user
    return list_direct_reports(request, user)


@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def user_direct_reports_view(request, user_id):
    user = models.User.objects.get(id=user_id)
    return list_direct_reports(request, user)


@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAdminUser,))
def create_error(request):
    """Endpoint to be used for testing."""
    raise Exception("This is the create error endpoint (for testing)")
