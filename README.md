# Pranjal Dwivedi — Python Full Stack Developer Portfolio

A modern responsive developer portfolio built with:

- React + Vite
- FastAPI
- SQLAlchemy
- SQLite
- REST APIs
- CSS

## Project structure

```text
pranjal-portfolio/
├── frontend/
└── backend/
```

## 1. Run the backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Backend:
- http://127.0.0.1:8000
- http://127.0.0.1:8000/docs

## 2. Run the frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend:
- http://localhost:5173

## 3. What to customize

Update your:
- LinkedIn URL
- GitHub URL
- Email
- Resume PDF
- Education details
- Project links
- Profile photo if desired

The backend automatically creates `portfolio.db` and seeds profile, skills, and projects on first run.
