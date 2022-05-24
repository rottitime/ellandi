from rest_framework import serializers


class SkillsSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    users = serializers.RelatedField(many=True)
    auditing = serializers.IntegerField(required=True)
    bookkeeping = serializers.IntegerField(required=True)
    communication = serializers.IntegerField(required=True)
    design = serializers.IntegerField(required=True)
    enthusiasm = serializers.IntegerField(required=True)
    microsoft_office = serializers.IntegerField(required=True)
    negotiation = serializers.IntegerField(required=True)
    project_management = serializers.IntegerField(required=True)
