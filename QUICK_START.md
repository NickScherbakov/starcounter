# 🚀 QUICK START: Email Collection Setup

## ⏱️ Takes 5 minutes total

---

## Step 1: Create Google Sheet (1 minute)

1. Open: https://sheets.google.com
2. Click: **+ Blank** (create new spreadsheet)
3. Name it: **StarCounter Pro - Email List**
4. Add these headers in Row 1:
   ```
   A1: Email
   B1: Timestamp  
   C1: Source
   D1: User Agent
   E1: Referrer
   ```

---

## Step 2: Add Google Apps Script (2 minutes)

1. In your Google Sheet, click: **Extensions** → **Apps Script**
2. Delete all existing code
3. Copy code from: `/workspaces/starcounter/google-apps-script.js`
4. Paste into Apps Script editor
5. **IMPORTANT:** Change line 43:
   ```javascript
   const YOUR_EMAIL = 'your-email@example.com'; // ← PUT YOUR EMAIL HERE!
   ```
6. Click: **💾 Save** (or Ctrl+S)
7. Name the project: **StarCounter Email Collection**

---

## Step 3: Deploy Web App (1 minute)

1. Click: **Deploy** → **New deployment**
2. Click: ⚙️ (gear icon) → Choose: **Web app**
3. Settings:
   - **Description:** `Email Collection API`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`
4. Click: **Deploy**
5. **Authorization required** popup will appear:
   - Click: **Authorize access**
   - Choose your Google account
   - Click: **Advanced** → **Go to StarCounter Email Collection (unsafe)**
   - Click: **Allow**
6. **COPY THE WEB APP URL** (it looks like):
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```

---

## Step 4: Update Your Website (1 minute)

### Option A: Manual Edit

1. Open: `/workspaces/starcounter/web/coming-soon.html`
2. Find line with: `const GOOGLE_SCRIPT_URL`
3. Replace with your URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```

### Option B: Let Me Do It (easier!)

Just paste your Google Script URL here in chat, and I'll update the file automatically! 😊

---

## Step 5: Deploy to GitHub Pages (30 seconds)

Run this command:
```bash
cd /workspaces/starcounter
git checkout gh-pages
cp web/coming-soon.html coming-soon.html
git add coming-soon.html
git commit -m "Connect Google Sheets email collection"
git push origin gh-pages
git checkout main
```

---

## ✅ Test It!

1. Visit: https://nickscherbakov.github.io/starcounter/coming-soon.html
2. Enter your email
3. Click: **Notify Me When We Launch**
4. Check your Google Sheet - new row should appear!
5. Check your email - you should get notification!

---

## 📊 Monitor Your Progress

### Check Stats Anytime

Visit your Web App URL directly in browser to see:
```json
{
  "status": "running",
  "subscribers": 5,
  "timestamp": "2025-11-14T..."
}
```

### View All Emails

Your Google Sheet has everything:
- Who subscribed
- When they subscribed  
- Where they came from
- What device/browser they used

---

## 🎯 NEXT STEPS

Once you have the Google Script URL:

**Just paste it here in chat** and tell me:
> "Вот мой URL: https://script.google.com/macros/s/..."

And I'll:
1. Update coming-soon.html
2. Deploy to GitHub Pages
3. Test that it works

Then you can start sharing the link! 🚀

---

## 💡 Pro Tips

- **Share early, share often** - the sooner you share, the more emails you collect
- **Post on Reddit** - r/SideProject loves "coming soon" launches
- **Tweet with hashtags** - #buildinpublic #indiedev #github
- **Target: 100 emails** before full launch

---

## 🆘 Need Help?

If something doesn't work:
1. Check Google Apps Script logs (View → Logs)
2. Make sure deployment is set to "Anyone" access
3. Test the Web App URL directly in browser
4. Ask me! I'm here to help 😊
