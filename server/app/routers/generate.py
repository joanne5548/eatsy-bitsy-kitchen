from fastapi import APIRouter
from app.data_model.data_model import InputOptions, Recipe
from app.openai_api.openai_client import generate_recipe

router = APIRouter(prefix='/api/generate', tags=['generate'])

# Note that this works only for endpoint "http://localhost:8000/api/generate/" WITH trailing slash!!
@router.post('/')
async def generate(options: InputOptions) -> Recipe:
    recipe = generate_recipe(options)
    return recipe