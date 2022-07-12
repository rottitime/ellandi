from rest_framework.exceptions import APIException


class RegistrationError(APIException):
    status_code = 400
    default_detail = "User already exists"


class OneTimeLoginEmailError(APIException):
    status_code = 400
    default_detail = "You need to provide an email"


class OneTimeLoginNoEmailError(APIException):
    status_code = 400
    default_detail = "One-time token has not been generated for this email"


class OneTimeTokenIncorrectError(APIException):
    status_code = 400
    default_detail = "Incorrect token"
