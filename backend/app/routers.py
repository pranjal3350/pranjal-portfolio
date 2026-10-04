from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import get_db
from .models import Profile, Skill, Project, Contact
from .schemas import ContactCreate, ContactResponse
import os
import smtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api")


@router.get("/profile")
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(Profile).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.get("/skills")
def get_skills(db: Session = Depends(get_db)):
    rows = db.query(Skill).all()
    result = {}
    for row in rows:
        result.setdefault(row.category, []).append(row.name)
    return result


@router.get("/projects")
def get_projects(db: Session = Depends(get_db)):
    rows = db.query(Project).order_by(Project.featured.desc(), Project.id.desc()).all()
    return [
        {
            "id": row.id,
            "title": row.title,
            "description": row.description,
            "technologies": [x.strip() for x in row.technologies.split(",") if x.strip()],
            "github_url": row.github_url,
            "live_url": row.live_url,
            "image": row.image,
            "featured": row.featured,
        }
        for row in rows
    ]


@router.get("/projects/{project_id}")
def get_project(project_id: int, db: Session = Depends(get_db)):
    row = db.query(Project).filter(Project.id == project_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Project not found")
    return {
        "id": row.id,
        "title": row.title,
        "description": row.description,
        "technologies": [x.strip() for x in row.technologies.split(",") if x.strip()],
        "github_url": row.github_url,
        "live_url": row.live_url,
        "image": row.image,
        "featured": row.featured,
    }


@router.post("/contact", response_model=ContactResponse)
def create_contact(payload: ContactCreate, db: Session = Depends(get_db)):
    # Save message to database
    row = Contact(**payload.model_dump())
    db.add(row)
    db.commit()

    # Send message to Gmail
    try:
        msg = EmailMessage()

        msg["Subject"] = f"Portfolio Contact: {payload.subject}"
        msg["From"] = os.getenv("MAIL_USERNAME")
        msg["To"] = os.getenv("MAIL_TO")

        msg.set_content(
            f"""
New message from your portfolio website.

Name: {payload.name}
Email: {payload.email}
Subject: {payload.subject}

Message:
{payload.message}
"""
        )

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(
                os.getenv("MAIL_USERNAME"),
                os.getenv("MAIL_PASSWORD")
            )
            server.send_message(msg)

    except Exception as e:
        print("Email sending failed:", e)

    return {
        "message": "Your message has been saved successfully."
    }