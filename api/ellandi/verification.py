import furl
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from drf_spectacular.utils import extend_schema
from rest_framework import decorators, permissions, status
from rest_framework.response import Response

from ellandi.registration import models, serializers

TOKEN_GENERATOR = PasswordResetTokenGenerator()

EMAIL_MAPPING = {
    "verification": {
        "from_address": "support-ellandi@cabinetoffice.gov.uk",
        "subject": "Civil Service Skills and Learning: account created",
        "template_name": "email/verification.txt",
        "url_path": "/signin/verify",
    },
    "password-reset": {
        "from_address": "support-ellandi@cabinetoffice.gov.uk",
        "subject": "Civil Service Skills and Learning: password reset",
        "template_name": "email/password-reset.txt",
        "url_path": "/signin/forgotten-password/reset",
    },
}


def _send_token_email(user, subject, template_name, from_address, url_path):
    token = TOKEN_GENERATOR.make_token(user)
    api_host_url = settings.HOST_URL.strip("/")
    web_host_url = settings.HOST_MAP[api_host_url]
    url = str(furl.furl(url=web_host_url, path=url_path, query_params={"code": token, "user_id": str(user.id)}))
    context = dict(user=user, url=url)
    body = render_to_string(template_name, context)
    return send_mail(
        subject=subject,
        message=body,
        from_email=from_address,
        recipient_list=[user.email],
    )


def send_verification_email(user):
    data = EMAIL_MAPPING["verification"]
    return _send_token_email(user, **data)


def send_password_reset_email(user):
    data = EMAIL_MAPPING["password-reset"]
    return _send_token_email(user, **data)


@extend_schema(
    responses=serializers.UserSerializer,
)
@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.AllowAny,))
def verification_view(request, user_id, token):
    user = models.User.objects.get(id=user_id)
    result = TOKEN_GENERATOR.check_token(user, token)
    if result:
        user.verified = True
        user.save()
        login(request, user)
        user_data = serializers.UserSerializer(user, context={"request": request}).data
        return Response(user_data)
    else:
        return Response({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


@extend_schema(
    request=serializers.PasswordResetAskSerializer,
    responses=serializers.UserSerializer,
)
@decorators.api_view(["POST"])
@decorators.permission_classes((permissions.AllowAny,))
def password_reset_ask_view(request):
    email = request.data.get("email")
    user = models.User.objects.get(email=email)
    send_password_reset_email(user)
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
    if result:
        user.set_password(new_password)
        user.save()
        login(request, user)
        user_data = serializers.UserSerializer(user, context={"request": request}).data
        return Response(user_data)
    else:
        return Response({"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


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
