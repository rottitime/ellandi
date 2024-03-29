import datetime
import hashlib
import uuid
from base64 import b64encode

import pytz
from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.text import slugify
from storages.backends.s3boto3 import S3Boto3Storage


def now():
    return datetime.datetime.now(tz=pytz.UTC)


def photo_upload_to(instance, filename):
    subdir_name = str(instance.id)
    filepath = "/".join((subdir_name, filename))
    return filepath


class PhotoStorage(S3Boto3Storage):
    location = "photos"


class DropDownListModel(models.Model):
    """Base class for lists for drop-downs etc."""

    name = models.CharField(max_length=127, blank=False, null=False)
    slug = models.CharField(max_length=127, blank=False, null=False, primary_key=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name.replace("|", "_"))
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        abstract = True


class Organisation(DropDownListModel):
    pass


class ContractType(DropDownListModel):
    order = models.PositiveSmallIntegerField(null=True)

    class Meta:
        ordering = ["order"]


class Location(DropDownListModel):
    pass


class Language(DropDownListModel):
    pass


class Profession(DropDownListModel):
    show = models.BooleanField(default=False, blank=False, null=False)


class Grade(DropDownListModel):
    order = models.PositiveSmallIntegerField(null=True)

    class Meta:
        ordering = ["order"]


class LanguageSkillLevel(DropDownListModel):
    description = models.CharField(max_length=255, blank=True, null=True, default="")


class Country(DropDownListModel):
    class Meta:
        verbose_name_plural = "Countries"


class Team(DropDownListModel):
    team_name = models.CharField(max_length=255, blank=True, null=True)
    sub_unit = models.CharField(max_length=255, blank=True, null=True)
    business_unit = models.CharField(max_length=255, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.name = f"{self.business_unit} | {self.sub_unit} | {self.team_name}"
        return super().save(*args, **kwargs)

    class Meta:
        unique_together = ["team_name", "sub_unit", "business_unit"]
        ordering = ["name"]


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Users require an email field")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(editable=False, auto_now_add=True)
    modified_at = models.DateTimeField(editable=False, auto_now=True)

    class Meta:
        abstract = True


class RegistrationAbstractUser(models.Model):
    class Meta:
        abstract = True

    organisation = models.CharField(max_length=128, blank=True, null=True)
    team = models.ForeignKey(Team, blank=True, null=True, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=128, blank=True, null=True)
    grade = models.CharField(max_length=127, blank=True, null=True)
    professions = models.ManyToManyField(Profession, blank=True)
    primary_profession = models.ForeignKey(
        Profession, related_name="+", blank=True, null=True, on_delete=models.CASCADE
    )
    contract_type = models.CharField(max_length=127, blank=True, null=True)
    line_manager_email = models.CharField(max_length=128, blank=True, null=True)
    location = models.CharField(max_length=127, blank=True, null=True)
    department = models.CharField(max_length=127, blank=True, null=True)
    photo = models.FileField(upload_to=photo_upload_to, storage=PhotoStorage(), blank=True, null=True)
    biography = models.CharField(max_length=4095, blank=True, null=True)
    organogram_id = models.CharField(max_length=4095, blank=True, null=True)


class User(AbstractUser, TimeStampedModel, RegistrationAbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None
    email = models.EmailField("email", unique=True)
    verified = models.BooleanField(default=False, blank=True, null=True)
    privacy_policy_agreement = models.BooleanField(default=False, blank=False, null=False)

    first_name = models.CharField("first name", max_length=128, blank=True, null=True)
    last_name = models.CharField("last name", max_length=128, blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


class UserSkill(TimeStampedModel):
    """Info on a particular skill for a given user."""

    class SkillLevel(models.TextChoices):
        BEGINNER = ("beginner", "Beginner")
        ADVANCED_BEGINNER = ("advanced_beginner", "Advanced Beginner")
        COMPETENT = ("competent", "Competent")
        PROFICIENT = ("proficient", "Proficient")
        EXPERT = ("expert", "Expert")

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name="skills", on_delete=models.CASCADE)
    skill_name = models.CharField(max_length=256)
    level = models.CharField(max_length=64, choices=SkillLevel.choices, blank=True, null=True)
    validated = models.BooleanField(default=False, blank=False)

    def __str__(self):
        return f"{self.skill_name} ({self.id})"

    class Meta:
        unique_together = ["user", "skill_name"]


class UserLanguage(TimeStampedModel):
    """Info on a particular language for a given user."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name="languages", on_delete=models.CASCADE)
    language = models.CharField(max_length=127, blank=True, null=True)
    type = models.CharField(max_length=127, blank=True, null=True)  # eg writing, speaking
    level = models.CharField(max_length=127, blank=True, null=True)

    def __str__(self):
        return f"{self.language} ({self.id})"

    class Meta:
        unique_together = ["user", "language", "type"]


class EmailSalt(models.Model):
    email = models.EmailField("email", unique=True, primary_key=True)
    salt = models.BinaryField(max_length=16, blank=False, null=False)

    def get_one_time_login(self):
        salt_str = b64encode(self.salt).decode("utf-8")
        tok = "|".join([salt_str, self.email, settings.SECRET_KEY])
        one_time_token = hashlib.sha256(tok.encode("utf-8")).hexdigest()
        return one_time_token

    def is_one_time_login_valid(self, token_to_validate):
        correct_token = self.get_one_time_login()
        return correct_token == token_to_validate

    def save(self, *args, **kwargs):
        self.email = self.email.lower()
        super(EmailSalt, self).save(*args, **kwargs)
