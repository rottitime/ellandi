from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APITestCase
from tests import utils

from ellandi.registration.models import (
    ContractType,
    DropDownListModel,
    Grade,
    Language,
    Location,
    Organisation,
    Profession,
    User,
    UserLanguage,
    UserSkill,
)

TEST_SERVER_URL = "http://testserver:8000/"


@utils.with_logged_in_client
def test_users_get(client, user_id):
    response = client.get("/users/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert len(data) == 1
    assert data[0]['email'] == "jane@example.com"


@utils.with_logged_in_client
def test_user_get(client, user_id):
    response = client.get(f"/users/{user_id}/")
    assert response.status_code == status.HTTP_200_OK
    data = response.json()
    assert data["first_name"] == "Jane"


@utils.with_logged_in_client
def test_user_post(client, user_id):
    data = {
        "email": "bob@example.com",
        "first_name": "Bob",
        "last_name": "Smith",
        "organisation": "Cabinet Office",
        "job_title": "Farmer",
        "line_manager_email": "line@example.com",
        "contract_type": "permanent",
        "grade": "Grade 6",
        "privacy_policy_agreement": True,
    }

    response = client.post("/users/", json=data)
    assert response.status_code == status.HTTP_201_CREATED
    user = User.objects.get(email=data['email'])

    for key, value in data.items():
        assert getattr(user, key) == value, (key, value)

    user.delete()


@utils.with_logged_in_client
def test_post_no_email(client, user_id):
    data_incorrect = {
        "first_name": "Bob",
        "last_name": "Smith",
        "organisation": "Cabinet Office",
    }

    response = client.post("/users/", data=data_incorrect)
    assert response.status_code == status.HTTP_400_BAD_REQUEST
    assert response.json()['email'] == ['This field is required.']


@utils.with_logged_in_client
def test_put(client, user_id):
    updated_user_data = {
        "email": "jane@example.com",
        "first_name": "Jane",
        "last_name": "Brown",
        "profession": [
            f"{TEST_SERVER_URL}professions/government-operational-research-service/",
            f"{TEST_SERVER_URL}professions/digital-data-and-technology-professions/",
        ],
    }

    response = client.put(f"/users/{user_id}/", data=updated_user_data)
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["last_name"] == "Brown"


@utils.with_logged_in_client
def test_delete(client, user_id):
    response = client.delete(f"/users/{user_id}/")
    assert response.status_code == status.HTTP_204_NO_CONTENT
    number_matching_users = User.objects.filter(id=user_id).count()
    assert number_matching_users == 0


@utils.with_logged_in_client
def test_get_user_userskills(client, user_id):
    user_skill_data = {
        "user": f"{TEST_SERVER_URL}users/{user_id}/",
        "skill_name": "typing",
        "level": "proficient",
    }
    response = client.post("/user-skills/", json=user_skill_data)
    assert response.status_code == status.HTTP_201_CREATED
    user_skill_id = response.json()['id']
    assert response.json()["skill_name"] == "typing"
    assert response.json()["level"] == "proficient"

    response = client.get(f"/users/{user_id}/skills/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()[0]["skill_name"] == "typing"
    assert response.json()[0]["level"] == "proficient"

    response = client.delete(f"/user-skills/{user_skill_id}/")
    assert response.status_code == status.HTTP_204_NO_CONTENT


@utils.with_logged_in_client
def test_post_get_put_delete_user_skill(client, user_id):
    response = client.get("/user-skills/")
    assert len(response.json()) == 0

    user_skill_data = {
        "user": f"{TEST_SERVER_URL}users/{user_id}/",
        "skill_name": "maths",
        "level": "proficient",
    }
    response = client.post("/user-skills/", json=user_skill_data)
    assert response.status_code == status.HTTP_201_CREATED
    user_skill_id = response.json()['id']
    assert response.json()["skill_name"] == "maths"
    assert response.json()["level"] == "proficient"

    response = client.get("/user-skills/")
    assert len(response.json()) == 1

    response = client.get(f"/user-skills/{user_skill_id}/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["skill_name"] == "maths"
    assert response.json()["level"] == "proficient"

    user_skill_data_updated = {
        "user": f"{TEST_SERVER_URL}users/{user_id}/",
        "skill_name": "maths",
        "level": "beginner",
    }
    response = client.put(f"/user-skills/{user_skill_id}/", json=user_skill_data_updated)
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["skill_name"] == "maths"
    assert response.json()["level"] == "beginner"

    response = client.delete(f"/user-skills/{user_skill_id}/")
    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = client.get("/user-skills/")
    assert len(response.json()) == 0



@utils.with_logged_in_client
def test_post_get_put_delete_user_language(client, user_id):
    response = client.get("/user-languages/")
    assert len(response.json()) == 0

    user_language_data = {
        "user": f"{TEST_SERVER_URL}users/{user_id}/",
        "language": "latin",
        "level": "proficient",
        "type": "reading",
    }
    response = client.post("/user-languages/", json=user_language_data)
    print(response)
    print(response.text)
    assert response.status_code == status.HTTP_201_CREATED
    user_language_id = response.json()['id']
    assert response.json()["language"] == "latin"
    assert response.json()["level"] == "proficient"
    assert response.json()["type"] == "reading"

    response = client.get("/user-languages/")
    assert len(response.json()) == 1

    response = client.get(f"/user-languages/{user_language_id}/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["language"] == "latin"
    assert response.json()["level"] == "proficient"
    assert response.json()["type"] == "reading"

    user_language_data_updated = {
        "user": f"{TEST_SERVER_URL}users/{user_id}/",
        "language": "latin",
        "level": "beginner",
        "type": "writing",
    }
    response = client.put(f"/user-languages/{user_language_id}/", json=user_language_data_updated)
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["language"] == "latin"
    assert response.json()["level"] == "beginner"
    assert response.json()["type"] == "writing"

    response = client.delete(f"/user-languages/{user_language_id}/")
    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = client.get("/user-languages/")
    assert len(response.json()) == 0


class TestDropDownList(APITestCase):
    __test__ = False
    name = None
    slug = None
    endpoint = None
    model = DropDownListModel

    def setUp(self):
        self.client = APIClient()
        self.model(name=self.name).save()

    def test_get(self):
        response = self.client.get(self.endpoint)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_item(self):
        response = self.client.get(f"{self.endpoint}{self.slug}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post(self):
        response = self.client.post(self.endpoint, {"name": "a new name"})
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


class TestOrganisationsEndpoint(TestDropDownList):
    __test__ = True
    name = "Cabinet Office"
    slug = "cabinet-office"
    endpoint = "/organisations/"
    model = Organisation


class TestContractTypesEndpoint(TestDropDownList):
    __test__ = True
    name = "Fixed-term"
    slug = "fixed-term"
    endpoint = "/contract-types/"
    model = ContractType


class TestLocationsEndpoint(TestDropDownList):
    __test__ = True
    name = "Salford"
    slug = "salford"
    endpoint = "/locations/"
    model = Location


class TestLanguagesEndpoint(TestDropDownList):
    __test__ = True
    name = "Bengali"
    slug = "bengali"
    endpoint = "/languages/"
    model = Language


class TestProfessionsEndpoint(TestDropDownList):
    __test__ = True
    name = "Government Operational Research Service"
    slug = "government-operational-research-service"
    endpoint = "/professions/"
    model = Profession


class TestGradesEndpoint(TestDropDownList):
    __test__ = True
    name = "Grade 7"
    slug = "grade-7"
    endpoint = "/grades/"
    model = Grade


class TestLanguageSkillLevelEndpoint(TestDropDownList):
    __test__ = True
    name = "Independent"
    slug = "independent"
    endpoint = "/language-skill-levels/"
    model = Grade
