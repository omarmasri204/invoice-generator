# 🚀 Invoice Generator - Deployment Guide

This guide will help you deploy your Arabic Invoice Generator online using free hosting services.

## 📋 Prerequisites

- GitHub account
- Vercel account (free)
- Railway account (free)

## 🎯 Deployment Options

### Option 1: Vercel + Railway (Recommended)

#### Frontend (Vercel)
1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/invoice-generator.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Set build settings:
     - Framework Preset: `Create React App`
     - Root Directory: `client`
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Add environment variable:
     - Name: `REACT_APP_API_URL`
     - Value: `https://your-railway-app.railway.app` (you'll get this after deploying backend)

3. **Deploy**

#### Backend (Railway)
1. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository
   - Set root directory to `server`
   - Add environment variables:
     - `NODE_ENV=production`
     - `PORT=5000`

2. **Get your Railway URL**
   - After deployment, copy the generated URL
   - Update your Vercel environment variable with this URL

### Option 2: Vercel + Vercel Functions

#### Frontend + Backend (Vercel)
1. **Create API routes**
   - Create `client/api/` directory
   - Move server logic to Vercel functions
   - Update frontend to use relative API paths

2. **Deploy to Vercel**
   - Same as Option 1, but no separate backend needed

## 🔧 Configuration

### Environment Variables

#### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend-url.com
```

#### Backend (Railway)
```
NODE_ENV=production
PORT=5000
```

### CORS Configuration

Update the CORS origin in `server/index.js`:
```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.vercel.app'] // Your actual Vercel domain
    : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
```

## 📁 File Structure for Deployment

```
invoice-generator/
├── client/                 # Frontend (Vercel)
│   ├── package.json
│   ├── public/
│   └── src/
├── server/                 # Backend (Railway)
│   ├── package.json
│   ├── index.js
│   └── uploads/
├── vercel.json            # Vercel configuration
└── DEPLOYMENT.md          # This file
```

## 🚀 Quick Deploy Commands

### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd client
vercel

# Deploy backend
cd ../server
vercel
```

### Option 2: Railway CLI
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login to Railway
railway login

# Deploy backend
cd server
railway up
```

## 🔍 Testing Your Deployment

1. **Frontend**: Visit your Vercel URL
2. **Backend**: Test API endpoints
   - `GET /api/health`
   - `GET /api/stored-files`
3. **File Upload**: Test logo/stamp upload
4. **PDF Generation**: Test PDF download

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS configuration in server
   - Verify frontend URL in backend CORS settings

2. **File Upload Issues**
   - Check file size limits
   - Verify uploads directory permissions

3. **Environment Variables**
   - Ensure all environment variables are set
   - Check variable names match code

4. **Build Errors**
   - Check package.json dependencies
   - Verify build commands

### Debug Commands

```bash
# Check server logs (Railway)
railway logs

# Check frontend build (Vercel)
vercel logs

# Test API locally
curl https://your-backend-url.com/api/health
```

## 📊 Monitoring

### Vercel Analytics
- Built-in analytics
- Performance monitoring
- Error tracking

### Railway Monitoring
- Application logs
- Resource usage
- Error tracking

## 🔒 Security Considerations

1. **File Upload Security**
   - File type validation
   - Size limits
   - Virus scanning (optional)

2. **CORS Security**
   - Restrict origins to your domains
   - Use HTTPS in production

3. **Environment Variables**
   - Never commit secrets
   - Use platform environment variables

## 🎉 Success!

Once deployed, your invoice generator will be available at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review platform documentation
3. Check application logs
4. Verify environment variables

---

**Happy Deploying! 🚀** 