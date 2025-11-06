# 🚀 SkinSync Deployment Guide

## Overview
- **Frontend**: Vercel (Next.js)
- **Backend**: Render.com (FastAPI + ML Models)

---

## Part 1: Deploy Backend to Render.com

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `ML_SkinSyn`
3. Select the repository

### Step 3: Configure Service
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `skinsync-backend` |
| **Region** | Oregon (US West) or closest to you |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Environment** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt && python generate_data.py && python train_models.py` |
| **Start Command** | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| **Plan** | Free |

### Step 4: Environment Variables (Optional)
Add these in Render dashboard if needed:

```
PYTHON_VERSION=3.11
```

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Wait for build (5-10 minutes - training models takes time)
3. Note your backend URL: `https://skinsync-backend.onrender.com`

⚠️ **Note**: First deployment will take 5-10 minutes because it trains all 6 ML models.

### Step 6: Test Backend
Once deployed, test these endpoints:
- **Health**: https://your-backend.onrender.com/health
- **API Docs**: https://your-backend.onrender.com/docs
- **Metrics**: https://your-backend.onrender.com/models/metrics
- **Rubric**: https://your-backend.onrender.com/rubric

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update Environment Variable
1. In your `frontend/` folder, update `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

Replace `your-backend` with your actual Render.com URL.

### Step 2: Push Changes to GitHub
```bash
git add .
git commit -m "feat: Update API URL for production deployment"
git push
```

### Step 3: Create Vercel Account
1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### Step 4: Import Repository
1. Click **"Add New..."** → **"Project"**
2. Find and select `ML_SkinSyn` repository
3. Click **"Import"**

### Step 5: Configure Project Settings

**Framework Preset**: Next.js (auto-detected)

**Root Directory**: 
- Click **"Edit"**
- Enter: `frontend`
- Click **"Continue"**

**Build Settings** (auto-detected):
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Step 6: Environment Variables
In the "Environment Variables" section, add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-backend.onrender.com` |

Replace with your actual Render backend URL.

### Step 7: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Your frontend will be live at: `https://skinsync-XXXXX.vercel.app`

### Step 8: Set Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Click **"Edit"** next to your deployment URL
3. Change to: `skinsync.vercel.app` (or your preferred name)

---

## Part 3: Update Backend CORS

After getting your Vercel URL, update backend CORS settings:

### Option A: Update in GitHub and Redeploy
1. Edit `backend/main.py`:

```python
allow_origins=[
    "http://localhost:3000",
    "https://skinsync.vercel.app",  # Your actual Vercel URL
    "https://*.vercel.app"  # All Vercel preview deployments
],
```

2. Push to GitHub:
```bash
git add backend/main.py
git commit -m "fix: Update CORS for Vercel deployment"
git push
```

3. Render will auto-deploy the update

### Option B: Environment Variable (Recommended)
Add to Render environment variables:
```
FRONTEND_URL=https://skinsync.vercel.app
```

Then update `main.py` to read from environment.

---

## Part 4: Final Testing

### Test Full Workflow
1. Visit your Vercel URL: `https://skinsync.vercel.app`
2. Navigate to **Try Now** page
3. Adjust profile sliders
4. Click each algorithm button
5. Verify predictions appear correctly

### Test API Endpoints Directly
- **Backend Health**: `https://your-backend.onrender.com/health`
- **Swagger Docs**: `https://your-backend.onrender.com/docs`
- **Frontend**: `https://skinsync.vercel.app`

---

## 📊 Deployment Checklist

### Backend (Render.com)
- [ ] Repository connected
- [ ] Root directory set to `backend`
- [ ] Build command includes model training
- [ ] Start command uses uvicorn
- [ ] Health check endpoint configured
- [ ] Deployment successful
- [ ] API docs accessible at `/docs`
- [ ] Models loaded (check `/models/metrics`)

### Frontend (Vercel)
- [ ] Repository connected
- [ ] Root directory set to `frontend`
- [ ] Environment variable `NEXT_PUBLIC_API_URL` set
- [ ] Build successful
- [ ] Website accessible
- [ ] Try Now page working
- [ ] All 6 algorithms responding

### Integration
- [ ] CORS configured correctly
- [ ] API calls from frontend to backend work
- [ ] Predictions display properly
- [ ] Resources panel links work

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: Build times out or fails
```
Solution: The free tier has build time limits. If training takes too long:
1. Pre-train models locally
2. Commit model files to GitHub (remove from .gitignore)
3. Update build command to: pip install -r requirements.txt
```

