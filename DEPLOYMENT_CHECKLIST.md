# 🚀 Quick Deployment Checklist

## Before You Deploy

- [ ] All code committed to GitHub
- [ ] Models trained locally
- [ ] Backend tested locally (localhost:8000)
- [ ] Frontend tested locally (localhost:3000)
- [ ] All 6 algorithms working

---

## Render.com Deployment (Backend)

### 1. Setup (5 minutes)
- [ ] Create Render.com account with GitHub
- [ ] Click "New +" → "Web Service"
- [ ] Select ML_SkinSyn repository

### 2. Configuration
- [ ] Name: `skinsync-backend`
- [ ] Root Directory: `backend`
- [ ] Build Command: `pip install -r requirements.txt && python generate_data.py && python train_models.py`
- [ ] Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] Plan: Free

### 3. Deploy & Test (10 minutes)
- [ ] Click "Create Web Service"
- [ ] Wait for build to complete
- [ ] Copy your backend URL: `https://______.onrender.com`
- [ ] Test: `https://______.onrender.com/health`
- [ ] Test: `https://______.onrender.com/docs`

---

## Vercel Deployment (Frontend)

### 1. Update Environment
- [ ] Edit `frontend/.env.production`
- [ ] Set: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
- [ ] Commit and push to GitHub

### 2. Deploy (3 minutes)
- [ ] Go to vercel.com
- [ ] Sign up with GitHub
- [ ] Click "Import Project"
- [ ] Select ML_SkinSyn
- [ ] Root Directory: `frontend`
- [ ] Add Environment Variable: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`
- [ ] Click "Deploy"

### 3. Test (2 minutes)
- [ ] Visit your Vercel URL
- [ ] Go to Try Now page
- [ ] Test 2-3 algorithms
- [ ] Verify predictions work

---

## Final Verification

- [ ] Frontend loads without errors
- [ ] Try Now page displays correctly
- [ ] Click Naive Bayes → See prediction
- [ ] Click SVM → See allergen risk
- [ ] Click ANN → See satisfaction score
- [ ] Resources panel links work
- [ ] API Docs accessible
- [ ] No CORS errors in browser console

---

## URLs to Save

**Backend (Render)**
- Service URL: `https://______.onrender.com`
- API Docs: `https://______.onrender.com/docs`
- Health: `https://______.onrender.com/health`

**Frontend (Vercel)**
- App URL: `https://______.vercel.app`
- Try Now: `https://______.vercel.app/try-now`

**Repository**
- GitHub: `https://github.com/Pyae-Sone-Chan-Thar-Aung/ML_SkinSyn`

---

## Troubleshooting Quick Fixes

**Backend not loading?**
```bash
# Check Render logs in dashboard
# Free tier sleeps - first request takes 30s
```

**CORS errors?**
```bash
# Update backend/main.py allow_origins
# Add your Vercel URL
# Redeploy Render service
```

**Environment variable not working?**
```bash
# Must start with NEXT_PUBLIC_
# Redeploy Vercel after adding
```

---

## Presentation Day

1. **Test 30 min before**: Visit both URLs
2. **Bookmark URLs**: Quick access during demo
3. **Have backup**: Screenshots if internet fails
4. **Practice demo**: 2-3 algorithm predictions
5. **Show confidence**: You built this!

---

Total Time: ~20 minutes
Ready to impress! 🎉
