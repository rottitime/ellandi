from django.contrib.auth import get_user_model
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = get_user_model()
        fields = [
            "url",
            "email",
            "first_name",
            "last_name",
            "organisation",
            "job_title",
            "line_manager_email",
            "country",
            "contract_type",
        ]

class WebErrorSerializer(serializers.Serializer):
    message  = serializers.CharField(required=True)
    stack  = serializers.CharField( required=True)
    userAgent  = serializers.CharField(source="user_agent", required=True)
    fileName  = serializers.CharField(source="file_name", required=True)
    lineNum = serializers.IntegerField(source="line_number", required=True)
    colNum = serializers.IntegerField(source="column_number", required=True)
    createdAt = serializers.DateTimeField(source="created_at")
