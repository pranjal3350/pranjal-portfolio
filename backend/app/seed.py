from sqlalchemy.orm import Session
from .models import Profile, Skill, Project


def seed_database(db: Session):
    if db.query(Profile).count() == 0:
        db.add(Profile(
            name="Pranjal Dwivedi",
            title="Python Full Stack Developer",
            bio=(
                "I build practical web applications using Python, Django, "
                "FastAPI, React and SQL. I enjoy turning ideas into working "
                "applications and learning through real-world projects."
            ),
            email="your-email@example.com",
            github="https://github.com/pranjal3350",
            linkedin="https://www.linkedin.com/",
            resume_url=""
        ))

    if db.query(Skill).count() == 0:
        skills = [
            ("Backend", "Python"),
            ("Backend", "Django"),
            ("Backend", "FastAPI"),
            ("Backend", "Flask"),
            ("Backend", "REST API"),
            ("Frontend", "HTML"),
            ("Frontend", "CSS"),
            ("Frontend", "JavaScript"),
            ("Frontend", "React"),
            ("Database", "SQL"),
            ("Database", "MySQL"),
            ("Database", "SQLite"),
            ("Tools", "Git"),
            ("Tools", "GitHub"),
            ("Tools", "VS Code"),
            ("Tools", "Postman"),
        ]
        for category, name in skills:
            db.add(Skill(category=category, name=name))

    if db.query(Project).count() == 0:
        projects = [
            (
                "AI Code Reviewer",
                "A web application that reviews code using an AI API and provides feedback and suggestions.",
                "React, FastAPI, Python, AI API",
                "https://github.com/",
                "",
                True,
            ),
            (
                "JanSahay",
                "A Django-based platform that organizes government service and scheme information by category.",
                "Python, Django, SQLite, HTML, CSS",
                "https://github.com/pranjal3350/JanSahay",
                "",
                True,
            ),
            (
                "PulseChat",
                "A chat application built with a React frontend, FastAPI backend and SQLite database.",
                "React, FastAPI, SQLite",
                "https://github.com/",
                "",
                True,
            ),
            (
                "Expense Tracker",
                "A Django application for recording and managing personal expenses.",
                "Python, Django, SQLite",
                "https://github.com/",
                "",
                True,
            ),
            (
                "Student Management System",
                "A CRUD-based Django application for managing student records.",
                "Python, Django, SQLite",
                "https://github.com/",
                "",
                False,
            ),
        ]
        for title, desc, tech, github, live, featured in projects:
            db.add(Project(
                title=title,
                description=desc,
                technologies=tech,
                github_url=github,
                live_url=live,
                featured=featured,
            ))

    db.commit()
