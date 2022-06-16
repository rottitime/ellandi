from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APITestCase

from ellandi.registration.models import (
    ContractType,
    Organisation,
    User,
    UserSkill,
    WebError,
)


class TestUserEndpoint(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.request = APIRequestFactory()
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
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
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
            "user": f"http://testserver:8000/users/{self.user_id}/",
            "skill_name": "maths",
            "level": "proficient",
        }
        self.user_skill_data_updated = {
            "user": f"http://testserver:8000/users/{self.user_id}/",
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
        response = self.client.post("/user-skills/", self.user_skill_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_put_user_skill(self):
        response = self.client.put(f"/user-skills/{self.user_skill_id}/", self.user_skill_data_updated)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["level"], "beginner")

    def test_delete_user_skill(self):
        response = self.client.delete(f"/user-skills/{self.user_skill_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        number_matching_user_skills = UserSkill.objects.filter(id=self.user_skill_id).count()
        self.assertEqual(number_matching_user_skills, 0)


class TestWebErrorEndpoint(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.example_error = WebError.objects.create(message="test message 1", line_number=25, column_number=2)
        self.error_id = WebError.objects.get(message="test message 1").id
        self.updated_error = {
            "message": "test message 1",
            "stack": "here is the stack trace",
            "userAgent": "user agent",
            "fileName": "made_up.py",
            "lineNum": 57,
            "colNum": 13,
            "createdAt": "2022-06-12T17:27:00Z",
        }
        self.new_error_data = {
            "message": "test message post",
            "stack": "sample stack trace",
            "userAgent": "user agent",
            "fileName": "sample_file.py",
            "lineNum": 57,
            "colNum": 13,
            "createdAt": "2022-06-12T17:27:00Z",
        }

    def test_get(self):
        response = self.client.get("/web-error/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_error(self):
        response = self.client.get(f"/web-error/{self.error_id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put(self):
        response = self.client.put(f"/web-error/{self.error_id}/", self.updated_error)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["lineNum"], 57)

    def test_post(self):
        response = self.client.post("/web-error/", self.new_error_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_delete(self):
        response = self.client.delete(f"/web-error/{self.error_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        number_matching_errors = WebError.objects.filter(id=self.error_id).count()
        self.assertEqual(number_matching_errors, 0)


class TestOrganisationsEndpoint(APITestCase):
    def setUp(self):
        self.client = APIClient()
        Organisation(name="Cabinet Office").save()
        Organisation(name="Department for Education", slug="dfe").save()

    def test_get(self):
        response = self.client.get("/organisations/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_org(self):
        response = self.client.get("/organisations/cabinet-office/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_check_slug(self):
        response = self.client.get("/organisations/dfe/")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        response = self.client.get("/organisations/department-for-education/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post(self):
        response = self.client.post("/organisations/", {"name": "BEIS"})
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


class TestContractTypeEndpoint(APITestCase):
    def setUp(self):
        self.client = APIClient()
        ContractType(name="Fixed-term").save()

    def test_get(self):
        response = self.client.get("/contract-type/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_type(self):
        response = self.client.get("/contract-type/fixed-term/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post(self):
        response = self.client.post("/contract-type/", {"name": "New type"})
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
