# LearnAble — Learning Disability Awareness & Support Portal
> **Community Engagement Project (CEA) — Bachelor of Science in Information Technology (B.Sc. IT)**  
> **Academic Year 2024–2026**

---

## 🌟 Project Overview
**LearnAble** is a community engagement web portal engineered to promote awareness, practical accommodations, assessment pathway guidance, and verified support resources for individuals with learning differences (dyslexia, dysgraphia, dyscalculia).

The portal serves three primary community groups:
1. **Learners / Students:** Actionable study strategies, chunking techniques, multi-sensory tools, and self-advocacy.
2. **Parents / Caregivers:** Empathetic communication, structured homework routines, and guidance on navigating formal evaluations.
3. **Educators / Teachers:** Universal Design for Learning (UDL), differentiated classroom methods, and inclusive examination accommodations.

---

## ⚠️ Important Educational Disclaimer
> **CRITICAL ACADEMIC & MEDICAL DISCLAIMER:**  
> This portal is strictly an **educational awareness and guidance resource**.  
> It does **NOT**:
> - Diagnose learning disabilities or administer clinical psychometric testing
> - Prescribe medical, neurological, or pharmaceutical interventions
> - Substitute for formal psycho-educational assessment by certified professionals  
>
> If developmental or academic concerns persist, individuals must consult certified clinical psychologists, neuropsychologists, or government-authorized child development centers.

---

## 🚀 Supabase Backend Integration
The portal is fully integrated with a production-ready **Supabase (PostgreSQL + Auth + Row Level Security)** cloud backend:
- **Anonymous Feedback:** Submitted by community members with client-side rate limiting, spam honeypots, and strict database length/rating checks.
- **Verified Resources Directory:** Searchable and categorized support directory fetched live from the database.
- **Interactive Awareness Activity:** 10-question awareness quiz with results recorded anonymously into `quiz_attempts`.
- **Protected Administrator Dashboard:** Real-time metrics, feedback moderation, resource CRUD (Create, Read, Update, Delete), quiz analytics, and one-click CSV export for viva reports.
- **Role-Based Row Level Security (RLS):** Granular policies ensuring public can read verified resources and submit feedback, while only authenticated members of the `admins` table can view feedback, delete entries, and modify resources.

### 📖 Step-by-Step Backend Setup
For complete, beginner-friendly instructions written in simple Hinglish with exact button names and SQL commands:
👉 **Read [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md)**

To run an automated 7-point connection self-test:
👉 **Open `setup-check.html` in your browser**

---

## 🌐 Multilingual Accessibility (i18n)
LearnAble features a built-in language selector with full support for:
- 🇬🇧 **English (`en`)**
- 🇮🇳 **Hindi (`hi`)** — rendered with Google Font *Noto Sans Devanagari*
- 🇮🇳 **Marathi (`mr`)** — rendered with Google Font *Noto Sans Devanagari*

Language preferences are persisted automatically across sessions using browser `localStorage`.

---

## ♿ WCAG 2.1 Accessibility Features
- **Collapsible Floating Accessibility Toolbar:** Responsive pill button on mobile devices so form buttons are never covered.
- **Dynamic Text Resizing:** Instant A+ / A- scaling.
- **High Contrast Visual Mode:** Enhanced contrast conforming to AAA standards.
- **Keyboard Navigation & Skip Link:** Direct skip-to-content anchor for screen readers.
- **Fluid & Touch-Friendly:** Touch targets meet or exceed 44px; mobile form inputs use 16px to prevent iOS auto-zoom.

---

## 📁 Clean Folder Structure

