# 📤 Upload to GitHub - Step by Step Guide

## Before You Upload

✅ I've already prepared your project:
- Created `.gitignore` (excludes node_modules, Excel files, etc.)
- Created professional README.md
- Your project is ready to upload!

## Option 1: Using GitHub Desktop (Easiest)

1. **Download GitHub Desktop**
   - Go to: https://desktop.github.com/
   - Install it

2. **Sign in to GitHub**
   - Open GitHub Desktop
   - Sign in with your GitHub account

3. **Add Your Project**
   - File → Add Local Repository
   - Choose: `C:\New Projects\learning-platform`

4. **Create Repository on GitHub**
   - Click "Publish repository"
   - Name: `learning-platform`
   - Description: "Online learning platform with courses and form submissions"
   - Click "Publish repository"

5. **Done!** Your project is now on GitHub!

## Option 2: Using Git Command Line

1. **Install Git**
   - Download from: https://git-scm.com/
   - Install with default settings

2. **Open PowerShell in your project folder**
   ```powershell
   cd "C:\New Projects\learning-platform"
   ```

3. **Initialize Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Learning Platform with Excel form submissions"
   ```

4. **Create repository on GitHub.com**
   - Go to: https://github.com/new
   - Repository name: `learning-platform`
   - Click "Create repository"

5. **Link and push**
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/learning-platform.git
   git branch -M main
   git push -u origin main
   ```

## For Others to Use Your Project

When someone clones your repository, they need to:

```bash
# Clone the repo
git clone https://github.com/YOUR-USERNAME/learning-platform.git

# Enter directory
cd learning-platform

# Install dependencies
npm install

# Start server
npm start

# Access at http://localhost:3000
```

## ⚠️ Important Notes

**What's NOT uploaded (in .gitignore):**
- `node_modules/` (too large, installed via npm)
- `*.xlsx` files (generated when forms are submitted)
- Test files (debug files)

**What IS uploaded:**
- All HTML, CSS, JavaScript files
- `server.js` (backend)
- `package.json` (dependencies list)
- Course content
- Assets (STEP Tools installer)
- README and documentation

## 🔒 Security Tips

Before uploading, make sure:
- ✅ No passwords or API keys in code
- ✅ `.gitignore` is working
- ✅ Test files removed (already done!)

## After Upload

Your project will be at:
```
https://github.com/YOUR-USERNAME/learning-platform
```

Share this link with anyone who wants to:
- View your code
- Clone and run locally
- Contribute improvements

---

Need help? Check: https://docs.github.com/en/get-started
