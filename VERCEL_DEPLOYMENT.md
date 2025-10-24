# QANDA Image Upload System - Vercel Deployment

## Quick Deploy to Vercel

### Option 1: Web Interface (Recommended)

1. **Go to Vercel**: https://vercel.com/new
2. **Import Git Repository**:
   - Click "Import Git Repository"
   - Enter: `https://github.com/churryboy/clean-scanner.git`
   - Click "Import"
3. **Configure Project**:
   - Project Name: `qanda-image-upload` (or your choice)
   - Framework Preset: **Other** (static site)
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: `./`
4. **Add Environment Variables**:
   - Key: `MIXPANEL_TOKEN`
   - Value: `296b1b87e332df523af59a12b0c04c45`
5. **Click "Deploy"**
6. **Wait 1-2 minutes** for deployment
7. **Access your site**: `https://qanda-image-upload.vercel.app` (or custom domain)

### Option 2: Vercel CLI

If you have Node.js and npm installed:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? Select your account
# - Link to existing project? N
# - What's your project's name? qanda-image-upload
# - In which directory is your code located? ./
# - Want to override settings? N

# Deploy to production
vercel --prod
```

### Option 3: GitHub Integration (Best for Continuous Deployment)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "Add New..." → Project**
3. **Import Git Repository**:
   - Connect your GitHub account
   - Select `churryboy/clean-scanner`
4. **Configure and Deploy**
5. **Automatic deployments**: Every push to `main` will auto-deploy!

---

## Deployment Configuration

### Project Structure
```
/
├── index.html          # Entry point
├── styles.css          # Styles
├── app.js              # Application logic
├── config.js           # Configuration
├── vercel.json         # Vercel configuration
└── ...
```

### vercel.json
```json
{
  "version": 2,
  "name": "qanda-image-upload",
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

## Environment Variables

Set in Vercel Dashboard → Settings → Environment Variables:

| Key | Value |
|-----|-------|
| `MIXPANEL_TOKEN` | `296b1b87e332df523af59a12b0c04c45` |

---

## Custom Domain (Optional)

1. Go to **Project Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Examples:
   - `upload.qanda.com`
   - `scanner.qanda.ai`
   - `image-upload.yourdomain.com`

---

## Deployment Checklist

### Before Deploying
- [x] All code committed to GitHub
- [x] `.env` in `.gitignore` (token not exposed)
- [x] `vercel.json` configuration created
- [x] All documentation complete

### After Deploying
- [ ] Test site is accessible
- [ ] Test file upload functionality
- [ ] Verify Mixpanel events are tracking
- [ ] Check console for errors
- [ ] Test on mobile devices
- [ ] Test with different file types
- [ ] Verify Korean text displays correctly
- [ ] Test accessibility features

---

## URLs After Deployment

| Type | URL Format | Example |
|------|------------|---------|
| **Production** | `https://[project-name].vercel.app` | `https://qanda-image-upload.vercel.app` |
| **Preview** | `https://[project-name]-[hash].vercel.app` | `https://qanda-image-upload-abc123.vercel.app` |
| **Custom Domain** | Your domain | `https://upload.qanda.com` |

---

## Vercel Features

### Automatic SSL
- HTTPS enabled by default
- Free SSL certificates
- Automatic renewal

### Global CDN
- Deployed to edge network
- Fast loading worldwide
- Optimized for South Korea

### Analytics (Optional)
- Web Vitals tracking
- Performance monitoring
- Real user metrics

### Git Integration
- Auto-deploy on push
- Preview deployments for PRs
- Rollback to any version

---

## Monitoring

### Vercel Dashboard
- **Deployments**: View all deployments
- **Analytics**: Performance metrics
- **Logs**: Runtime logs and errors
- **Settings**: Configure domains, env vars

### Mixpanel Dashboard
- Track user behavior
- Monitor upload success rates
- Analyze performance

---

## Troubleshooting

### Deployment Fails
1. Check Vercel deployment logs
2. Verify all files are committed
3. Check `vercel.json` syntax
4. Ensure no build errors

### Site Not Loading
1. Check Vercel deployment status
2. Verify domain configuration
3. Check browser console for errors
4. Test in incognito mode

### Mixpanel Not Tracking
1. Verify token in browser console
2. Check Network tab for Mixpanel requests
3. Disable ad blockers
4. Check Mixpanel Live View

---

## Cost

**Vercel Free Tier Includes:**
- Unlimited deployments
- 100 GB bandwidth/month
- Automatic SSL
- Git integration
- Preview deployments
- Edge network

**Perfect for this project!** ✅

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **GitHub Issues**: https://github.com/churryboy/clean-scanner/issues

---

**Ready to Deploy!** 🚀

Choose Option 1 (Web Interface) for the quickest deployment.

Repository: https://github.com/churryboy/clean-scanner.git

