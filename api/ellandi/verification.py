import datetime

import furl
import pytz
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.template.loader import render_to_string
from drf_spectacular.utils import extend_schema
from rest_framework import decorators, permissions, status
from rest_framework.response import Response

from ellandi.registration import exceptions, models, serializers

from . import auth


def _strip_microseconds(dt):
    if not dt:
        return ""
    return dt.replace(microsecond=0, tzinfo=None)


class EmailVerifyTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        email = user.email or ""
        return f"{user.pk}{user.password}{timestamp}{email}"


class PasswordResetTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        login_timestamp = _strip_microseconds(user.last_login)
        email = user.email or ""
        token_timestamp = _strip_microseconds(user.last_token_sent_at)
        return f"{user.pk}{user.password}{login_timestamp}{timestamp}{email}{token_timestamp}"


EMAIL_VERIFY_TOKEN_GENERATOR = EmailVerifyTokenGenerator()
PASSWORD_RESET_TOKEN_GENERATOR = PasswordResetTokenGenerator()

EMAIL_MAPPING = {
    "verification": {
        "from_address": "support-ellandi@cabinetoffice.gov.uk",
        "subject": "Cabinet Office Skills and Learning: confirm your email address",
        "template_name": "email/verification.txt",
        "url_path": "/signin/email/verify",
        "token_generator": EMAIL_VERIFY_TOKEN_GENERATOR,
    },
    "password-reset": {
        "from_address": "support-ellandi@cabinetoffice.gov.uk",
        "subject": "Cabinet Office Skills and Learning: password reset",
        "template_name": "email/password-reset.txt",
        "url_path": "/signin/forgotten-password/reset",
        "token_generator": PASSWORD_RESET_TOKEN_GENERATOR,
    },
}


def _send_token_email(user, subject, template_name, from_address, url_path, token_generator):
    user.last_token_sent_at = datetime.datetime.now(tz=pytz.UTC)
    user.save()
    token = token_generator.make_token(user)
    api_host_url = settings.HOST_URL.strip("/")
    web_host_url = settings.HOST_MAP[api_host_url]
    url = str(furl.furl(url=web_host_url, path=url_path, query_params={"code": token, "user_id": str(user.id)}))
    context = dict(user=user, url=url)
    body = render_to_string(template_name, context)
    response = send_mail(
        subject=subject,
        message=body,
        from_email=from_address,
        recipient_list=[user.email],
    )
    return response


def send_verification_email(user):
    data = EMAIL_MAPPING["verification"]
    return _send_token_email(user, **data)


def send_password_reset_email(user):
    data = EMAIL_MAPPING["password-reset"]
    return _send_token_email(user, **data)


@extend_schema(
    responses=serializers.UserSerializer,
)
@decorators.api_view(["POST"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def me_send_verification_email_view(request):
    user = request.user
    send_verification_email(user)
    serializer = serializers.UserSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@extend_schema(
    responses=auth.TokenSerializer,
)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.AllowAny,))
def verification_view(request, user_id, token):
    try:
        user = models.User.objects.get(id=user_id)
        result = TOKEN_GENERATOR.check_token(user, token)
    except ObjectDoesNotExist:
        result = False

    if result:
        user.verified = True
        user.save()
        login(request, user)
        return auth.LoginView().post(request._request, format=None)
    else:
        return Response({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    request=serializers.PasswordResetAskSerializer,
)
@decorators.api_view(["POST"])
@decorators.permission_classes((permissions.AllowAny,))
def password_reset_ask_view(request):
    email = request.data.get("email")
    try:
        user = models.User.objects.get(email=email)
        send_password_reset_email(user)
    except ObjectDoesNotExist:
        pass
    return Response()


@extend_schema(
    request=serializers.PasswordResetUseSerializer,
    responses=serializers.UserSerializer,
)
@decorators.api_view(["POST"])
@decorators.permission_classes((permissions.AllowAny,))
def password_reset_use_view(request, user_id, token):
    new_password = request.data.get("new_password")
    user = models.User.objects.get(id=user_id)
    result = TOKEN_GENERATOR.check_token(user, token)
    if not result:
        raise exceptions.PasswordResetError
    user.set_password(new_password)
    user.save()
    login(request, user)
    user_data = serializers.UserSerializer(user, context={"request": request}).data
    return Response(user_data)


@extend_schema(
    request=serializers.PasswordChangeSerializer,
    responses=serializers.UserSerializer,
)
@decorators.api_view(["POST"])
@decorators.permission_classes((permissions.IsAuthenticated,))
def password_change_view(request):
    old_password = request.data.get("old_password")
    new_password = request.data.get("new_password")

    user = request.user

    if user.check_password(old_password):
        user.set_password(new_password)
        user.save()
        login(request, user)
        user_data = serializers.UserSerializer(user, context={"request": request}).data
        return Response(user_data)
    else:
        return Response({"detail": "Incorrect password"}, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    responses=serializers.IsValidSerializer,
)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.AllowAny,))
def check_token(request, user_id, token):
    try:
        user = models.User.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return Response({"valid": False})
    result = bool(TOKEN_GENERATOR.check_token(user, token))
    return Response({"valid": result})
