from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import BadRequest
from django.core.mail import send_mail
from django.shortcuts import redirect
from django.urls import reverse
from drf_spectacular.utils import extend_schema
from rest_framework import decorators, permissions
from rest_framework.response import Response

from ellandi.registration import models, serializers

TOKEN_GENERATOR = PasswordResetTokenGenerator()

EMAIL_MAPPING = {
    "verification": {
        "from_address": "something@example.com",
        "subject": "Verify your email",
        "template": """
Your email {user.email} address was registered with Ellandi.

If it was you that did this, please confirm your email at the following url:

{url}

Thank you
""",
    },
    "password-reset": {
        "from_address": "something@example.com",
        "subject": "Reset your password",
        "template": """
Someone requested that your password be reset

If it was you that did this, please reset it at the following url:

{url}

Thank you
""",
    },
}


def _send_token_email(user, subject, template, from_address, token_type):
    token = TOKEN_GENERATOR.make_token(user)
    host_url = settings.HOST_URL.strip("/")
    url = "/".join(("http:/", host_url, "user", str(user.id), token_type, token))
    body = template.format(user=user, url=url)
    return send_mail(
        subject=subject,
        message=body,
        from_email=from_address,
        recipient_list=[user.email],
    )


def send_verification_email(user):
    data = EMAIL_MAPPING["verification"]
    return _send_token_email(user, token_type="verify", **data)


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
        raise BadRequest("Invalid token")


@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.AllowAny,))
def password_reset_view(request, user_id, token, new_password):
    user = models.User.objects.get(id=user_id)
    result = TOKEN_GENERATOR.check_token(user, token)
    if result:
        user.set_password(new_password)
        user.save()
        login(request, user)
        return redirect(reverse("pages", args=("your-details",)))
    else:
        raise BadRequest("Invalid token")
