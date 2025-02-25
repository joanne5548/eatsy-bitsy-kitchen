from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .openai_api.generate import generate_recipe
from .data_model.data_model import InputOptions, Recipe

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to fast api!"}

@app.post("/generate", tags=["generate"])
async def generate(options: InputOptions) -> Recipe:
    recipe = generate_recipe(options)
    
    print(recipe)

    return recipe