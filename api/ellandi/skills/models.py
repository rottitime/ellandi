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
    users = models.ForeignKey(User, related_name="skills", on_delete=models.CASCADE)
    skill = SkillLevel()

    def __str__(self):
        return f'{self.name}'
