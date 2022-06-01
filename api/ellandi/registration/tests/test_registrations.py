import unittest

from rest_framework import status
from rest_framework.test import APIClient, APITestCase


class TestUserEndpoint(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.data = {
            "email": "bob@test.com",
            "first_name": "Bob",
            "last_name": "Smith",
        } # TODO - add more data

    def test_get(self):
        response = self.client.get("/users/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post(self):
        response = self.client.post("/users/", self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
