from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
def health() -> dict[str, str]:
    """Проверка, что сервис жив. Её дёргают Docker, CI и балансировщики."""
    return {"status": "ok"}
