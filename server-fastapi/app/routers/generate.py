from fastapi import APIRouter
from app.data_model.data_model import InputOptions, Recipe
from app.openai_api.openai_client import generate_recipe

router = APIRouter(prefix='/api/generate', tags=['generate'])

@router.post('/')
async def generate(options: InputOptions) -> Recipe:
    recipe = generate_recipe(options)
    return recipe