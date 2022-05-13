from django.contrib import admin

import django.contrib.auth.admin
from .models import User


class UserAdmin(django.contrib.auth.admin.UserAdmin):
    ordering = ('email',)

admin.site.register(User, UserAdmin)

