import os

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from drf_spectacular.utils import OpenApiParameter, OpenApiTypes, extend_schema
from rest_framework import decorators, permissions, routers, status, viewsets
from rest_framework.response import Response

from ellandi.registration.recommend import (
    recommend_skill_from_db,
    recommend_title_from_db
)

from ellandi.verification import send_verification_email

from . import exceptions, initial_data, models, serializers

from ellandi.registration.models import SkillRecommendation, TitleRecommendation


registration_router = routers.DefaultRouter()


def register(name, basename=None):
    def _inner(cls):
        registration_router.register(name, cls, basename=basename)
        return cls

    return _inner


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = get_user_model().objects.all().order_by("-created_at")
    serializer_class = serializers.UserSerializer
    http_method_names = ["get", "patch"]


@extend_schema(parameters=[OpenApiParameter("id", OpenApiTypes.UUID, OpenApiParameter.PATH)])
@register("user-skills", basename="user-skills")
class UserSkillViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSkillSerializer
    http_method_names = ["get", "post", "patch", "delete"]
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        qs = models.UserSkill.objects.filter(user=user)
        return qs


@extend_schema(parameters=[OpenApiParameter("id", OpenApiTypes.UUID, OpenApiParameter.PATH)])
@register("user-languages", basename="user-languages")
class UserLanguageViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserLanguageSerializer
    http_method_names = ["get", "post", "patch", "delete"]
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        qs = models.UserLanguage.objects.filter(user=user)
        return qs


@extend_schema(parameters=[OpenApiParameter("id", OpenApiTypes.UUID, OpenApiParameter.PATH)])
@register("user-skills-develop", basename="user-skills-develop")
class UserSkillDevelopViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSkillDevelopSerializer
    http_method_names = ["get", "post", "patch", "delete"]
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        qs = models.UserSkillDevelop.objects.filter(user=user)
        return qs


@register("all-user-skills")
class AllUserSkillViewSet(viewsets.ModelViewSet):
    queryset = models.UserSkill.objects.all().order_by("user")
    serializer_class = serializers.UserSkillSerializer
    http_method_names = ["get"]
    permission_classes = (permissions.IsAdminUser,)


@register("all-user-languages")
class AllUserLanguageViewSet(viewsets.ModelViewSet):
    queryset = models.UserLanguage.objects.all().order_by("user")
    serializer_class = serializers.UserLanguageSerializer
    http_method_names = ["get"]
    permission_classes = (permissions.IsAdminUser,)


@register("all-user-skills-develop")
class AllUserSkillDevelopViewSet(viewsets.ModelViewSet):
    queryset = models.UserSkillDevelop.objects.all().order_by("user")
    serializer_class = serializers.UserSkillDevelopSerializer
    http_method_names = ["get"]
    permission_classes = (permissions.IsAdminUser,)


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


@register("job-titles")
class JobTitleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.JobTitle.objects.all().order_by("slug")
    serializer_class = serializers.JobTitleSerializer
    permission_classes = (permissions.AllowAny,)


@register("business-units")
class BusinessUnitViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.BusinessUnit.objects.all().order_by("slug")
    serializer_class = serializers.BusinessUnitSerializer
    permission_classes = (permissions.AllowAny,)


@register("learning-types")
class LearningTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.LearningType.objects.all().order_by("order")
    serializer_class = serializers.LearningTypeSerializer
    permission_classes = (permissions.AllowAny,)


@register("courses")
class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Course.objects.all()
    serializer_class = serializers.CourseSerializer
    permission_classes = (permissions.IsAuthenticated,)


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
    privacy_policy_agreement = request.data.get("privacy_policy_agreement")
    if get_user_model().objects.filter(email=email).exists():
        raise exceptions.RegistrationError()
    user = get_user_model().objects.create_user(
        email=email, password=password, privacy_policy_agreement=privacy_policy_agreement
    )
    user_data = serializers.UserSerializer(user, context={"request": request}).data
    if settings.SEND_VERIFICATION_EMAIL:
        send_verification_email(user)
    return Response(user_data)


