"""Зависимости для эндпоинтов (FastAPI Depends).

В тестах их подменяют через app.dependency_overrides.
"""

from ai_services.llm import FakeLLMClient, LLMClient


def get_llm_client() -> LLMClient:
    # Пока всегда фейк. Настоящий клиент Claude появится на шаге 3.5 плана.
    return FakeLLMClient()
