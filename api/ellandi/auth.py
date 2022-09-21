import knox.views
from django.contrib.auth import authenticate
from drf_spectacular.extensions import OpenApiAuthenticationExtension
from drf_spectacular.utils import extend_schema
from rest_framework import authentication, exceptions, permissions, serializers


class KnoxTokenScheme(OpenApiAuthenticationExtension):
    target_class = "knox.auth.TokenAuthentication"
    name = "knoxTokenAuth"

    def get_security_definition(self, auto_schema):
        return {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization",
            "description": 'Token-based authentication with required prefix "Token"',
        }


class SimpleAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        if not email:
            return None

        user = authenticate(email=email, password=password)
        if not user:
            raise exceptions.AuthenticationFailed(
                "Either the email address and/or password you have entered is incorrect"
            )

        return (user, None)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()


class TokenSerializer(serializers.Serializer):
    expiry = serializers.DateTimeField()
    token = serializers.CharField()


@extend_schema(
    request=LoginSerializer,
    responses=TokenSerializer,
)
class LoginView(knox.views.LoginView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = [SimpleAuthentication]


@extend_schema(request=None, responses=None)
class LogoutView(knox.views.LogoutView):
    pass


@extend_schema(request=None, responses=None)
class LogoutAllView(knox.views.LogoutView):
    pass
