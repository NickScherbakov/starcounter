# StarCounter Pro - Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from web directory
cd web
vercel --prod
```

### Option 2: Vercel GitHub Integration

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import this repository: `NickScherbakov/starcounter`
4. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `web`
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
5. Click "Deploy"

### Option 3: Manual Upload

1. Go to [vercel.com/new](https://vercel.com/new)
2. Select "Upload files"
3. Upload the `web` folder
4. Deploy

---

## 🌐 Custom Domain Setup

### After deployment:

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your domain (suggestions):
   - `starcounter.pro` (Premium - $50/year)
   - `starcounter.dev` (Developer focused - $15/year)
   - `starcounter.app` (Modern - $15/year)
   - `github-stars.com` (Available - $10/year)

4. Follow Vercel's DNS setup instructions

---

## 📊 Email Collection Backend

### Current: localStorage (temporary)

The landing page currently stores emails in browser localStorage for demo purposes.

### Production Options:

#### Option A: Make.com Webhook (No-code, Free tier available)
```javascript
// Replace in coming-soon.html after signup:
fetch('https://hook.us1.make.com/YOUR_WEBHOOK_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        email: email, 
        timestamp: new Date().toISOString(),
        source: 'coming-soon-page'
    })
});
```

#### Option B: Google Forms (100% Free)
1. Create a Google Form with email field
2. Get the form action URL
3. Submit via fetch to Google Forms endpoint

#### Option C: Supabase (Free tier, recommended for scaling)
```javascript
// Install Supabase JS client
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('YOUR_URL', 'YOUR_ANON_KEY')

// On form submit:
const { data, error } = await supabase
    .from('waitlist')
    .insert([{ email, created_at: new Date() }])
```

#### Option D: Simple Backend API (Next.js API Route)
Convert to Next.js and add:
```javascript
// pages/api/waitlist.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;
        // Save to database
        res.status(200).json({ success: true });
    }
}
```

---

## 📈 Analytics Setup

### Add to `<head>` in coming-soon.html:

#### Vercel Analytics (Free with Vercel)
```html
<script defer src="/_vercel/insights/script.js"></script>
```

#### Google Analytics (Free)
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Plausible Analytics (Privacy-focused, $9/month)
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🎯 Launch Checklist

### Before deploying:

- [ ] Choose domain name
- [ ] Set up email collection backend (Make.com webhook recommended)
- [ ] Add analytics tracking
- [ ] Test on mobile devices
- [ ] Add meta tags for social sharing (Open Graph)
- [ ] Set up monitoring (Vercel has built-in)

### After deploying:

- [ ] Share on Twitter/X
- [ ] Post in relevant Reddit communities (r/webdev, r/github, r/programming)
- [ ] Post on Hacker News "Show HN: StarCounter Pro - Coming Soon"
- [ ] Email to your GitHub followers (if you have list)
- [ ] Add to Product Hunt "Upcoming" section

---

## 💰 Cost Breakdown

| Service | Free Tier | Paid (if needed) |
|---------|-----------|------------------|
| Vercel Hosting | ✅ Unlimited (Hobby) | $20/month (Pro) |
| Domain (.dev) | - | $15/year |
| Make.com Webhook | ✅ 1,000 ops/month | $9/month |
| Email Service (later) | Resend: 3,000/month | $20/month |
| **Total Monthly** | **$1.25** | **$30+** |

---

## 🔥 Marketing Strategy for Launch

### Week 1: Soft Launch
- Deploy to Vercel
- Share with close network
- Collect first 50 emails
- Gather feedback

### Week 2-3: Content Marketing
- Write blog post: "Why I built StarCounter Pro"
- Create Twitter thread
- Post on Dev.to
- Submit to Indie Hackers

### Week 4: Hard Launch
- Product Hunt launch
- Reddit posts
- Hacker News "Show HN"
- Reach out to tech influencers

---

## 📝 Next Steps After Email Collection

### When you have 100+ emails:

1. **Build the actual product** (MVP from index.html)
2. **Set up payment** (Stripe)
3. **Email the list** with early access link
4. **Offer special deal**: "You're on the list - get 3 months free"

### Growth targets:

- 100 emails → Start building
- 500 emails → Validates demand strongly
- 1,000+ emails → Strong PMF signal, consider raising funding

---

## 🚨 Important Notes

1. **GDPR Compliance**: Add privacy policy link
2. **Unsubscribe**: Include unsubscribe mechanism
3. **Double opt-in**: Consider adding email confirmation
4. **Spam prevention**: Add reCAPTCHA if you get fake signups

---

Ready to deploy? Run: `vercel --prod` from the `web` directory!
