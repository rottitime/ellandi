import datetime
import hashlib
import json
import uuid
from base64 import b64encode

import pytz
from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify

from ellandi.registration import initial_data


def now():
    return datetime.datetime.now(tz=pytz.UTC)


class JSONSerializer(json.JSONEncoder):
    def default(self, o):
        try:
            iterable = iter(o)
        except TypeError:
            pass
        else:
            return list(iterable)
        return json.JSONEncoder.default(self, o)


def get_non_pending_skills():
    # Skills from initial list, or new skills/skills to develop added by users approved by an admin.
    existing_skills = set(UserSkill.objects.filter(pending=False).values_list("name", flat=True))
    skills_to_develop = set(UserSkillDevelop.objects.filter(pending=False).values_list("name", flat=True))
    initial_skills = initial_data.INITIAL_SKILLS.union(initial_data.NLP_DERIVED_SKILLS).union(
        initial_data.DDAT_SKILLS_TO_JOB_LOOKUP.keys()
    )
    skills = initial_skills.union(existing_skills)
    skills = skills.union(skills_to_develop)
    skills = sorted(skills)
    return skills


def is_skill_pending(skill_name):
    non_pending_skills = get_non_pending_skills()
    pending = skill_name not in non_pending_skills
    return pending


class YesNoChoices(models.TextChoices):
    YES = ("Yes", "Yes")
    NO = ("No", "No")
    DONT_KNOW = ("I don't know", "I don't know")


class LowercaseEmailField(models.EmailField):
    def pre_save(self, model_instance, add):
        """Return field's value just before saving."""
        value = getattr(model_instance, self.attname)
        value = value and value.lower() or ""
        setattr(model_instance, self.attname, value)
        return value


class DropDownListModel(models.Model):
    """Base class for lists for drop-downs etc."""

    name = models.CharField(max_length=127, blank=False)
    slug = models.CharField(max_length=127, blank=False, primary_key=True)
    order = models.PositiveSmallIntegerField(null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name.replace("|", "_"))
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        abstract = True
        ordering = ["order"]


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
    description = models.CharField(max_length=255, blank=True, null=True, default="")


class Country(DropDownListModel):
    class Meta:
        verbose_name_plural = "Countries"


class Function(DropDownListModel):
    pass


class SkillLevel(DropDownListModel):
    description = models.CharField(max_length=255, blank=True, null=True, default="")


class JobTitle(DropDownListModel):
    pass


class BusinessUnit(DropDownListModel):
    pass


class LearningType(DropDownListModel):
    description = models.CharField(max_length=255, blank=True, null=True, default="")


class UserManager(BaseUserManager):
    use_in_migrations = True

    def normalize_email(self, email):
        email = email or ""
        return email.lower()

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

    department = models.CharField(max_length=127, blank=True, null=True)
    organisation = models.CharField(max_length=128, blank=True, null=True)
    job_title = models.CharField(max_length=128, blank=True, null=True)
    business_unit = models.CharField(max_length=127, blank=True, null=True)
    location = models.CharField(max_length=127, blank=True, null=True)
    location_other = models.CharField(max_length=127, blank=True, null=True)
    line_manager_email = LowercaseEmailField(max_length=128, blank=True, null=True)
    grade = models.CharField(max_length=127, blank=True, null=True)
    grade_other = models.CharField(max_length=127, blank=True, null=True)
    professions = models.JSONField(default=list)
    profession_other = models.CharField(max_length=127, blank=True, null=True)
    primary_profession = models.CharField(max_length=127, blank=True, null=True)
    function = models.CharField(max_length=127, blank=True, null=True)
    function_other = models.CharField(max_length=127, blank=True, null=True)
    contract_type = models.CharField(max_length=127, blank=True, null=True)
    contract_type_other = models.CharField(max_length=127, blank=True, null=True)
    contact_preference = models.BooleanField(default=None, blank=True, null=True)


class User(AbstractUser, TimeStampedModel, RegistrationAbstractUser):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = None
    email = LowercaseEmailField("email", unique=True)
    privacy_policy_agreement = models.BooleanField(blank=True, null=True)
    verified = models.BooleanField(default=False, blank=True, null=True)

    first_name = models.CharField("first name", max_length=128, blank=True, null=True)
    last_name = models.CharField("last name", max_length=128, blank=True, null=True)
    is_mentor = models.CharField(max_length=12, choices=YesNoChoices.choices, blank=True, null=True)
    is_line_manager = models.CharField(max_length=12, choices=YesNoChoices.choices, blank=True, null=True)
    last_token_sent_at = models.DateTimeField(editable=False, blank=True, null=True)

    @property
    def has_direct_reports(self):
        email = self.email
        has_direct_reports = User.objects.filter(line_manager_email=email).exists()
        return has_direct_reports

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def clean(self):
        if self.line_manager_email and (self.email.lower() == self.line_manager_email.lower()):
            raise ValidationError(
                "You have entered an email that matches your own. Enter your line manager's work email address."
            )

    def save(self, *args, **kwargs):
        if self.primary_profession:
            if self.primary_profession not in self.professions:
                if (self.primary_profession.lower() == "other") and self.profession_other:
                    self.professions = self.professions + [self.profession_other]
                else:
                    self.professions = self.professions + [self.primary_profession]
        self.clean()
        return super().save(*args, **kwargs)


