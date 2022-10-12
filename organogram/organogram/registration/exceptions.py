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
