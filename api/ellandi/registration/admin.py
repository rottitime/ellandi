import django.contrib.auth.admin
from django.contrib import admin

from .models import (
    ContractType,
    Country,
    EmailSalt,
    Function,
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


class UserSkillInline(admin.TabularInline):
    model = UserSkill


class UserLanguageInline(admin.TabularInline):
    model = UserLanguage


class UserAdmin(django.contrib.auth.admin.UserAdmin):
    ordering = ("email",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "id",
                    "email",
                    "privacy_policy_agreement",
                    "first_name",
                    "last_name",
                    "department",
                    "organisation",
                    "job_title",
                    "business_unit",
                    "location",
                    "line_manager_email",
                    "grade",
                    "grade_other",
                    "professions",
                    "profession_other",
                    "primary_profession",
                    "function",
                    "function_other",
                    "contract_type",
                    "contract_type_other",
                    "contact_preference",
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
                    "id",
                    "email",
                    "privacy_policy_agreement",
                    "first_name",
                    "last_name",
                    "department",
                    "organisation",
                    "job_title",
                    "business_unit",
                    "location",
                    "line_manager_email",
                    "grade",
                    "grade_other",
                    "professions",
                    "profession_other",
                    "primary_profession",
                    "function",
                    "function_other",
                    "contract_type",
                    "contract_type_other",
                    "contact_preference",
                    "created_at",
                    "modified_at",
                )
            },
        ),
    )
    inlines = [UserSkillInline, UserLanguageInline]
    readonly_fields = ("id", "created_at", "modified_at", "professions")
    list_display = ("email", "first_name", "last_name")


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
    readonly_fields = ("name", "slug", "order")


class GradeAdmin(DropDownListAdmin):
    readonly_fields = ("name", "slug", "order")


class LanguageSkillLevelAdmin(DropDownListAdmin):
    pass


class CountryAdmin(DropDownListAdmin):
    pass


class FunctionAdmin(DropDownListAdmin):
    readonly_fields = ("name", "slug", "order")


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
admin.site.register(Function, FunctionAdmin)
admin.site.register(EmailSalt)
