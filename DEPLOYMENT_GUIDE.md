# 🌐 Deploy to Render - Make Your Website Live!

## Step-by-Step Instructions

### 1. Sign Up for Render
- Go to: https://render.com
- Click **"Get Started"** or **"Sign Up"**
- Sign up using your GitHub account (easiest option)
- This will automatically connect Render to your GitHub

### 2. Create New Web Service
- Click **"New +"** button (top right)
- Select **"Web Service"**

### 3. Connect Your Repository
- You'll see a list of your GitHub repositories
- Find and select: **"knowledge-academy"**
- Click **"Connect"**

### 4. Configure Your Service
Render will auto-detect most settings, but verify:

- **Name:** `knowledge-academy` (or choose your own)
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Instance Type:** `Free`

Click **"Create Web Service"**

### 5. Wait for Deployment (2-5 minutes)
- Render will show you a live log as it builds
- You'll see:
  - "Installing dependencies..."
  - "Build succeeded"
  - "Service is live"

### 6. Your Website is LIVE! 🎉
Once deployed, Render gives you a URL like:
```
https://knowledge-academy.onrender.com
```

**This URL is permanent and accessible from anywhere in the world!**

## 🚨 Important Notes

### Excel File Storage
**Warning:** Render's free tier has **ephemeral storage** - this means:
- Excel files will be created when forms are submitted
- BUT they will be **deleted when the server restarts** (every ~15 minutes of inactivity)

**Solutions:**
1. **Upgrade to Paid Plan** ($7/month) - includes persistent disk storage
2. **Use Google Sheets API** - store form data in Google Sheets instead
3. **Use a Database** - PostgreSQL (free on Render) or MongoDB

### Auto-Sleep on Free Plan
- Free tier sleeps after 15 minutes of inactivity
- First visitor after sleep will wait ~30 seconds for startup
- Upgrade to $7/month to keep it always running

### Large File Warning
The STEP Tools installer (60MB) might slow down deployments. Consider:
- Moving it to cloud storage (Google Drive, Dropbox)
- Using a download link instead of hosting it

## 🔧 Making Changes

After deployment, when you update your code:

```bash
# Make your changes
# Then commit and push to GitHub
git add .
git commit -m "Your update message"
git push

# Render automatically detects and redeploys!
```

## 📊 Recommended: Switch to Database

For permanent form storage, let's use PostgreSQL:

1. In Render dashboard, click **"New +"**
2. Select **"PostgreSQL"**
3. Name it `knowledge-academy-db`
4. Click **"Create Database"** (Free tier available)
5. I can update your code to use PostgreSQL instead of Excel

**Want me to set up PostgreSQL for you?** Just ask!

## 🎯 Your Deployment Checklist

- [ ] Sign up at render.com with GitHub
- [ ] Create Web Service from knowledge-academy repo
- [ ] Verify build settings
- [ ] Wait for deployment to complete
- [ ] Test your live URL
- [ ] Share your website with the world!

## 🆘 Troubleshooting

**Build fails?**
- Check the build logs in Render
- Most issues are dependency related - already configured correctly for you

**Forms not saving?**
- Excel files work but are temporary on free tier
- Consider upgrading or switching to database

**Site is slow?**
- Free tier sleeps when inactive
- First load after sleep takes ~30 seconds

---

**Ready to deploy?** Go to: https://render.com/

Need help? I'm here! 🚀
