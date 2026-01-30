const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(__dirname));

// Excel file paths
const CONTACT_FORM_FILE = path.join(__dirname, 'form-submissions.xlsx');
const CONSULTING_FORM_FILE = path.join(__dirname, 'consulting-submissions.xlsx');

// Initialize Excel file with headers
async function initializeExcelFile(filePath, headers) {
    if (!fs.existsSync(filePath)) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Submissions');
        
        // Add headers
        worksheet.columns = headers;
        
        // Style headers
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF4facfe' }
        };
        
        await workbook.xlsx.writeFile(filePath);
    }
}

// Save contact form submission to Excel
async function saveContactFormToExcel(data) {
    try {
        console.log('💾 Saving contact form data:', data.name);
        
        const headers = [
            { header: 'Timestamp', key: 'timestamp', width: 20 },
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Subject', key: 'subject', width: 20 },
            { header: 'Message', key: 'message', width: 50 }
        ];
        
        await initializeExcelFile(CONTACT_FORM_FILE, headers);
        
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(CONTACT_FORM_FILE);
        const worksheet = workbook.getWorksheet('Submissions');
        
        // Add new row
        worksheet.addRow({
            timestamp: new Date().toLocaleString(),
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message
        });
        
        await workbook.xlsx.writeFile(CONTACT_FORM_FILE);
        console.log('✅ Contact form saved successfully!');
    } catch (error) {
        console.error('❌ Error saving contact form:', error);
        throw error;
    }
}

// Save consulting form submission to Excel
async function saveConsultingFormToExcel(data) {
    try {
        console.log('💾 Saving consulting form data:', data.name);
        
        const headers = [
            { header: 'Timestamp', key: 'timestamp', width: 20 },
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Company', key: 'company', width: 25 },
            { header: 'Service', key: 'service', width: 25 },
            { header: 'Message', key: 'message', width: 50 }
        ];
        
        await initializeExcelFile(CONSULTING_FORM_FILE, headers);
        
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(CONSULTING_FORM_FILE);
        const worksheet = workbook.getWorksheet('Submissions');
        
        // Add new row
        worksheet.addRow({
            timestamp: new Date().toLocaleString(),
            name: data.name,
            email: data.email,
            company: data.company || 'N/A',
            service: data.service,
            message: data.message
        });
        
        await workbook.xlsx.writeFile(CONSULTING_FORM_FILE);
        console.log('✅ Consulting form saved successfully!');
    } catch (error) {
        console.error('❌ Error saving consulting form:', error);
        throw error;
    }
}

// API endpoint for contact form
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate data
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'All fields are required' 
            });
        }
        
        // Save to Excel
        await saveContactFormToExcel({ name, email, subject, message });
        
        res.json({ 
            success: true, 
            message: 'Your message has been received! We\'ll get back to you soon.' 
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred. Please try again.' 
        });
    }
});

// API endpoint for consulting form
app.post('/api/consulting', async (req, res) => {
    try {
        const { name, email, company, service, message } = req.body;
        
        // Validate data
        if (!name || !email || !service || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Required fields are missing' 
            });
        }
        
        // Save to Excel
        await saveConsultingFormToExcel({ name, email, company, service, message });
        
        res.json({ 
            success: true, 
            message: 'Thank you! Your consulting inquiry has been received.' 
        });
    } catch (error) {
        console.error('Consulting form error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'An error occurred. Please try again.' 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📊 Contact form submissions will be saved to: ${CONTACT_FORM_FILE}`);
    console.log(`💼 Consulting form submissions will be saved to: ${CONSULTING_FORM_FILE}`);
});
