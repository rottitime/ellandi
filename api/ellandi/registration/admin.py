import django.contrib.auth.admin
from django.contrib import admin

from .models import (
    ContractType,
    Country,
    EmailSalt,
    Grade,
    Language,
    LanguageSkillLevel,
    Location,
    Organisation,
    Profession,
    User,
    UserLanguage,
    UserSkill,
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
                    "contract_type",
                    "created_at",
                    "modified_at",
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
                )
            },
        ),
    )
    readonly_fields = ("created_at", "modified_at")


class UserSkillAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "modified_at")


class UserLanguageAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "modified_at")


class DropDownListAdmin(admin.ModelAdmin):
    readonly_fields = ("name", "slug")

    def has_delete_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request, obj=None):
        return False


class OrganisationAdmin(DropDownListAdmin):
    pass


class ContractTypeAdmin(DropDownListAdmin):
    readonly_fields = ("name", "slug", "order")


class LocationAdmin(DropDownListAdmin):
    pass


class LanguageAdmin(DropDownListAdmin):
    pass


class ProfessionAdmin(DropDownListAdmin):
    pass


class GradeAdmin(DropDownListAdmin):
    readonly_fields = ("name", "slug", "order")


class LanguageSkillLevelAdmin(DropDownListAdmin):
    pass


class CountryAdmin(DropDownListAdmin):
    pass


admin.site.register(User, UserAdmin)
admin.site.register(UserSkill, UserSkillAdmin)
admin.site.register(UserLanguage, UserLanguageAdmin)
admin.site.register(Organisation, OrganisationAdmin)
admin.site.register(ContractType, ContractTypeAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Language, LanguageAdmin)
admin.site.register(Profession, ProfessionAdmin)
admin.site.register(Grade, GradeAdmin)
admin.site.register(LanguageSkillLevel, LanguageSkillLevelAdmin)
admin.site.register(Country, CountryAdmin)
admin.site.register(EmailSalt)
