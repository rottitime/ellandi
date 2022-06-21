import datetime
import uuid

from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify


class DropDownListModel(models.Model):
    """Base class for lists for drop-downs etc."""

    name = models.CharField(max_length=127, blank=False, null=False)
    slug = models.CharField(max_length=127, blank=False, null=False, primary_key=True)

    def clean(self):
        if self.slug:
            raise ValidationError("Do not set slug field, this is automatically calculated.")

    def save(self, *args, **kwargs):
        self.clean()
        self.slug = slugify(self.name)
        return super().save(*args, **kwargs)

    class Meta:
        abstract = True


class Organisation(DropDownListModel):
    pass


class ContractType(DropDownListModel):
    pass


class Location(DropDownListModel):
    pass


class Language(DropDownListModel):
    pass


class Profession(DropDownListModel):
    pass


class Grade(DropDownListModel):
    pass


class LanguageSkillLevel(DropDownListModel):
    pass


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
    created_at = models.DateTimeField(editable=False, default=datetime.datetime.now)
    modified_at = models.DateTimeField(editable=False, default=datetime.datetime.now)

    def save(self, *args, **kwargs):
        update_fields = kwargs.get("update_fields", None)
        if update_fields:
            kwargs["update_fields"] = set(update_fields).union({"modified_at"})

        super().save(*args, **kwargs)

    class Meta:
        abstract = True


class RegistrationAbstractUser(models.Model):
    class Meta:
        abstract = True

    organisation = models.CharField(max_length=128, blank=True, null=True)
    job_title = models.CharField(max_length=128, blank=True, null=True)
    grade = models.CharField(max_length=127, blank=True, null=False)
    profession = models.ManyToManyField(Profession, blank=True)
    contract_type = models.CharField(max_length=127, blank=True, null=False)
    line_manager_email = models.CharField(max_length=128, blank=True, null=True)
    location = models.CharField(max_length=127, blank=True, null=False)


class User(AbstractUser, TimeStampedModel, RegistrationAbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None
    email = models.EmailField("email", unique=True)
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
    level = models.CharField(max_length=64, choices=SkillLevel.choices, blank=True, null=False)
    validated = models.BooleanField(default=False, blank=False)

    class Meta:
        unique_together = ["user", "skill_name"]


class UserLanguage(TimeStampedModel):
    """Info on a particular language for a given user."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name="languages", on_delete=models.CASCADE)
    language = models.CharField(max_length=127, blank=True, null=False)
    type = models.CharField(max_length=127, blank=True, null=False)  # eg reading, writing
    level = models.CharField(max_length=127, blank=True, null=False)

    class Meta:
        unique_together = ["user", "language", "type"]


class WebError(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    message = models.CharField(max_length=1024, blank=False, null=True)
    stack = models.CharField(max_length=16384, blank=False, null=True)
    user_agent = models.CharField(max_length=1024, blank=False, null=True)
    file_name = models.CharField(max_length=1024, blank=False, null=True)
    line_number = models.IntegerField(blank=False, null=True)
    column_number = models.IntegerField(blank=False, null=True)
