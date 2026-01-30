# Form Submission System Setup

This guide will help you set up the backend server to save form submissions to Excel files.

## 📋 Prerequisites

- Node.js installed on your computer (Download from https://nodejs.org/)

## 🚀 Quick Start

### Step 1: Install Dependencies

Open PowerShell in the project folder and run:

```powershell
npm install
```

This will install:
- Express (web server)
- ExcelJS (Excel file handling)
- CORS (cross-origin requests)
- body-parser (form data handling)

### Step 2: Start the Server

Run one of these commands:

```powershell
# Start the server
npm start

# OR for auto-restart on changes (development mode)
npm run dev
```

You should see:
```
✅ Server running on http://localhost:3000
📊 Contact form submissions will be saved to: form-submissions.xlsx
💼 Consulting form submissions will be saved to: consulting-submissions.xlsx
```

### Step 3: Access Your Website

Open your browser and go to:
- **Main site**: http://localhost:3000
- **Consulting page**: http://localhost:3000/consulting.html

## 📊 Excel Files

When someone submits a form, the data will be automatically saved to Excel files in the project folder:

1. **form-submissions.xlsx** - Contact form submissions from the homepage
   - Timestamp
   - Name
   - Email
   - Subject
   - Message

2. **consulting-submissions.xlsx** - Consulting form submissions
   - Timestamp
   - Name
   - Email
   - Company
   - Service
   - Message

## 🌐 Accessing from Phone/Other Devices

### Option 1: Same WiFi Network
1. Keep the server running
2. Find your computer's IP address:
   ```powershell
   ipconfig | Select-String -Pattern "IPv4"
   ```
3. On your phone/other device, go to: `http://YOUR-IP:3000`
   (Example: http://10.20.11.101:3000)

### Option 2: Both Servers Running
If you want to use both the Python server (port 8000) and Node server (port 3000):

**Terminal 1:**
```powershell
python -m http.server 8000
```

**Terminal 2:**
```powershell
npm start
```

Then access from phone: `http://YOUR-IP:8000`

## 🛑 Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

## 🔧 Troubleshooting

**"npm: command not found"**
- Install Node.js from https://nodejs.org/

**"Port 3000 already in use"**
- Stop other servers or change the PORT in server.js

**"Form not submitting"**
- Make sure the server is running
- Check browser console for errors (F12)

**Excel file not created**
- Make sure the server has write permissions in the folder
- Check server console for errors

## 📞 Contact Information

All submissions will be saved with your contact details:
- **Email**: r.lakshitha1997@gmail.com
- **Phone**: +94 076 717 5662
- **Name**: Rashan Lakshitha

## 💡 Tips

- Keep the server running while people fill out forms
- Check the Excel files regularly for new submissions
- Back up your Excel files periodically
- The server must be running for forms to work

---

Created by Rashan Lakshitha | Knowledge Academy
