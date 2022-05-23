from django.db import models


class SkillLevel(models.IntegerChoices):
    zero = 0, _('Zero')
    minimal = 1, _('Minimal')
    intermediate = 2, _('Intermediate')
    expert = 3, _('Expert')
    guru = 4, _('Guru')

    __empty__ = _('(Unknown)')


class Skills(models.Model):
    auditing = SkillLevel()
    bookkeeping = SkillLevel()
    communication = SkillLevel()
    design = SkillLevel()
    enthusiasm = SkillLevel()
    microsoft_office = SkillLevel()
    negotiation = SkillLevel()
    project_management = SkillLevel()
