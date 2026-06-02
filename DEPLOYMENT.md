# Blog Management System - Deployment Guide

## 📋 Overview

This guide covers deploying the Blog Management System to production platforms. The project consists of:
- **Frontend**: Next.js application → Deploy to Vercel/Netlify
- **Backend**: Express.js API → Deploy to Railway/Render/Heroku
- **Database**: MongoDB → Use MongoDB Atlas (managed)

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create organization and project

### Step 2: Create Cluster
1. Click "Create Deployment"
2. Choose "Shared" (free tier)
3. Select cloud provider (AWS recommended)
4. Select region (choose closest to your users)
5. Click "Create Deployment"

### Step 3: Configure Network & Users
1. Go to "Network Access" → Add IP Address
2. Click "Allow Access from Anywhere" (or specific IPs)
3. Go to "Database Access" → Create Database User
   - Username: `blogadmin`
   - Password: Generate strong password
   - Builtin Roles: `Atlas Admin`
4. Save credentials securely

### Step 4: Get Connection String
1. Click "Connect"
2. Choose "Connect your application"
3. Copy connection string
4. Format: `mongodb+srv://username:password@cluster.mongodb.net/blog_db?retryWrites=true&w=majority`
5. Replace `<username>`, `<password>`, `<cluster>`

---

## 🚀 Backend Deployment (Railway)

### Prerequisites
- Railway account ([railway.app](https://railway.app))
- GitHub account with forked repository
- Backend code pushed to GitHub

### Step 1: Create Railway Project
1. Log in to Railway
2. Click "New Project"
3. Select "GitHub Repo"
4. Authorize Railway with GitHub
5. Select your repository

### Step 2: Configure Environment Variables
1. Go to project settings
2. Add variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog_db?retryWrites=true&w=majority
   CORS_ORIGIN=https://your-frontend-domain.com
   ```
3. Click "Save"

### Step 3: Deploy
1. Railway auto-detects Node.js project
2. Automatically installs dependencies
3. Runs `npm start`
4. Generates domain: `https://your-app.railway.app`

### Step 4: Verify Deployment
```bash
curl https://your-app.railway.app/api/health
```

---

## 🎨 Frontend Deployment (Vercel)

### Prerequisites
- Vercel account ([vercel.com](https://vercel.com))
- GitHub account with forked repository

### Step 1: Import Project to Vercel
1. Log in to Vercel
2. Click "New Project"
3. Select "Import Git Repository"
4. Authorize Vercel with GitHub
5. Select your repository
6. Click "Import"

### Step 2: Configure Build Settings
1. Framework: Auto-detected (Next.js)
2. Build Command: `npm run build`
3. Output Directory: `.next`
4. Install Command: `npm install`

### Step 3: Add Environment Variables
1. Go to Project Settings → Environment Variables
2. Add variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-domain.railway.app/api
   ```
3. Select Environments: Production
4. Click "Save"

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Get production URL: `https://your-project.vercel.app`

### Step 5: Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add custom domain
3. Configure DNS records according to Vercel instructions

---

## 🔗 Update CORS Configuration

After deployment, update backend CORS settings:

**Backend (.env in production):**
```
CORS_ORIGIN=https://your-project.vercel.app
```

Then restart the backend on Railway.

---

## 📝 Alternative Deployment Options

### Frontend - Netlify
1. Sign up at netlify.com
2. Connect GitHub repository
3. Build Command: `npm run build`
4. Publish Directory: `.next`
5. Add environment variable: `NEXT_PUBLIC_API_URL=...`
6. Deploy

### Backend - Render
1. Sign up at render.com
2. Create new Web Service
3. Connect GitHub repository
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables
7. Deploy

### Backend - Heroku
```bash
heroku login
heroku create your-app-name
heroku config:set MONGODB_URI=...
heroku config:set CORS_ORIGIN=...
git push heroku main
```

---

## ✅ Post-Deployment Verification

### Test Backend
```bash
# Health Check
curl https://your-backend-domain.railway.app/api/health

# Get All Posts
curl https://your-backend-domain.railway.app/api/posts

# Search
curl "https://your-backend-domain.railway.app/api/posts/search?query=test"
```

### Test Frontend
1. Open https://your-project.vercel.app in browser
2. List page should load posts from API
3. Test create post functionality
4. Test edit and delete
5. Test search and filter
6. Test CSV export

### Monitoring & Logs
- **Railway**: Dashboard → View Logs
- **Vercel**: Dashboard → Deployments → Logs
- **Netlify**: Dashboard → Deploys → View Log

---

## 🔒 Security Checklist

- [x] Environment variables not exposed
- [x] CORS restricted to production domain
- [x] MongoDB password secured
- [x] HTTPS enabled (automatic with Vercel/Railway)
- [x] No debugging/logging of sensitive data
- [x] Input validation on all endpoints
- [x] Error messages don't expose internals

---

## 📊 Performance Optimization

### Backend
- Database queries optimized with indexing
- Response compression enabled
- Pagination limits data transfer

### Frontend
- Code splitting & lazy loading
- Image optimization
- CSS minification

---

## 🆘 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify environment variables
- Check logs in Railway dashboard

### Frontend shows API errors
- Verify backend URL in .env
- Check CORS origin matches frontend domain
- Verify MongoDB connection

### Deployment failed
- Check logs for errors
- Verify all environment variables set
- Try redeploying manually

---

## 📞 Useful Links

- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Railway: https://railway.app
- Render: https://render.com
- Heroku: https://www.heroku.com
- Vercel: https://vercel.com
- Netlify: https://www.netlify.com

---

## 📈 Next Steps After Deployment

1. Monitor application performance
2. Set up automated backups
3. Enable monitoring/alerting
4. Plan for scaling if needed
5. Regular security updates

---

**Last Updated**: 2024
**Status**: Complete