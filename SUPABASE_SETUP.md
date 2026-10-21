# LearnAble — Supabase Backend Complete Setup Guide
> **Language Note:** Yeh guide simple **Hinglish** (Hindi in English letters + English technical terms) mein likhi gayi hai taaki beginner students aur viva examiners dono ise aasaani se samajh sakein.

---

## Step 1: Supabase Kya Hai? (What is Supabase in 5 Lines)

1. **Supabase ek free, cloud-hosted backend platform hai** jo hume database (PostgreSQL), login/authentication, aur fast APIs provide karta hai bina kisi server coding ke.
2. **Analogy (Excel Sheet example):** Database ko ek Excel Workbook samjho. Har ek **Table** ek Excel sheet hai (jaise `feedback`, `resources`), har ek **Row** ek record ya student entry hai, aur har ek **Column** ek field hai (jaise `name`, `rating`).
3. **RLS (Row Level Security):** Yeh ek digital security guard ya lock hai jo decide karta hai ki kaun sa data public dekh sakti hai aur kaun sa data sirf Admin read/delete kar sakta hai.
4. **SQL Editor:** Ek simple text area jahan hum database tables aur rules create karne ke commands paste karte hain.
5. **Auth:** Supabase ka built-in secure login system jo email + password ko automatically hash aur verify karta hai.

---

## Step 2: Supabase Par Account Banayein (Create Account)

