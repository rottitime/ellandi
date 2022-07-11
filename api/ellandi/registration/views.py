import os

from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema
from rest_framework import decorators, permissions, routers, status, viewsets
from rest_framework.response import Response

from . import exceptions, initial_data, models, serializers

registration_router = routers.DefaultRouter()


def register(name):
    def _inner(cls):
        registration_router.register(name, cls)
        return cls

    return _inner


@register("users")
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = get_user_model().objects.all().order_by("-created_at")
    serializer_class = serializers.UserSerializer
    http_method_names = ["get", "put", "patch"]

    @decorators.action(detail=True, methods=["get"])
    def skills(self, request, pk):
        skills_qs = models.UserSkill.objects.filter(user__id=pk)
        serializer = serializers.UserSkillSerializer(skills_qs, many=True, context={"request": request})
        return Response(serializer.data)

    @decorators.action(detail=True, methods=["get"])
    def languages(self, request, pk):
        languages_qs = models.UserLanguage.objects.filter(user__id=pk)
        serializer = serializers.UserLanguageSerializer(languages_qs, many=True, context={"request": request})
        return Response(serializer.data)


@register("user-skills")
class UserSkillViewSet(viewsets.ModelViewSet):
    queryset = models.UserSkill.objects.all().order_by("user")
    serializer_class = serializers.UserSkillSerializer
    http_method_names = ["get", "post", "put", "patch", "delete"]


@register("user-languages")
class UserLanguageViewSet(viewsets.ModelViewSet):
    queryset = models.UserLanguage.objects.all().order_by("user")
    serializer_class = serializers.UserLanguageSerializer
    http_method_names = ["get", "post", "put", "patch", "delete"]


@register("organisations")
class OrganisationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Organisation.objects.all().order_by("name")
    serializer_class = serializers.OrganisationSerializer


@register("contract-types")
class ContractTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.ContractType.objects.all().order_by("name")
    serializer_class = serializers.ContractTypeSerializer


@register("locations")
class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Location.objects.all().order_by("name")
    serializer_class = serializers.LocationSerializer


@register("languages")
class LanguageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Language.objects.all().order_by("name")
    serializer_class = serializers.LanguageSerializer


@register("professions")
class ProfessionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Profession.objects.all().order_by("name")
    serializer_class = serializers.ProfessionSerializer


@register("grades")
class GradeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Grade.objects.all().order_by("name")
    serializer_class = serializers.GradeSerializer


@register("language-skill-levels")
class LanguageSkillLevelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.LanguageSkillLevel.objects.all().order_by("name")
    serializer_class = serializers.LanguageSkillLevelSerializer


@extend_schema(
    request=serializers.RegisterSerializer,
    responses=serializers.UserSerializer,
)
@decorators.api_view(["POST"])
@decorators.permission_classes((permissions.AllowAny,))
def register_view(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if get_user_model().objects.filter(email=email).exists():
        raise exceptions.RegistrationError()
    user = get_user_model().objects.create_user(email=email, password=password)
    user_data = serializers.UserSerializer(user, context={"request": request}).data
    return Response(user_data)


@decorators.api_view(["GET"])
def skills_list_view(request):
    skills = set(models.UserSkill.objects.all().values_list("skill_name", flat=True))
    skills = initial_data.INITIAL_SKILLS.union(skills)
    return Response(skills)


@extend_schema(request=serializers.EmailSaltSerializer, responses=serializers.OneTimeTokenSerializer)
@decorators.api_view(["POST"])
@decorators.permission_classes((permissions.AllowAny,))
def one_time_login_view(request):
    email = request.data["email"]
    if email:
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
    email = request.data["email"]
    if email:
        email = email.lower()
    else:
        response = Response(data="Email does not exist", status=status.HTTP_400_BAD_REQUEST)
        return response
    one_time_token = request.data["one_time_token"]
    email_salt = models.EmailSalt.objects.get(email__iexact=email)
    correct_token = email_salt.get_one_time_login()
    if correct_token == one_time_token:
        models.User.objects.update_or_create(email=email)
        # Create a new salt, as user can only log-in with token once
        # TODO - in future won't have tokens for users that already exist
        email_salt.salt = os.urandom(16)
        email_salt.save()
        response = Response(status=status.HTTP_201_CREATED)
    else:
        response = Response(data="Incorrect token", status=status.HTTP_400_BAD_REQUEST)
    return response