@extend_schema(request=None, responses=None)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.AllowAny,))
def skills_list_view(request):
    existing_skills = set(models.UserSkill.objects.filter(pending=False).values_list("name", flat=True))
    skills_to_develop = set(models.UserSkillDevelop.objects.filter(pending=False).values_list("name", flat=True))
    initial_skills = initial_data.INITIAL_SKILLS.union(initial_data.NLP_DERIVED_SKILLS).union(
        initial_data.DDAT_SKILLS_TO_JOB_LOOKUP.keys()
    )
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


@extend_schema(request=serializers.UserLoginSerializer, responses=None)
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


@extend_schema(methods=["PATCH"], request=serializers.UserSerializer(many=False), responses=serializers.UserSerializer)
@extend_schema(methods=["GET"], responses=serializers.UserSerializer)
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
            try:
                serializer.save()
            except ValidationError as error:
                return Response(data={"detail": error.message}, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def get_learning(request, learning_type=None, direct_report_id=None):
    user = request.user
    if direct_report_id:
        try:
            user = models.User.objects.get(line_manager_email=user.email, id=direct_report_id)
        except ObjectDoesNotExist:
            raise exceptions.DirectReportError
    queryset = models.Learning.objects.filter(user=user)
    _learning_type = learning_type or request.query_params.get("learning_type", None)
    sortfield = request.query_params.get("sortfield", None)
    if _learning_type:
        queryset = queryset.filter(learning_type=_learning_type)
    if sortfield:
        queryset = queryset.order_by(sortfield)
    serializer = serializers.LearningSerializer(queryset, many=True)
    return Response(serializer.data)


def _get_learning_instance(item, user):
    id = item.get("id", None)
    try:
        learning = models.Learning.objects.get(id=id)
        if learning.user != user:
            raise exceptions.LearningIdError
    except ObjectDoesNotExist:
        learning = None
    return learning


def patch_learning(request, learning_type=None):
    user = request.user
    data = [dict(**item) for item in request.data]
    if learning_type:
        data = [dict(item, **{"learning_type": learning_type}) for item in data]
    instances = [_get_learning_instance(item, user) for item in data]
    serializer = serializers.LearningSerializer(instances, data=data, many=True, context={"user": user})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def make_learning_view(serializer_class, learning_type):
    @extend_schema(
        methods=["PATCH"],
        request=serializer_class(many=True),
        responses=serializers.LearningSerializer(many=True),
    )
    @extend_schema(methods=["GET"], responses=serializer_class(many=True))
    @decorators.api_view(["GET", "PATCH"])
    @decorators.permission_classes((permissions.IsAuthenticated,))
    def _learning_view(request):
        if request.method == "GET":
            response = get_learning(request=request, learning_type=learning_type, direct_report_id=None)
            return response
        elif request.method == "PATCH":
            response = patch_learning(request=request, learning_type=learning_type)
            return response

    return _learning_view


me_learning_on_the_job_view = make_learning_view(
    serializer_class=serializers.BaseLearningSerializer, learning_type=models.Learning.LearningType.ON_THE_JOB
)

me_learning_social_view = make_learning_view(
    serializer_class=serializers.BaseLearningSerializer, learning_type=models.Learning.LearningType.SOCIAL
)

me_learning_formal_view = make_learning_view(
    serializer_class=serializers.BaseLearningSerializer, learning_type=models.Learning.LearningType.FORMAL
)

me_learning_view = make_learning_view(serializer_class=serializers.LearningSerializer, learning_type=None)


@extend_schema(methods=["GET"], responses=serializers.LearningSerializer(many=True))
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_direct_report_learning_view(request, direct_report_id):
    response = get_learning(request=request, learning_type=None, direct_report_id=direct_report_id)
    return response


def list_skills_langs(request, user, model_name, field_name):
    """
    For a given user, return the associated skills or languages or skills to develop.
    Specify skills/languages/skills to develop with model_name and field_name.
    """
    model = getattr(models, model_name)
    serializer = getattr(serializers, f"{model_name}Serializer")
    if request.method == "GET":
        qs = model.objects.filter(user=user)
        is_skill_model = model_name in ["UserSkill", "UserSkillDevelop"]
        pending = request.query_params.get("pending")
        if is_skill_model and (pending is not None):
            qs = qs.filter(pending=pending)
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


@extend_schema(
    methods=["PATCH"],
    request=serializers.UserSkillSerializerNested(many=True),
    responses=serializers.UserSkillSerializerNested(many=True),
)
@extend_schema(methods=["GET"], responses=serializers.UserSkillSerializerNested(many=True))
@decorators.api_view(["GET", "PATCH"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_skills_view(request):
    model_name = "UserSkill"
    field_name = "skills"
    return list_skills_langs(request, request.user, model_name=model_name, field_name=field_name)


@extend_schema(
    methods=["PATCH"],
    request=serializers.UserLanguageSerializerNested(many=True),
    responses=serializers.UserLanguageSerializerNested(many=True),
)
@extend_schema(methods=["GET"], responses=serializers.UserLanguageSerializerNested(many=True))
@decorators.api_view(["GET", "PATCH"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_languages_view(request):
    model_name = "UserLanguage"
    field_name = "languages"
    return list_skills_langs(request, request.user, model_name=model_name, field_name=field_name)


@extend_schema(
    methods=["PATCH"],
    request=serializers.UserSkillDevelopSerializerNested(many=True),
    responses=serializers.UserSkillDevelopSerializerNested(many=True),
)
@extend_schema(methods=["GET"], responses=serializers.UserSkillDevelopSerializerNested(many=True))
@decorators.api_view(["GET", "PATCH"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_skills_develop_view(request):
    model_name = "UserSkillDevelop"
    field_name = "skills_develop"
    return list_skills_langs(request, request.user, model_name=model_name, field_name=field_name)


@extend_schema(
    methods=["PATCH"],
    request=serializers.UserSkillSerializerNested(many=True),
    responses=serializers.UserSkillSerializerNested(many=True),
)
@extend_schema(methods=["GET"], responses=serializers.UserSkillSerializerNested(many=True))
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


@extend_schema(
    methods=["PATCH"],
    request=serializers.UserLanguageSerializerNested(many=True),
    responses=serializers.UserLanguageSerializerNested(many=True),
)
@extend_schema(methods=["GET"], responses=serializers.UserLanguageSerializerNested(many=True))
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


@extend_schema(
    methods=["PATCH"],
    request=serializers.UserSkillDevelopSerializerNested(many=True),
    responses=serializers.UserSkillDevelopSerializerNested(many=True),
)
@extend_schema(methods=["GET"], responses=serializers.UserSkillDevelopSerializerNested(many=True))
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


def user_object_delete(user, id, model_name):
    """
    For a given user, delete the object to develop specified by ID.
    model_name - is UserSkill/UserLanguage/UserSkillDevelop/Learning
    """
    model_to_delete = getattr(models, model_name)
    try:
        item_to_delete = model_to_delete.objects.get(user=user, id=id)
        item_to_delete.delete()
        return Response(status=status.HTTP_200_OK)
    except model_to_delete.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@extend_schema(methods=["DELETE"], request=None, responses=None)
@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_skill_delete_view(request, skill_id):
    model_name = "UserSkill"
    return user_object_delete(user=request.user, id=skill_id, model_name=model_name)


@extend_schema(methods=["DELETE"], request=None, responses=None)
@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_language_delete_view(request, language_id):
    model_name = "UserLanguage"
    return user_object_delete(user=request.user, id=language_id, model_name=model_name)


@extend_schema(methods=["DELETE"], request=None, responses=None)
@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_skill_develop_delete_view(request, skill_develop_id):
    model_name = "UserSkillDevelop"
    return user_object_delete(user=request.user, id=skill_develop_id, model_name=model_name)


@extend_schema(methods=["DELETE"], request=None, responses=None)
@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_learning_delete_view(request, id):
    model_name = "Learning"
    return user_object_delete(user=request.user, id=id, model_name=model_name)


@extend_schema(methods=["DELETE"], request=None, responses=None)
@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def users_skill_delete_view(request, user_id, skill_id):
    try:
        user = models.User.objects.get(id=user_id)
    except models.User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    model_name = "UserSkill"
    return user_object_delete(user=user, id=skill_id, model_name=model_name)


@extend_schema(methods=["DELETE"], request=None, responses=None)
@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def users_language_delete_view(request, user_id, language_id):
    try:
        user = models.User.objects.get(id=user_id)
    except models.User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    model_name = "UserLanguage"
    return user_object_delete(user=user, id=language_id, model_name=model_name)


@extend_schema(methods=["DELETE"], request=None, responses=None)
@decorators.api_view(["DELETE"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def users_skill_develop_delete_view(request, user_id, skill_develop_id):
    try:
        user = models.User.objects.get(id=user_id)
    except models.User.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    model_name = "UserSkillDevelop"
    return user_object_delete(user=user, id=skill_develop_id, model_name=model_name)


def list_direct_reports(request, user):
    email = user.email
    direct_reports = models.User.objects.filter(line_manager_email=email)
    data = serializers.UserSerializer(direct_reports, many=True).data
    response = Response(data=data, status=status.HTTP_200_OK)
    return response


@extend_schema(request=None, responses=serializers.UserSerializer(many=True))
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_direct_reports_view(request):
    user = request.user
    return list_direct_reports(request, user)


@extend_schema(request=None, responses=serializers.UserSerializer(many=True))
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def user_direct_reports_view(request, user_id):
    user = models.User.objects.get(id=user_id)
    return list_direct_reports(request, user)


@extend_schema(request=None, responses=None)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAdminUser,))
def create_error(request):
    raise Exception("This is the create error endpoint (for testing)")


@extend_schema(request=None, responses=None)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_suggested_skills(request):
    """Look up required skills from DDaT framework based on job title."""
    user = request.user
    job_title = user.job_title
    suggested_skills = initial_data.DDAT_JOB_TO_SKILLS_LOOKUP.get(job_title, [])
    return Response(data=suggested_skills, status=status.HTTP_200_OK)


@extend_schema(request=None, responses=None)
@decorators.api_view(["POST"])
@decorators.permission_classes(
    (permissions.AllowAny,)
)  # TODO - what permissions? Suggest only admin users permissions.IsAdminUser
def generate_skill_similarity(request):
    print('skill recommendation table')
    print(SkillRecommendation._meta.db_table)
    print('fields')
    print(SkillRecommendation._meta.get_fields(include_parents=True, include_hidden=False))
    print('title recommendation table')
    print(TitleRecommendation._meta.db_table)
    print(TitleRecommendation._meta.get_fields(include_parents=True, include_hidden=False))
    qs = models.UserSkill.objects.all().values_list("user__id", "id", "name", "user__job_title")
    create_skill_similarity_matrix(qs)
    return Response(status=status.HTTP_200_OK)


@extend_schema(request=None, responses=None)
@decorators.api_view(["POST"])
@decorators.permission_classes(
    (permissions.AllowAny,)
)  # TODO - what permissions? Suggest only admin users permissions.IsAdminUser
def create_job_embeddings(request):
    qs = models.UserSkill.objects.all().values_list("user__id", "user__job_title")
    create_job_title_embeddings(qs)
    return Response(status=status.HTTP_200_OK)


@extend_schema(methods=["GET"], request=serializers.SkillTitleSerializer())
@decorators.api_view(["GET"])
@decorators.permission_classes(
    (permissions.AllowAny,)
)  # TODO - I think this is fine for permissions - anyone can see recommendation?
def skill_recommender(request, skill_name):
    recommended_skills = recommend_skill_from_db(skill_name)
    if recommended_skills is None:
        raise exceptions.MissingJobSimilarityMatrixError
    else:
        return Response(data=recommended_skills, status=status.HTTP_200_OK)


@extend_schema(request=None, responses=None)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_recommend_job_relevant_skills(request):
    similar_title_skills = recommend_title_from_db(request.user.job_title)
    if not similar_title_skills:
        raise exceptions.MissingJobSimilarityMatrixError
    return Response(data=similar_title_skills, status=status.HTTP_200_OK)


@extend_schema(request=None, responses=None)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_recommend_most_relevant_skills(request):
    user = request.user
    job_title = user.job_title
    qs = models.UserSkill.objects.all().values_list("user__id", "id", "name", "user__job_title")
    user_skills_list = list(models.UserSkill.objects.filter(user=user).values_list("name"))

    combined_recommendations = recommend_relevant_user_skills(qs, user_skills_list, job_title)
    return Response(data=combined_recommendations, status=status.HTTP_200_OK)
