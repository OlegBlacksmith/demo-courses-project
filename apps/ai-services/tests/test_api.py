from fastapi.testclient import TestClient

from ai_services.api.deps import get_llm_client
from ai_services.app import app

client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_translate_uses_llm_client() -> None:
    class StubClient:
        def complete(self, system: str, prompt: str) -> str:
            return "Hello"

    app.dependency_overrides[get_llm_client] = StubClient
    try:
        response = client.post(
            "/translate", json={"text": "Привет", "source": "ru", "target": "en"}
        )
    finally:
        app.dependency_overrides.clear()

    assert response.status_code == 200
    assert response.json() == {"text": "Hello", "source": "ru", "target": "en"}


def test_translate_rejects_unknown_locale() -> None:
    response = client.post("/translate", json={"text": "Привет", "source": "ru", "target": "de"})

    assert response.status_code == 422


def test_translate_rejects_empty_text() -> None:
    response = client.post("/translate", json={"text": "", "source": "ru", "target": "en"})

    assert response.status_code == 422
