# 📧 Email Collection Setup Guide

## Google Sheets + Google Apps Script Integration

### Step 1: Create Google Sheet

1. Go to https://sheets.google.com
2. Create new spreadsheet: **"StarCounter Pro - Email List"**
3. Add headers in Row 1:
   - A1: `Email`
   - B1: `Timestamp`
   - C1: `Source`

### Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete existing code and paste this:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Add row with email, timestamp, and source
    sheet.appendRow([
      data.email,
      data.timestamp,
      data.source
    ]);
    
    // Send email notification to you (optional)
    MailApp.sendEmail({
      to: 'your-email@example.com',
      subject: '🎉 New StarCounter Pro Subscriber!',
      body: `New email: ${data.email}\nTime: ${data.timestamp}`
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('StarCounter Pro Email Collection API is running!');
}
```

### Step 3: Deploy Web App

1. Click **Deploy** → **New deployment**
2. Choose type: **Web app**
3. Settings:
   - Description: `StarCounter Email Collection`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. **Copy the Web App URL** (looks like: `https://script.google.com/macros/s/ABC.../exec`)

### Step 4: Update Website

1. Open `/workspaces/starcounter/web/coming-soon.html`
2. Find line: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';`
3. Replace with your actual URL: `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';`

### Step 5: Test

1. Visit your website
2. Enter test email
3. Check Google Sheet - new row should appear!

---

## 📊 Analytics Setup (Optional but Recommended)

### Google Analytics 4

1. Go to https://analytics.google.com
2. Create new property: **StarCounter Pro**
3. Get your Measurement ID (looks like `G-XXXXXXXXXX`)
4. Add to `coming-soon.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🚀 Quick Deploy Script

Run this after updating the Google Script URL:

```bash
cd /workspaces/starcounter
git checkout gh-pages
cp web/coming-soon.html coming-soon.html
git add coming-soon.html
git commit -m "Update email collection with Google Sheets"
git push origin gh-pages
git checkout main
```

---

## 📈 What to Track

Monitor these metrics in your Google Sheet:
- **Daily signups** - are people interested?
- **Email domains** - who's your audience? (.edu = students, .com = professionals)
- **Peak times** - when do people visit?

**Target:** 100 emails before Product Hunt launch

---

## 💡 Next Steps After Setup

1. Share the link on social media
2. Post on Reddit: r/SideProject, r/webdev
3. Write a Dev.to article
4. Reach out to dev influencers

**Your live URL:** https://nickscherbakov.github.io/starcounter/coming-soon.html