**Problem**: Models not loading
```
Solution: Check Render logs:
1. Go to Render dashboard
2. Click on your service
3. View "Logs" tab
4. Look for "✓ All models loaded successfully"
```

**Problem**: API returns 502/503 errors
```
Solution: 
1. Check if service is running in Render dashboard
2. Free tier sleeps after 15 min inactivity (first request takes 30s)
3. Verify PORT environment variable is set
```

### Frontend Issues

**Problem**: API calls fail (CORS errors)
```
Solution:
1. Check browser console for exact error
2. Verify NEXT_PUBLIC_API_URL is correct
3. Ensure backend CORS includes your Vercel domain
4. Redeploy both services
```

**Problem**: Environment variable not working
```
Solution:
1. Environment variables must start with NEXT_PUBLIC_
2. Redeploy after adding env vars in Vercel dashboard
3. Check "Environment Variables" tab in Vercel project settings
```

**Problem**: Build fails
```
Solution:
1. Check Vercel build logs
2. Ensure root directory is set to "frontend"
3. Verify package.json has correct scripts
4. Try deploying from Vercel dashboard instead of auto-deploy
```

### Performance Issues

**Problem**: Backend is slow (first request)
```
Solution: Free tier sleeps after inactivity
1. First request wakes up service (30-60 seconds)
2. Subsequent requests are fast
3. Consider paid plan for always-on service
```

**Problem**: Model predictions timeout
```
Solution:
1. Increase timeout in Render dashboard
2. Optimize model loading (lazy load if needed)
3. Check model file sizes
```

---

## 🎯 Production Optimization Tips

### 1. Pre-train Models
Instead of training on every deploy:
```bash
# Locally
python generate_data.py
python train_models.py

# Commit trained models
git add backend/models/*.pkl backend/models/*.keras
git commit -m "chore: Add pre-trained models"
git push

# Update render.yaml build command
buildCommand: "pip install -r requirements.txt"
```

### 2. Use Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `frontend/app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 3. Add Loading States
Improve UX for slow API calls:
```tsx
{loading[algo.id] && <Spinner />}
```

### 4. Implement Caching
Add response caching in FastAPI:
```python
from fastapi_cache import FastAPICache
from fastapi_cache.backends.inmemory import InMemoryBackend
```

---

## 🌐 Alternative Deployment Options

### Option 1: Railway.app (Backend)
Similar to Render, also offers free tier:
1. Connect GitHub
2. Deploy from root
3. Set start command: `uvicorn backend.main:app`

### Option 2: Heroku (Backend)
Requires Procfile:
```
web: uvicorn backend.main:app --host 0.0.0.0 --port $PORT
```

### Option 3: DigitalOcean App Platform
1. Create new app
2. Select repository
3. Configure build/start commands
4. Deploy

### Option 4: Full Vercel (Advanced)
Convert FastAPI to Vercel Serverless:
- Requires restructuring endpoints as API routes
- Complex for ML models
- Not recommended for this project

---

## 📱 Sharing Your Deployment

Once deployed, share these links:

**Live Application**
- Frontend: `https://skinsync.vercel.app`
- API Docs: `https://skinsync-backend.onrender.com/docs`
- Metrics: `https://skinsync-backend.onrender.com/models/metrics`

**GitHub Repository**
- Source Code: `https://github.com/Pyae-Sone-Chan-Thar-Aung/ML_SkinSyn`

**For Presentation**
- Open Try Now page
- Demo live predictions
- Show API documentation
- Display training metrics

---

## 🎓 Presentation Tips

1. **Start with deployed app** - Show it works live
2. **Demo interactivity** - Use Try Now page with real inputs
3. **Show API docs** - Swagger UI is impressive
4. **Display metrics** - Prove models are trained
5. **Show GitHub** - Demonstrate code quality
6. **Explain architecture** - Frontend ↔ Backend ↔ ML Models

---

## 📞 Support & Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment/
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

## ✅ Deployment Complete!

Once both services are deployed:
1. ✅ Backend serving ML predictions
2. ✅ Frontend providing beautiful UI
3. ✅ CORS configured for communication
4. ✅ Environment variables set
5. ✅ All 6 algorithms accessible

Your SkinSync ML platform is now live on the internet! 🚀

**Next Steps:**
- Test thoroughly before presentation
- Bookmark your URLs
- Prepare for demo day
- Consider custom domain (optional)

Good luck with your presentation! 🎉
