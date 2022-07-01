import httpx

from ellandi import wsgi


def test_homepage_no_auth():
    with httpx.Client(app=wsgi.application, base_url="http://testserver:8000") as client:
        response = client.get("/")
        assert response.status_code == 401
        assert response.json() == {"detail":"Authentication credentials were not provided."}
