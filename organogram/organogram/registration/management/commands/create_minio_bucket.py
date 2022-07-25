import boto3
from botocore.client import Config
from django.conf import settings
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Creates the bucket on MinIO"

    def handle(self, *args, **options):
        if not settings.DEBUG:
            return

        client = boto3.client(
            "s3",
            endpoint_url=settings.AWS_S3_ENDPOINT_URL,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            config=Config(signature_version="s3v4"),
            region_name=settings.AWS_REGION,
        )
        bucket_name = settings.AWS_STORAGE_BUCKET_NAME
        try:
            client.create_bucket(Bucket=bucket_name)
            self.stdout.write(self.style.SUCCESS("MinIO bucket successfully created"))
        except client.exceptions.BucketAlreadyOwnedByYou:
            self.stdout.write(self.style.WARNING("MinIO bucket already exists"))
