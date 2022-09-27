from rest_framework.exceptions import APIException


class RegistrationError(APIException):
    status_code = 400
    default_detail = "User already exists"


class LoginMissingEmailError(APIException):
    status_code = 400
    default_detail = "You need to provide an email"


class LoginNoTokenError(APIException):
    status_code = 400
    default_detail = "One-time token has not been generated for this email"


class LoginIncorrectTokenError(APIException):
    status_code = 400
    default_detail = "Incorrect token"


class IncorrectDomainError(APIException):
    status_code = 400
    default_detail = "You need a recognised Cabinet Office email address to use this service"


class PasswordResetError(APIException):
    status_code = 400
    default_detail = "Reset link is invalid.\nYou are unable to reset your password as either the link has already been used or has expired"  # noqa
