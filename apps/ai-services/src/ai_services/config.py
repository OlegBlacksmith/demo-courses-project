"""Настройки сервиса. Читаются из переменных окружения и файла .env."""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "ai-services"
    debug: bool = False
    host: str = "127.0.0.1"
    port: int = 8000

    # Ключ нужен только для настоящего LLM-клиента. Без него работает фейковый.
    anthropic_api_key: str | None = None
    llm_model: str = "claude-haiku-5-5"


@lru_cache
def get_settings() -> Settings:
    """Один объект настроек на весь процесс."""
    return Settings()
