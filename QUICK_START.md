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

## Step 2: Fast Email Collection (Formspree, 2 minutes)

Мы больше НЕ используем сложный Apps Script. Вместо этого — внешний сервис Formspree.

1. Откройте https://formspree.io
2. Зарегистрируйтесь (GitHub / Email)
3. Создайте форму → получите **Form ID** вида `abcdxyz`
4. Замените `FORM_ID` в тегe `<form action="https://formspree.io/f/FORM_ID" ...>` внутри `coming-soon.html`
5. Сохраните файл.

Дополнительно (опционально):
- В настройках Formspree включите reCAPTCHA (если нужно)
- Настройте письмо-уведомление (уже автоматически отправляется на ваш email)

Honeypot поле `website` уже добавлено — боты будут отсекаться.

----

## Step 3: (Optional) Replace Counter With Real

Чтобы сделать реальное количество подписчиков:
1. В Formspree → Submissions → посмотрите число.
2. В `coming-soon.html` вручную обновите стартовое значение `247` (или удалите локальный counter полностью).
3. Для автоматизации позже можно прикрутить маленький сервер / запрашивать через API (пока не нужно).

----

## Step 4: Deploy to GitHub Pages (30 seconds)

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

1. Зайдите: https://nickscherbakov.github.io/starcounter/coming-soon.html
2. Введите email → отправьте.
3. Откройте Formspree → Submissions — должна появиться новая запись.
4. Проверьте почту — должно прийти письмо от Formspree.

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

Как только вы вставили ваш FORM_ID — можно сразу делиться ссылкой. Никаких дополнительных шагов.

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
