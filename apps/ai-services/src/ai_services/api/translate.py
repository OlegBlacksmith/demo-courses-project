from typing import Annotated, Literal

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field

from ai_services.api.deps import get_llm_client
from ai_services.llm import LLMClient

router = APIRouter(prefix="/translate", tags=["translate"])

Locale = Literal["ru", "en"]


class TranslateRequest(BaseModel):
    text: str = Field(min_length=1, max_length=50_000)
    source: Locale
    target: Locale


class TranslateResponse(BaseModel):
    text: str
    source: Locale
    target: Locale


@router.post("")
def translate(
    body: TranslateRequest,
    llm: Annotated[LLMClient, Depends(get_llm_client)],
) -> TranslateResponse:
    """Перевести текст урока. Пока через фейковый клиент."""
    system = (
        f"Translate the user's text from {body.source} to {body.target}. "
        "Keep Markdown structure and code blocks unchanged."
    )
    translated = llm.complete(system=system, prompt=body.text)
    return TranslateResponse(text=translated, source=body.source, target=body.target)
