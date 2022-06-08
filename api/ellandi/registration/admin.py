import django.contrib.auth.admin
from django.contrib import admin

from .models import User


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


admin.site.register(User, UserAdmin)
