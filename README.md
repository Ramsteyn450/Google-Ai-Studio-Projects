
# EstateIntelligence AI - Iterative Valuation Engine

A professional real estate appraisal platform using iterative Linear Regression (SGD) and Google Gemini AI insights.

## Core Features
- **Iterative Linear Regression**: Implemented via `SGDRegressor` with exactly 100 iterations per training cycle.
- **Preprocessing Pipeline**: Robust handling of categorical data (OneHotEncoding) and numerical scaling (StandardScaler).
- **AI Synthesis**: Uses Gemini 3 Flash to generate contextual market outlooks for every prediction.
- **Clean UI**: Modern React interface with Framer Motion and Lucide icons.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: FastAPI, Scikit-Learn, Joblib.
- **AI**: Google Generative AI (Gemini SDK).

## Setup & Local Run

### 1. Backend (Python)
Ensure Python 3.9+ is installed.
```bash
pip install fastapi uvicorn scikit-learn pandas joblib numpy
python server.py
```
Server runs on `http://localhost:8000`.

### 2. Frontend (React)
The frontend uses ESM imports directly via `index.html`. No heavy build step required for dev.
1. Set `process.env.API_KEY` with your Google AI API key.
2. Serve the directory using a simple local server (like `live-server` or `python -m http.server`).

## Model Logic
- **Iterations**: `max_iter=100` (SGD convergence).
- **Features**: Size, Pincode (Categorical), Bedrooms, Floors, Age, Parking (Categorical), Distances to School/Transport.
