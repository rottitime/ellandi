from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from ellandi.registration.models import User


class TestUserEndpoint(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.data = {
            "email": "bob@example.com",
            "first_name": "Bob",
            "last_name": "Smith",
            "organisation": "Cabinet Office",
            "job_title": "Farmer",
            "line_manager_email": "line@example.com",
            "country": "Spain",
            "contract_type": "permanent",
        }
        self.data_incorrect = {
            "first_name": "Bob",
            "last_name": "Smith",
            "organisation": "Cabinet Office",
        }
        self.user = User.objects.create(
            email="jane@example.com", first_name="Jane", last_name="Green", organisation="DfE"
        )
        self.user_id = User.objects.get(email="jane@example.com").id

    def test_get(self):
        response = self.client.get("/users/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user(self):
        response = self.client.get(f"/users/{self.user_id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["first_name"], "Jane")

    def test_post(self):
        response = self.client.post("/users/", self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(email="bob@example.com")
        self.assertIsInstance(user, User)

    def test_post_no_email(self):
        response = self.client.post("/users/", self.data_incorrect)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TestUserSkillsEndpoint(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get(self):
        response = self.client.get("/user-skills/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestWebErrorEndpoint(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get(self):
        response = self.client.get("/web-error/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