1. Apne browser mein [https://supabase.com](https://supabase.com) open karein.
2. Top-right corner mein **"Start your project"** ya **"Sign in"** button par click karein.
3. **"Continue with GitHub"** choose karein (ya apna personal Email daal kar sign up karein).
4. Email verification complete karne ke baad aap **Supabase Dashboard** par land honge.

---

## Step 3: Naya Project Banayein (Create a New Project)

1. Dashboard par green **"New project"** button par click karein.
2. Form mein yeh details fill karein:
   - **Name:** `learnable`
   - **Database Password:** Ek strong password type karein (jaise `LearnAble2026!Secure`).
     > ⚠️ **IMPORTANT NOTE:** Is password ko apne phone ke Notepad mein save kar lein. Yeh password website ke HTML/JS code mein **kahin bhi use nahi hota**, yeh sirf direct database recovery ke liye hota hai.
   - **Region:** India ke sabse paas wala region select karein:
     - `ap-south-1 (Mumbai)` agar list mein available ho,
     - warna `ap-southeast-1 (Singapore)`.
   - **Pricing Plan:** **Free tier** select karein ($0/month).
3. Bottom mein **"Create new project"** button par click karein.
4. Screen par **"Setting up your project"** animation dikhega. Isme **1 se 2 minute** ka time lagta hai. Jab screen ready ho jaye, tab next step karein.

---

## Step 4: Database Tables Banayein (Run the Schema SQL)

1. Left sidebar mein **"SQL Editor"** icon par click karein (terminal `>_` jaisa icon hota hai).
2. Screen ke top par **"+ New query"** button par click karein.
3. LearnAble project folder mein se `supabase/schema.sql` file open karein, uska **pura text copy karein**, aur Supabase SQL Editor ke box mein paste kar dein.
4. Bottom-right corner mein green **"Run"** button par click karein (ya shortcut `Ctrl + Enter` dabayein).
5. **Screen par kya dikhega?**
   - Result panel mein green tick ke sath aana chahiye: `Success. No rows returned`.
6. **Confirm karein (Table Editor check):**
   - Left sidebar mein **"Table Editor"** icon (spreadsheet grid jaisa icon) par click karein.
   - Aapko yeh tables list mein dikhni chahiye:
     - `feedback` (0 rows)
     - `resources` (6 rows seed data loaded!)
     - `quiz_questions` (10 rows loaded!)
     - `quiz_options` (38 options loaded!)
     - `quiz_attempts` (0 rows)
     - `admins` (0 rows)

---

## Step 5: API Keys Copy Karke Website Mein Paste Karein

1. Left bottom sidebar mein **"Project Settings"** (Gear icon ⚙️) par click karein.
2. Settings menu mein **"API"** ya **"API Keys"** par click karein.
3. Wahan do values copy karni hain:
   - **Project URL:** Looks like `https://abcdefghijklm.supabase.co`
   - **anon / public key:** Ek lambi string jo `eyJhbGciOi...` se shuru hoti hai.
4. Apne computer par LearnAble project ka file `js/config.js` open karein aur values paste karein:
   ```javascript
   const SUPABASE_URL = 'https://your-project-id.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOi...apna-anon-key-yahan-paste-karein...';
   ```
5. File ko **Save** karein (`Ctrl + S`).

> 🛑 **VERY CRITICAL SECURITY WARNING:**
> - Kabhi bhi **`service_role` (secret)** key ko `js/config.js` ya GitHub par mat daalna!
> - `service_role` key se koi bhi aapka database bina permission delete kar sakta hai.
> - `anon` (public) key browser mein safe hoti hai kyunki humne Row Level Security (RLS) policies set ki hain jo data ko protect karti hain.

---

## Step 6: Admin User Create Karein (Viva Ke Liye Ready Karein)

Admin panel (`admin.html`) ko secure karne ke liye ek authorized admin account banana zaroori hai:

1. Supabase Dashboard ke left menu mein **"Authentication"** (person icon) par click karein.
2. Sub-menu mein **"Users"** par click karein.
3. Top-right mein **"Add user"** dropdown par click karke **"Create new user"** select karein.
4. Modal box mein:
   - **Email:** Apna email enter karein (e.g. `admin@learnable.org` ya aapka personal email).
   - **Password:** Ek secure password rakhein (e.g. `Admin@LearnAble2026`).
   - ☑️ **"Auto Confirm User"** checkbox ko **TICK** zaroor karein (taaki bina email verify kiye turant login ho sake).
5. **"Create user"** par click karein.
6. Users table mein aapka naya user create ho jayega. Us user ke samne **"User UID"** column dikhega (e.g. `4f1a23b4-9c8d-4e5f-1234-56789abcdef0`). Us UID ko copy kar lein.
7. Ab left sidebar mein wapas **"SQL Editor"** par jayein -> **"New query"** click karein.
8. Yeh command paste karein (apna copied UID quote ke andar daalein):
   ```sql
   insert into public.admins (user_id) values ('PASTE_YOUR_COPIED_UID_HERE');
   ```
9. **"Run"** par click karein. Result aayega: `Success. No rows returned`.
10. **Aapka admin successfully activate ho gaya!** Ab aap `login.html` par jakar is email aur password se login karke `admin.html` dashboard access kar sakte hain.

---

## Step 7: Auth Security Settings

1. Supabase Dashboard mein **"Authentication"** -> **"Providers"** par jayein.
2. Confirm karein ki **"Email"** provider `Enabled` hai.
3. Ab **"Authentication"** -> **"Configuration"** -> **"Sign In / Up"** (ya User Management) par jayein.
4. **"Allow new users to sign up"** ko **OFF (Disable)** kar dein.
   - *Kyun?* Kyunki yeh public portal hai aur hum chahte hain ki koi anjaan vyakti account na bana sake. Sirf wahi login karega jisko humne Admin banaya hai.

---

## Step 8: URL Settings Configure Karein

1. Left sidebar mein **"Authentication"** -> **"URL Configuration"** par click karein.
2. **Site URL:**
   - Local testing ke liye: `http://localhost:5500` (ya `http://127.0.0.1:5500`)
   - Jab Vercel ya GitHub Pages par live karein, toh live URL daalein (jaise `https://sanchitachavan90-design.github.io/learnable-cea/` ya `https://learnable.vercel.app`).
3. **Redirect URLs:** Mein `http://localhost:*` aur apna live domain add kar lein.
4. **"Save"** par click karein.

---

## Step 9: Website Ko Locally Run Kaise Karein (Run Locally)

> ⚠️ **IMPORTANT:** HTML file par seedha double click karke (`file:///C:/...`) mat open karein, kyunki browser security (CORS) ki wajah se database requests block ho sakti hain.

### Recommended Method 1: VS Code Live Server (Sabse Simple)
1. VS Code mein `learnable-project` folder open karein.
2. Left sidebar mein Extensions (Ctrl+Shift+X) par jakar **"Live Server"** (by Ritwick Dey) install karein.
3. `index.html` file par right-click karein aur click karein: **"Open with Live Server"**.
4. Website aapke default browser mein `http://127.0.0.1:5500/index.html` par open ho jayegi!

### Method 2: Node.js / npx serve (Optional)
Agar aapke paas Node installed hai:
```bash
npx serve . -p 5500
```
Phir browser mein `http://localhost:5500` open karein.

---

## Step 10: Step-by-Step Test Checklist (Sab Cheezein Verify Karein)

Website setup complete hone ke baad yeh 4 tests karein:

1. **Test 1: Self-Test Page (Setup Check)**
   - Browser mein `http://localhost:5500/setup-check.html` open karein.
   - Sabhi 6 items ke samne **Green Tick (✔️ Passed)** dikhna chahiye.
2. **Test 2: Feedback Submission**
   - `feedback.html` par jayein. Form bharein aur submit karein.
   - Success message aayega. Supabase dashboard ke `feedback` table mein entry turant dikhegi.
3. **Test 3: Quiz Activity & Attempt Tracking**
   - `activities.html` par 10 questions complete karein.
   - Score aane ke baad Supabase `quiz_attempts` table check karein, row store ho jayegi.
4. **Test 4: Admin Dashboard & Real-Time Management**
   - `login.html` par Step 6 wale email/password se login karein.
   - `admin.html` khulega: Real-time feedback, total counts, aur quiz attempts dikhenge.
   - Ek naya resource Add karke dekhein -> Wahi resource turant `resources.html` par dikhega!

---

## Step 11: Free Deployment (Vercel ya GitHub Pages)

### Option A: Vercel par Deploy (Sabse Aasan, 1 Click)
1. Apne updated project ko GitHub par push karein.
2. [https://vercel.com](https://vercel.com) par login karein.
3. **"Add New Project"** click karein aur apna GitHub repo import karein.
4. Framework Preset ko **"Other"** rehne dein.
5. **"Deploy"** button par click karein.
6. 30 seconds mein aapki website live ho jayegi free `.vercel.app` URL par!
   *(Note: Kyunki `config.js` static frontend file hai, Vercel par koi environment variable setup karne ki zaroorat nahi hai).*

### Option B: GitHub Pages par Deploy
1. GitHub repository ke **Settings** tab mein jayein.
2. Left menu mein **Pages** par click karein.
3. Source mein **Deploy from a branch** choose karein -> Branch **main** (ya `initial-webapp`) -> Folder **/ (root)** select karein.
4. Click **Save**. 2-3 minutes mein link live ho jayegi.

---

## Step 12: Troubleshooting Table (Beginner Errors & Quick Fixes)

| Problem / Error Message | Asli Wajah (Why this happens) | 1-Minute Quick Fix |
| :--- | :--- | :--- |
| **"Database not connected yet" banner dikh raha hai** | `js/config.js` mein placeholder URL ya Key abhi tak change nahi hui. | Step 5 follow karein. Supabase Project URL aur anon key `js/config.js` mein paste karein. |
| **"Invalid API key" console error** | Anon key galat copy hui ya space aage-peeche reh gaya. | Supabase API Keys se dobara copy karein aur `js/config.js` mein quotes ke beech paste karein. |
| **"new row violates row-level security policy"** | Schema file poori run nahi hui ya RLS policies miss ho gayi hain. | SQL Editor mein `supabase/schema.sql` ko dobara paste karke Run karein (safe to re-run). |
| **Resources list blank aa rahi hai** | Database schema run nahi kiya ya internet slow hai. | SQL Editor mein schema run karein jisme 6 default verified resources automatically insert hote hain. |
| **Admin login successful hua par wapas login.html redirect ho gaya** | Auth user ban gaya par uski UID ko `admins` table mein insert nahi kiya. | Step 6 follow karein: SQL Editor mein `insert into admins (user_id) values ('UID');` run karein. |
| **Feedback submit hua par Admin panel par nahi dikh raha** | Jis account se login kiya hai woh `admins` table mein registered nahi hai. | `setup-check.html` open karein aur verify karein ki "Admin Membership" green hai ya red. |
| **CORS / Network Error** | File ko seedha browser mein double click karke khola hai (`file:///`). | VS Code Live Server use karein (`http://localhost:5500`). |
| **Supabase CDN script blocked** | Ad-blocker ya strict firewall CDN ko block kar rahi hai. | Ad-blocker ko localhost ke liye turn off karein. |
| **Project Paused** (1 week baad) | Free tier par agar 7 din koi database call na ho toh project pause ho jata hai. | Supabase Dashboard open karein aur **"Restore project"** par click karein. (Viva se 1 din pehle zaroor check kar lein). |

---

## Step 13: Free-Plan Limits in Simple Words (Important for Viva)

1. **500 MB Database Storage:** LearnAble project ke text feedback aur quiz scores ke liye 500 MB itna zyada hai ki 50,000+ entries aasaani se aa sakti hain.
2. **Project Inactivity Pause:** Supabase free plan par agar 1 hafte tak project par koi activity na ho toh project pause (sleep) ho jata hai.
   > 💡 **Viva Tip:** Apne college viva ya project presentation se 1 din pehle Supabase Dashboard par jakar check kar lein ki project "Active" hai. Agar pause ho, toh bas "Restore" button dabayein, 1 minute mein active ho jayega.
3. **Bandwidth:** 2 GB/month included hai jo project demonstration ke liye bohot zyada hai.

---

## Step 14: Viva/Submission Se Pehle Data Backup Kaise Lein

College submission ya report ke liye agar aapko feedback aur quiz scores Excel/CSV mein download karne hain:

1. Supabase Dashboard mein **"Table Editor"** par jayein.
2. `feedback` table par click karein.
3. Top-right corner mein **"Export data"** -> **"Export to CSV"** par click karein.
4. Excel sheet download ho jayegi jise aap apne B.Sc. IT project report ke Appendix mein attach kar sakte hain!
5. Isi tarah `admin.html` dashboard par bhi humne **"Export to CSV"** ka one-click button diya hua hai!
