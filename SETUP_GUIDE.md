# SkinSync - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Testing the Application](#testing-the-application)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software:
- **Python 3.9 or higher** - [Download here](https://www.python.org/downloads/)
- **Node.js 18 or higher** - [Download here](https://nodejs.org/)
- **Git** (optional) - [Download here](https://git-scm.com/)

### Verify Installation:
```bash
# Check Python version
python --version

# Check Node.js version
node --version

# Check npm version
npm --version
```

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd c:\Users\Admin\Downloads\SkinSyn_ML_Exam\backend
```

### Step 2: Create Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate

# You should see (venv) in your terminal prompt
```

### Step 3: Install Python Dependencies
```bash
pip install -r requirements.txt
```

This will install:
- FastAPI (web framework)
- Uvicorn (ASGI server)
- Scikit-learn (ML library)
- TensorFlow (deep learning)
- Pandas, NumPy (data processing)

**Note:** This may take 5-10 minutes depending on your internet connection.

### Step 4: Generate Synthetic Data
```bash
python generate_data.py
```

Expected output:
```
Generating synthetic skincare dataset...
✓ Generated 2000 users
✓ Generated 500 products
✓ Generated 3000 interactions
✓ Combined dataset: 3000 records
✓ All datasets saved in 'data/' folder
```

### Step 5: Train ML Models
```bash
python train_models.py
```

Expected output:
```
=== Training Linear Regression Model ===
✓ Training RMSE: 1.45
✓ Testing RMSE: 1.52
✓ Model saved

=== Training Naive Bayes Model ===
✓ Training Accuracy: 0.76
✓ Testing Accuracy: 0.74
✓ Model saved

... (5 more models)

✓ All models trained successfully!
```

**Note:** Training all 6 models takes about 2-3 minutes.

### Step 6: Start Backend Server
```bash
uvicorn main:app --reload --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
✓ All models loaded successfully
```

**Keep this terminal open!** The backend server must remain running.

### Step 7: Test Backend API
Open a new terminal or browser and visit:
- http://localhost:8000 - Should show: `{"message": "SkinSync ML API is running"}`
- http://localhost:8000/models/info - Should show all 6 models info

## Frontend Setup

### Step 1: Open New Terminal
**Important:** Keep the backend terminal running. Open a NEW terminal window.

### Step 2: Navigate to Frontend Directory
```bash
cd c:\Users\Admin\Downloads\SkinSyn_ML_Exam\frontend
```

### Step 3: Install Node Dependencies
```bash
npm install
```

This will install:
- Next.js (React framework)
- TailwindCSS (styling)
- TypeScript
- Axios (HTTP client)
- Lucide React (icons)

**Note:** This may take 3-5 minutes.

### Step 4: Create Environment File
```bash
# Create .env.local file
echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local
```

Or manually create `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Step 5: Start Frontend Server
```bash
npm run dev
```

Expected output:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- event compiled client and server successfully
```

### Step 6: Open in Browser
Visit: http://localhost:3000

You should see the beautiful SkinSync homepage!

## Testing the Application

### 1. Homepage Test
- Navigate to http://localhost:3000
- Verify mission & vision sections load
- Check that all 6 algorithm cards display
- Click "Try Now" button

### 2. About Page Test
- Navigate to http://localhost:3000/about
- Verify company story displays
- Check technology stack section

### 3. Algorithms Page Test
- Navigate to http://localhost:3000/algorithms
- Verify all 6 algorithm explanations load
- Check that business value sections display

### 4. Interactive Testing (Most Important!)
- Navigate to http://localhost:3000/try-now
- Adjust user profile sliders:
  - Age: 30
  - Oil Production: 7
  - Sensitivity: 8
  - Pore Size: 6
  - Hydration: 4
  - Wrinkle Score: 5

- Configure product features (toggle switches)
- Click on each "Analyze" button
- Verify predictions appear below each button

Expected results:
- **Linear Regression:** Hydration level prediction
- **Naive Bayes:** Skin type classification
- **KNN:** Product recommendation
- **SVM:** Allergen risk assessment
- **Decision Tree:** Suitability verdict
- **ANN:** Satisfaction score prediction

## Deployment

### Deploy Backend to Render.com

1. Create account on [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** skinsync-backend
   - **Environment:** Python
   - **Build Command:** `pip install -r requirements.txt && python generate_data.py && python train_models.py`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable:
   - `FRONTEND_URL` = (your Vercel URL after frontend deployment)
6. Click "Create Web Service"
7. Wait 10-15 minutes for deployment
8. Note your backend URL (e.g., `https://skinsync-backend.onrender.com`)

### Deploy Frontend to Vercel

1. Create account on [Vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** frontend
5. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = (your Render backend URL)
6. Click "Deploy"
7. Wait 3-5 minutes
8. Visit your deployed site!

## Troubleshooting

### Backend Issues

**Problem:** `ModuleNotFoundError: No module named 'fastapi'`
```bash
# Solution: Activate virtual environment first
venv\Scripts\activate
pip install -r requirements.txt
```

**Problem:** Models not loading
```bash
# Solution: Regenerate data and retrain models
python generate_data.py
python train_models.py
```

**Problem:** Port 8000 already in use
```bash
# Solution: Use different port
uvicorn main:app --reload --port 8001

# Update frontend .env.local:
NEXT_PUBLIC_API_URL=http://localhost:8001
```

### Frontend Issues

**Problem:** `Module not found` errors
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Problem:** API connection failed
- Verify backend is running on http://localhost:8000
- Check `.env.local` has correct API URL
- Ensure no firewall blocking port 8000

**Problem:** Page not loading
```bash
# Solution: Clear Next.js cache
rm -rf .next
npm run dev
```

### General Issues

**Problem:** Python version too old
```bash
# Check version
python --version

# Must be 3.9 or higher
# Download from python.org if needed
```

**Problem:** Node.js version too old
```bash
# Check version
node --version

# Must be 18 or higher
# Download from nodejs.org if needed
```

## Quick Reference

### Start Both Servers (Development)

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # Windows
uvicorn main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Key Files
- Backend entry: `backend/main.py`
- Frontend entry: `frontend/app/page.tsx`
- ML models: `backend/models/`
- Dataset: `backend/data/`

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Verify all prerequisites are installed
3. Ensure both backend and frontend are running
4. Check browser console for errors (F12)
5. Review terminal output for error messages

## Success Checklist

- [ ] Python 3.9+ installed
- [ ] Node.js 18+ installed
- [ ] Backend dependencies installed
- [ ] Synthetic data generated (2000 users, 500 products)
- [ ] All 6 ML models trained
- [ ] Backend server running on port 8000
- [ ] Frontend dependencies installed
- [ ] Frontend server running on port 3000
- [ ] Homepage loads correctly
- [ ] All 6 algorithms show predictions on /try-now page
- [ ] Ready for presentation!

---

**You're all set! 🎉**

Your SkinSync ML project is ready for demonstration and grading!
