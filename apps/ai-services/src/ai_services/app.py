"""Сборка FastAPI-приложения."""

from fastapi import FastAPI

from ai_services.api import health, translate
from ai_services.config import get_settings


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title=settings.app_name)
    app.include_router(health.router)
    app.include_router(translate.router)
    return app


app = create_app()
