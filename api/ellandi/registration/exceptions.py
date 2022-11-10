from rest_framework.exceptions import APIException


class RegistrationError(APIException):
    status_code = 400
    default_detail = "We're unable to create your account. If you already have an account, try to sign in"


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
    default_detail = "Reset link is invalid. You are unable to reset your password as either the link has already been used or has expired"  # noqa


class DirectReportError(APIException):
    status_code = 400
    default_detail = "There is no such direct report for the current user"


class LearningIdError(APIException):
    status_code = 400
    default_detail = "The learning for this ID belongs to a different user"


class MissingLanguageTypeError(APIException):
    status_code = 400
    default_detail = 'You need to enter a language type of "speaking" or "writing"'
