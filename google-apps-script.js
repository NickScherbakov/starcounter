// StarCounter Pro - Google Apps Script for Email Collection
// 
// SETUP INSTRUCTIONS:
// 1. Create a Google Sheet with columns: Email | Timestamp | Source | IP | User Agent
// 2. Go to Extensions → Apps Script
// 3. Paste this code
// 4. Click Deploy → New deployment → Web app
// 5. Set "Execute as: Me" and "Who has access: Anyone"
// 6. Copy the Web App URL and update coming-soon.html

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get current timestamp
    const timestamp = new Date();
    
    // Check if email already exists (prevent duplicates)
    const existingData = sheet.getDataRange().getValues();
    const emailExists = existingData.some(row => row[0] === data.email);
    
    if (emailExists) {
      return ContentService
        .createTextOutput(JSON.stringify({ 
          status: 'duplicate',
          message: 'This email is already subscribed!' 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add row with email, timestamp, source, and metadata
    sheet.appendRow([
      data.email,
      timestamp.toISOString(),
      data.source || 'coming-soon-page',
      data.userAgent || 'N/A',
      data.referrer || 'Direct'
    ]);
    
    // Send email notification to you (CHANGE THIS EMAIL!)
    const YOUR_EMAIL = 'your-email@example.com'; // ← CHANGE THIS!
    
    try {
      MailApp.sendEmail({
        to: YOUR_EMAIL,
        subject: '🎉 New StarCounter Pro Subscriber! 🌟',
        htmlBody: `
          <h2>New Subscriber Alert!</h2>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Time:</strong> ${timestamp.toLocaleString()}</p>
          <p><strong>Source:</strong> ${data.source}</p>
          <p><strong>Total Subscribers:</strong> ${sheet.getLastRow() - 1}</p>
          <hr>
          <p style="color: #666;">
            <a href="https://nickscherbakov.github.io/starcounter">View Landing Page</a>
          </p>
        `
      });
    } catch (mailError) {
      Logger.log('Email notification failed: ' + mailError);
      // Continue even if email fails
    }
    
    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'success',
        message: 'Successfully subscribed!',
        count: sheet.getLastRow() - 1
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test endpoint - visit the web app URL to check if it's working
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const subscriberCount = sheet.getLastRow() - 1; // Subtract header row
  
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'running',
      message: 'StarCounter Pro Email Collection API is active!',
      subscribers: subscriberCount,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Function to get subscriber count
function getSubscriberCount() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  return sheet.getLastRow() - 1; // Subtract header row
}

// Optional: Function to export emails as comma-separated string
function exportEmails() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const emails = data.slice(1).map(row => row[0]); // Skip header
  return emails.join(', ');
}
