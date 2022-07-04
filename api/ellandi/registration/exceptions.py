from rest_framework.exceptions import APIException


class RegistrationError(APIException):
    status_code = 400
    default_detail = 'User already exists'
