from django.db import models
from django.forms import CharField
from ..registration.models import User


class SkillLevel(object):
    SKILL_CHOICES = (
        ("zero", "Zero"),
        ("minimal", "Minimal"),
        ("intermediate", "Intermediate"),
        ("expert", "Expert"),
        ("guru", "Guru"),
    )
    skill = models.CharField(max_length=128, choices=SKILL_CHOICES)


class Skill(models.Model):
    name = CharField(max_length=256)
    users = models.ManyToManyField(User, blank=True, related_name="skills")
    sample_skill = SkillLevel()