class UserSkill(TimeStampedModel):
    """Info on a particular skill for a given user."""

    class SkillLevel(models.TextChoices):
        BEGINNER = ("Beginner", "Beginner")
        ADVANCED_BEGINNER = ("Advanced beginner", "Advanced beginner")
        COMPETENT = ("Competent", "Competent")
        PROFICIENT = ("Proficient", "Proficient")
        EXPERT = ("Expert", "Expert")

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name="skills", on_delete=models.CASCADE)
    name = models.CharField(max_length=256)
    level = models.CharField(max_length=64, choices=SkillLevel.choices, blank=True, null=True)
    validated = models.BooleanField(default=False, blank=False)
    pending = models.BooleanField(default=True, blank=False)

    def save(self, *args, **kwargs):
        if self.pending:
            self.pending = is_skill_pending(self.name)
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.id})"

    class Meta:
        unique_together = ["user", "name"]


class UserLanguage(TimeStampedModel):
    """Info on a particular language for a given user."""

    class LanguageLevel(models.TextChoices):
        BASIC = ("Basic", "Basic")
        INDEPENDENT = ("Independent", "Independent")
        PROFICIENT = ("Proficient", "Proficient")
        NATIVE = ("Native", "Native")
        NONE = ("None", "None")

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name="languages", on_delete=models.CASCADE)
    name = models.CharField(max_length=127, blank=True, null=True)
    speaking_level = models.CharField(max_length=127, choices=LanguageLevel.choices, blank=True, null=True)
    writing_level = models.CharField(max_length=127, choices=LanguageLevel.choices, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.id})"

    class Meta:
        unique_together = ["user", "name"]


class UserSkillDevelop(TimeStampedModel):
    """Store info on skills a particular user would like to develop."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name="skills_develop", on_delete=models.CASCADE)
    name = models.CharField(max_length=127, blank=True, null=True)
    pending = models.BooleanField(default=True, blank=False)

    def save(self, *args, **kwargs):
        if self.pending:
            self.pending = is_skill_pending(self.name)
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.id})"

    class Meta:
        unique_together = ["user", "name"]


class Learning(TimeStampedModel):
    """Learning time a user has spent"""

    class LearningType(models.TextChoices):
        ON_THE_JOB = ("On the job", "On the job")
        SOCIAL = ("Social", "Social")
        FORMAL = ("Formal", "Formal")

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, related_name="learnings", on_delete=models.CASCADE)
    learning_type = models.CharField(max_length=31, choices=LearningType.choices, editable=False)
    name = models.CharField(max_length=255, blank=True, null=True)
    duration_minutes = models.PositiveIntegerField(null=True)
    date_completed = models.DateField(null=True)
    cost_pounds = models.PositiveIntegerField(blank=True, null=True)
    cost_unknown = models.BooleanField(blank=True, null=True)


class EmailSalt(models.Model):
    email = LowercaseEmailField("email", unique=True, primary_key=True)
    salt = models.BinaryField(max_length=16, blank=False)

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


class RecommendedSkill(TimeStampedModel):
    class SourceTypes(models.TextChoices):
        JOB_TITLE = ("Job title", "Job title")
        SKILL = ("Skill", "Skill")

    recommended_skill = models.CharField(max_length=128)
    source_type = models.CharField(max_length=128, choices=SourceTypes.choices)
    source_value = models.CharField(max_length=128)


class Course(models.Model):
    class Status(models.TextChoices):
        ARCHIVED = ("Archived", "Archived")
        DRAFT = ("Draft", "Draft")
        PUBLISHED = ("Published", "Published")

    class CourseType(models.TextChoices):
        BLENDED = ("Blended", "Blended")
        FACE_TO_FACE = ("Face-to-face", "Face-to-face")
        FILE = ("File", "File")
        LINK = ("Link", "Link")
        VIDEO = ("Video", "Video")
        ONLINE_COURSE = ("Online course", "Online course")

    class Grade(models.TextChoices):
        AA = ("AA", "AA")
        AO = ("AO", "AO")
        EO = ("EO", "EO")
        G6 = ("G6", "G6")
        G7 = ("G7", "G7")
        HEO = ("HEO", "HEO")
        PB1 = ("PB1", "PB1")
        PB2 = ("PB2", "PB2")
        PB3 = ("PB3", "PB3")
        PS = ("PS", "PS")
        SCS = ("SCS", "SCS")
        SEO = ("SEO", "SEO")

    id = models.CharField(primary_key=True, max_length=64)
    title = models.CharField(max_length=256, blank=True, null=True)
    short_description = models.CharField(max_length=1024, blank=True, null=True)
    long_description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=128, choices=Status.choices, blank=True, null=True)
    cost_pounds = models.PositiveIntegerField(blank=True, null=True)
    duration_minutes = models.PositiveIntegerField(blank=True, null=True)
    private = models.BooleanField(blank=True, null=True)
    course_type = models.CharField(max_length=256, choices=CourseType.choices, blank=True, null=True)
    grades = models.JSONField(default=list, encoder=JSONSerializer)


class Invite(TimeStampedModel):
    class Status(models.TextChoices):
        PENDING = ("Pending", "Pending")
        SENT = ("Sent", "Sent")
        ACCEPTED = ("Accepted", "Accepted")

    user = models.ForeignKey(User, related_name="invites", on_delete=models.CASCADE)
    email = LowercaseEmailField("email")
    first_name = models.CharField("first name", max_length=128, blank=True, null=True)
    status = models.CharField(max_length=128, choices=Status.choices, default=Status.PENDING)
