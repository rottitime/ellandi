import django.contrib.auth.admin
from django.contrib import admin

from .models import (
    ContractType,
    Grade,
    Language,
    LanguageSkillLevel,
    Location,
    Organisation,
    Profession,
    User,
    UserLanguage,
    UserSkill,
    EmailSalt
)


class UserAdmin(django.contrib.auth.admin.UserAdmin):
    ordering = ("email",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "organisation",
                    "job_title",
                    "line_manager_email",
                    "country",
                    "contract_type",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "organisation",
                    "job_title",
                    "line_manager_email",
                    "country",
                    "contract_type",
                )
            },
        ),
    )


class DropDownListAdmin(admin.ModelAdmin):
    readonly_fields = ("name", "slug")

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request, obj=None):
        return False


class OrganisationAdmin(DropDownListAdmin):
    pass


class ContractTypeAdmin(DropDownListAdmin):
    pass


class LocationAdmin(DropDownListAdmin):
    pass


class LanguageAdmin(DropDownListAdmin):
    pass


class ProfessionAdmin(DropDownListAdmin):
    pass


class GradeAdmin(DropDownListAdmin):
    pass


class LanguageSkillLevelAdmin(DropDownListAdmin):
    pass


admin.site.register(User, UserAdmin)
admin.site.register(UserSkill)
admin.site.register(UserLanguage)
admin.site.register(Organisation, OrganisationAdmin)
admin.site.register(ContractType, ContractTypeAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Language, LanguageAdmin)
admin.site.register(Profession, ProfessionAdmin)
admin.site.register(Grade, GradeAdmin)
admin.site.register(LanguageSkillLevel, LanguageSkillLevelAdmin)
admin.site.register(EmailSalt)
