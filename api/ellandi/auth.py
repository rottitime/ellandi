from django.contrib.auth import authenticate
from knox.views import LoginView as KnoxLoginView
from rest_framework import authentication, exceptions


class SimpleAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        username = request.POST.get("username")
        password = request.POST.get("password")
        if not username:
            return None

        user = authenticate(username=username, password=password)
        if not user:
            raise exceptions.AuthenticationFailed("No such user")

        return (user, None)


class LoginView(KnoxLoginView):
    authentication_classes = [SimpleAuthentication]
