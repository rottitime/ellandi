from django.db import models
from django.forms import CharField
from ..registration.models import User


class SkillLevel(object):
    SKILLS_CHOICES = (
        ("zero", "Zero"),
        ("minimal", "Minimal"),
        ("intermediate", "Intermediate"),
        ("expert", "Expert"),
        ("guru", "Guru"),
    )
    skill = models.CharField(max_length=128, choices=SKILLS_CHOICES)


class Skills(models.Model):
    name = CharField(max_length=256)
    users = models.ManyToManyField(User, blank=True, related_name="users")
    auditing = SkillLevel()
    bookkeeping = SkillLevel()
    communication = SkillLevel()
    design = SkillLevel()
    enthusiasm = SkillLevel()
    microsoft_office = SkillLevel()
    negotiation = SkillLevel()
    project_management = SkillLevel()
