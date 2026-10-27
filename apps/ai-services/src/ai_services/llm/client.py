"""Интерфейс LLM-клиента.

Код сервиса зависит от интерфейса, а не от конкретного провайдера.
Поменять Claude на другую модель или подставить фейк в тестах можно,
не трогая остальной код.
"""

from typing import Protocol


class LLMClient(Protocol):
    def complete(self, system: str, prompt: str) -> str:
        """Отправить запрос модели и вернуть текст ответа."""
        ...


class FakeLLMClient:
    """Заглушка без сети и без денег: нужна для разработки и тестов."""

    def complete(self, system: str, prompt: str) -> str:
        return f"[fake] {prompt}"
