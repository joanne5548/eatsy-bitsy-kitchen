from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from app.routers import generate

app = FastAPI(root_path="/", docs_url="/docs")

app.add_middleware(HTTPSRedirectMiddleware)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://eatsy-bitsy-kitchen-git-main-joanne5548s-projects.vercel.app/",
    "http://eatsy-bitsy-kitchen-git-main-joanne5548s-projects.vercel.app/",
    "https://kitchen.joannekim.dev",
    "http://kitchen.joannekim.dev",
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

app.include_router(generate.router)