from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import BadRequest
from django.core.mail import send_mail
from django.shortcuts import redirect
from django.urls import reverse

from organogram.registration import models

TOKEN_GENERATOR = PasswordResetTokenGenerator()
EMAIL_SUBJECT = "Verify your email"
EMAIL_TEMPLATE = """
Your email {user.email} address was entered in the Cabinet Office Organogram.

If it was you that did this, please confirm your email at the following url:

{url}

Thank you
"""


def send_verification_email(user):
    token = TOKEN_GENERATOR.make_token(user)
    host_url = settings.HOST_URL.strip("/")
    url = "/".join(("http:/", host_url, "user", str(user.id), "verify", token))
    body = EMAIL_TEMPLATE.format(user=user, url=url)
    send_mail(
        subject=EMAIL_SUBJECT,
        message=body,
        from_email=settings.EMAIL_FROM_ADDRESS,
        recipient_list=[user.email],
    )


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
