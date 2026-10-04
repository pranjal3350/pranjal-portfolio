from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine, SessionLocal
from .routers import router
from .seed import seed_database

app = FastAPI(title="Pranjal Portfolio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

with SessionLocal() as db:
    seed_database(db)

app.include_router(router)


@app.get("/")
def root():
    return {
        "message": "Pranjal Portfolio API is running",
        "docs": "/docs"
    }
