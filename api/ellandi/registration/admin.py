import django.contrib.auth.admin
from django.contrib import admin

from . import models


class UserSkillInline(admin.TabularInline):
    model = models.UserSkill


class UserLanguageInline(admin.TabularInline):
    model = models.UserLanguage


class UserSkillDevelopInline(admin.TabularInline):
    model = models.UserSkillDevelop


class UserAdmin(django.contrib.auth.admin.UserAdmin):
    ordering = ("email",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "id",
                    "is_staff",
                    "is_superuser",
                    "verified",
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
                    "has_direct_reports",
                    "is_line_manager",
                    "is_mentor",
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
                    "has_direct_reports",
                    "is_line_manager",
                    "is_mentor",
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
                    "verified",
                    "created_at",
                    "modified_at",
                )
            },
        ),
    )
    inlines = [UserSkillInline, UserLanguageInline, UserSkillDevelopInline]
    readonly_fields = ("id", "created_at", "modified_at", "professions", "has_direct_reports", "verified")
    list_display = ("email", "first_name", "last_name")


class UserSkillAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "modified_at")


class UserLanguageAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "modified_at")


class UserSkillDevelopAdmin(admin.ModelAdmin):
    readonly_fields = ("created_at", "modified_at")


class DropDownListAdmin(admin.ModelAdmin):
    readonly_fields = ("name", "slug", "order")

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
    readonly_fields = ("name", "slug", "order", "description")


class CountryAdmin(DropDownListAdmin):
    pass


class FunctionAdmin(DropDownListAdmin):
    pass


class SkillLevelAdmin(DropDownListAdmin):
    readonly_fields = ("name", "slug", "order", "description")


class JobTitleAdmin(DropDownListAdmin):
    pass


class BusinessUnitAdmin(DropDownListAdmin):
    pass


class LearningTypeAdmin(DropDownListAdmin):
    readonly_fields = ("name", "slug", "order", "description")


admin.site.register(models.User, UserAdmin)
admin.site.register(models.UserSkill, UserSkillAdmin)
admin.site.register(models.UserLanguage, UserLanguageAdmin)
admin.site.register(models.UserSkillDevelop, UserSkillDevelopAdmin)
admin.site.register(models.Organisation, OrganisationAdmin)
admin.site.register(models.ContractType, ContractTypeAdmin)
admin.site.register(models.Location, LocationAdmin)
admin.site.register(models.Language, LanguageAdmin)
admin.site.register(models.Profession, ProfessionAdmin)
admin.site.register(models.Grade, GradeAdmin)
admin.site.register(models.LanguageSkillLevel, LanguageSkillLevelAdmin)
admin.site.register(models.Country, CountryAdmin)
admin.site.register(models.Function, FunctionAdmin)
admin.site.register(models.SkillLevel, SkillLevelAdmin)
admin.site.register(models.JobTitle, JobTitleAdmin)
admin.site.register(models.BusinessUnit, BusinessUnitAdmin)
admin.site.register(models.LearningType, LearningTypeAdmin)
admin.site.register(models.EmailSalt)
admin.site.register(models.Learning)
admin.site.register(models.Course)