```
learnable-project/
├── index.html              # Homepage with hero section & overview
├── about.html              # Module 1: Definitions & common myths
├── learning-areas.html     # Module 2: Reading, writing, math, comprehension
├── assessment.html         # Module 3: 8-Step assessment pathway guide
├── learner.html            # Module 4: Learner study strategies & self-advocacy
├── parent.html             # Module 5: Parent & caregiver support
├── educator.html           # Module 6: Inclusive classroom strategies & UDL
├── activities.html         # Module 7: 10-Question interactive awareness quiz
├── resources.html          # Module 8: Verified resources directory with filter
├── faq.html                # Module 9: Frequently asked questions
├── feedback.html           # Module 10: Community feedback form
├── login.html              # Admin sign-in (Supabase Auth)
├── admin.html              # Protected Admin Dashboard & analytics
├── setup-check.html        # Developer self-test diagnostic utility
├── 404.html                # Custom 404 error page
├── manifest.json           # PWA progressive web app manifest
├── SUPABASE_SETUP.md       # Complete beginner setup guide in Hinglish
├── README.md               # Project documentation (this file)
│
├── css/
│   └── style.css           # Production responsive styles & accessibility
│
├── js/
│   ├── config.js           # Supabase project URL & Anon key constants
│   ├── supabase-client.js  # Client builder, banners & admin check helpers
│   ├── i18n.js             # Language translation engine (en / hi / mr)
│   ├── app.js              # Navigation & hamburger drawer logic
│   ├── accessibility.js    # A+ / A- / High Contrast toolbar controller
│   ├── activities.js       # Quiz engine, attempt recording & answer review
│   ├── feedback.js         # Feedback submission, honeypot & rate-limiter
│   ├── resources.js        # Resource directory search & filter
│   └── admin.js            # Admin dashboard CRUD, analytics & CSV export
│
├── images/
│   ├── favicon.svg         # Modern vector brand favicon
│   └── hero-illustration.svg # Scalable vector illustration
│
└── supabase/
    └── schema.sql          # Safe-to-rerun PostgreSQL schema with seed data
```

---

## 💻 Local Development & Testing

1. Clone or download this repository.
2. Open the folder in **VS Code**.
3. Install the **Live Server** extension (Ritwick Dey).
4. Right-click `index.html` and select **"Open with Live Server"**.
5. The portal will open at `http://127.0.0.1:5500/index.html`.

*(Note: Double-clicking HTML files directly using `file:///` is not recommended due to browser CORS policies regarding CDN scripts and authentication tokens).*

---

## 🚢 Free Cloud Deployment

### Deploy to Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Other**.
5. Click **Deploy**. Your website is live on a free `.vercel.app` domain with automated HTTPS in under 30 seconds!

### Deploy to GitHub Pages
1. Go to your GitHub repository -> **Settings** -> **Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Branch: `main` (or `initial-webapp`), Folder: `/ (root)`.
4. Click **Save**.

---

## 🎓 Viva / Defense Presentation Q&A Reference

- **Q1: Why does LearnAble not diagnose learning disabilities?**  
  *Answer:* Diagnostic testing requires specialized standardized psychometric tools, clinical observation, and licensed professionals (RCI-certified clinical psychologists or developmental pediatricians). LearnAble builds awareness and guides families to ethical evaluation pathways without overstepping clinical boundaries.

- **Q2: Why use Supabase instead of a custom Node.js/Express server?**  
  *Answer:* Supabase provides an enterprise PostgreSQL database, built-in Auth, and Row Level Security (RLS) over high-performance REST APIs. This eliminates server maintenance costs, ensures 99.9% uptime on static hosting, and allows students to demonstrate professional database security.

- **Q3: What prevents unauthorized users from altering resources or reading feedback?**  
  *Answer:* PostgreSQL Row Level Security (RLS) policies. Even if a user inspects the frontend code and copies the `anon` key, Supabase rejects unauthorized SELECT on `feedback` or INSERT/UPDATE/DELETE on `resources` unless the request contains a JWT token belonging to a UID registered in `public.admins`.

---

## 📜 License & Academic Attribution
This project was developed for academic and community service purposes as part of the **B.Sc. Information Technology Community Engagement Project (CEA)** curriculum.
