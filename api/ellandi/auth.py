from django.contrib.auth import authenticate
from drf_spectacular.extensions import OpenApiAuthenticationExtension
from drf_spectacular.utils import extend_schema
from knox.views import LoginView as KnoxLoginView
from rest_framework import authentication, exceptions, serializers


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
        username = request.data.get("username")
        password = request.data.get("password")
        if not username:
            return None

        user = authenticate(username=username, password=password)
        if not user:
            raise exceptions.AuthenticationFailed("No such user")

        return (user, None)


class LoginSerializer(serializers.Serializer):
    username = serializers.EmailField()
    password = serializers.CharField()


class TokenSerializer(serializers.Serializer):
    expiry = serializers.DateTimeField()
    token = serializers.CharField()


@extend_schema(
    request=LoginSerializer,
    responses=TokenSerializer,
)
class LoginView(KnoxLoginView):
    authentication_classes = [SimpleAuthentication]
