from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import BadRequest
from django.core.mail import send_mail
from django.shortcuts import redirect
from django.urls import reverse
from rest_framework import decorators, permissions

from ellandi.registration import models

TOKEN_GENERATOR = PasswordResetTokenGenerator()
EMAIL_FROM_ADDRESS = "something@example.com"
EMAIL_SUBJECT = "Verify your email"
EMAIL_TEMPLATE = """
Your email {user.email} address was registered with Ellandi.

If it was you that did this, please confirm your email at the following url:

{url}

Thank you
"""




def _send_token_email(user, subject, template, from_address):
    token = TOKEN_GENERATOR.make_token(user)
    host_url = settings.HOST_URL.strip("/")
    url = "/".join(("http:/", host_url, "user", str(user.id), "verify", token))
    body = template.format(user=user, url=url)
    return send_mail(
        subject=subject,
        message=body,
        from_email=from_address,
        recipient_list=[user.email],
    )

def send_verification_email(user):
    return _send_token_email(user, EMAIL_SUBJECT, EMAIL_TEMPLATE, EMAIL_FROM_ADDRESS)

@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.AllowAny,))
def verification_view(request, user_id, token):
    user = models.User.objects.get(id=user_id)
    result = TOKEN_GENERATOR.check_token(user, token)
    if result:
        user.verified = True
        user.save()
        login(request, user)
        return redirect(reverse("pages", args=("your-details",)))
    else:
        raise BadRequest("Invalid token")
