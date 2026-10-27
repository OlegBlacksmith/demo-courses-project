"""AI-сервис для витрины курсов: переводчик, а позже агенты и RAG."""


def main() -> None:
    """Точка входа команды `uv run ai-services`: запускает HTTP-сервер."""
    import uvicorn

    from ai_services.config import get_settings

    settings = get_settings()
    uvicorn.run(
        "ai_services.app:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )
