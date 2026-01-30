# 🎓 Knowledge Academy - Learning Platform

A comprehensive online learning platform featuring courses in Software Engineering, Programming, Mechanical Engineering, Electrical Engineering, and English Language. Includes contact forms with Excel integration for inquiry management.

![Platform Preview](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 📚 **Multiple Course Categories**
  - Software Engineering
  - Programming (Python, JavaScript, C++)
  - Mechanical Engineering
  - Electrical Engineering
  - English Language

- 🛠️ **Products Section**
  - STEP Tools Suite download

- 💼 **Consulting Services**
  - Professional software consulting
  - Custom development services

- 📝 **Form Submissions**
  - Contact form
  - Consulting inquiry form
  - Automatic Excel file generation
  - Real-time data storage

- 🎨 **Modern UI/UX**
  - Responsive design
  - Dark theme with colorful animations
  - Progress tracking
  - Interactive visual effects

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- Web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/learning-platform.git
   cd learning-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the website**
   - Open your browser and go to: `http://localhost:3000`

## 📱 Mobile Access

To access from your phone/tablet on the same WiFi network:

1. Find your computer's IP address:
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

2. On your mobile device, open browser and go to:
   ```
   http://YOUR-IP-ADDRESS:3000
   ```

## 📊 Form Submissions

When users submit forms, data is automatically saved to Excel files:

- `form-submissions.xlsx` - Contact form submissions
- `consulting-submissions.xlsx` - Consulting inquiries

### Important Notes:
- Excel files are created automatically on first submission
- **Close Excel files** before form submissions to allow server to write data
- Files include: Timestamp, Name, Email, Subject/Service, Message

## 📁 Project Structure

```
learning-platform/
├── assets/                  # Downloadable files
├── courses/                 # Course content pages
├── css/                     # Stylesheets
├── js/                      # JavaScript files
├── index.html              # Main page
├── consulting.html         # Consulting page
├── server.js               # Node.js backend
├── package.json            # Dependencies
└── README.md              # This file
```

## 🛠️ Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js, ExcelJS
- **Styling:** Custom CSS with animations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Rashan Lakshitha**
- Email: r.lakshitha1997@gmail.com
- Phone: +94 076 717 5662

---

Made with ❤️ by Rashan Lakshitha
