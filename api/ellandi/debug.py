import os

from rest_framework import decorators, permissions, status
from rest_framework.response import Response


@decorators.api_view(["GET"])
@decorators.permission_classes((permissions.IsAdminUser,))
def debug_view(request):
    vars_of_interest = ["DEBUG", "EMAIL_BACKEND_TYPE", "ALLOW_EXAMPLE_EMAILS", "GIT_SHA"]
    debug_vars = {}
    for env_var in vars_of_interest:
        debug_vars[env_var] = os.getenv(env_var)
    return Response(data=debug_vars, status=status.HTTP_200_OK)
