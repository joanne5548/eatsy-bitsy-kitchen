from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .openai_api.generate import generate_recipe

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173",
    "http://127.0.0.1:5173",
    "127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def parse_ingredients(ingredients: list[str]) -> str:
    ingredients_str = ""
    for i in range(0, len(ingredients) - 1):
        ingredients_str += ingredients[i] + ", "
    ingredients_str += ingredients[-1]

    print(ingredients_str)
    return ingredients_str

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to fast api!"}

@app.post("/generate", tags=["generate"])
async def generate(options: dict) -> dict:
    ingredients_str = parse_ingredients(options["ingredients"])
    if (options["style"]):
        recipe = generate_recipe(ingredients_str, options["style"].lower())
    else:
        recipe = generate_recipe(ingredients_str)
    
    print(recipe)

    return recipe