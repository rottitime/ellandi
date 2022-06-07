import json

from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class TestUserEndpoint(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.data = {
            "email": "bob@test.com",
            "first_name": "Bob",
            "last_name": "Smith",
            "organisation": "Cabinet Office",
            "job_title": "Farmer",
            "line_manager_email": "line@manager.com",
            "country": "Spain",
            "contract_type": "permanent",
        }
        self.data_incorrect = {
            "first_name": "Bob",
            "last_name": "Smith",
            "organisation": "Cabinet Office",
        }

    def test_get(self):
        response = self.client.get("/users/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post(self):
        response = self.client.post("/users/", self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_no_email(self):
        response = self.client.post("/users/", self.data_incorrect)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
