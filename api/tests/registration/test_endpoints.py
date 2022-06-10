from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from ellandi.registration.models import User, UserSkill


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
        self.updated_user_data = {"email": "jane@example.com", "first_name": "Jane", "last_name": "Brown"}

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

    def test_put(self):
        response = self.client.put(f"/users/{self.user_id}/", self.updated_user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["last_name"], "Brown")

    def test_delete(self):
        response = self.client.delete(f"/users/{self.user_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_OK)
        number_matching_users = User.objects.filter(id=self.user_id).count()
        self.assertEqual(number_matching_users, 0)


class TestUserSkillsEndpoint(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            email="jane@example.com", first_name="Jane", last_name="Green", organisation="DfE"
        )
        self.user_id = User.objects.get(email="jane@example.com").id
        self.user_skill = UserSkill.objects.create(user=self.user, skill_name="Python", level="beginner")
        self.user_skill_id = UserSkill.objects.get(user__email=self.user.email, skill_name="Python").id
        self.user_skill_data = {
            "user": "jane@example.com",
            "skill_name": "maths",
            "level": "proficient",
        }
        self.user_skill_data_updated = {
            "user": "jane@example.com",
            "skill_name": "maths",
            "level": "beginner",
        }

    def test_get(self):
        response = self.client.get("/user-skills/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_skill(self):
        response = self.client.get(f"/user-skills/{self.user_skill_id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["skill_name"], "Python")

    def test_post_user_skill(self):
        # TODO - how to post a user-skill?
        response = self.client.post("/user-skills/", self.user_skill_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_put_user_skill(self):
        # TODO - how to do this?
        response = self.client.put(f"/user-skills/{self.user_skill_id}/", self.user_skill_data_updated)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # TODO - test skill updated

    def test_delete_user_skill(self):
        response = self.client.delete(f"/user-skills/{self.user_skill_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_OK)
        number_matching_user_skills = UserSkill.objects.filter(id=self.user_skill_id).count()
        self.assertEqual(number_matching_user_skills, 0)


class TestWebErrorEndpoint(APITestCase):
    def setUp(self):
        self.client = APIClient()

    def test_get(self):
        response = self.client.get("/web-error/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
