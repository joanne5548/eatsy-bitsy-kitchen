from pydantic import BaseModel
from typing import Optional

class InputOptions(BaseModel):
    ingredients: list[str]
    style: Optional[str] = None
    cook_time: Optional[str] = None

class Recipe(BaseModel):
    name: str
    cook_time: str
    steps: list[str]
    img_url: Optional[str] = None