# 🏋️ FitZone — Gym Management Dashboard

React + TypeScript + Tailwind CSS v4 dashboard for gym management.

---

## ⚡ Quick Start (3 steps)

```bash
# 1. Create the Vite project
npm create vite@latest fitzone-dashboard -- --template react-ts
cd fitzone-dashboard

# 2. Install all dependencies
npm install
npm install react-router-dom react-icons recharts clsx react-hot-toast
npm install -D tailwindcss @tailwindcss/vite

# 3. Replace src/ folder with the provided files, then:
npm run dev
```

Open → http://localhost:5173

---

## 📦 Libraries Used

| Library           | Version  | Purpose                        |
|-------------------|----------|--------------------------------|
| react             | ^19      | Core UI framework              |
| react-dom         | ^19      | DOM rendering                  |
| react-router-dom  | ^7       | Client-side routing            |
| react-icons       | ^5       | Icon library (MD icons)        |
| recharts          | ^2       | Charts (Bar, Pie)              |
| clsx              | ^2       | Conditional classNames         |
| react-hot-toast   | ^2       | Toast notifications            |
| tailwindcss       | ^4       | Utility-first CSS              |
| @tailwindcss/vite | ^4       | Tailwind Vite plugin           |
| typescript        | ~5.7     | Type safety                    |
| vite              | ^6       | Build tool                     |

---

## 📁 Project Structure

```
src/
├── App.tsx                        # Root component + Router
├── main.tsx                       # Entry point
├── index.css                      # Tailwind + CSS variables
│
├── routes/
│   └── AppRoutes.tsx              # All route definitions
│
├── components/
│   ├── layout/
│   │   ├── MainLayout.tsx         # Sidebar + Topbar wrapper
│   │   ├── Sidebar.tsx            # Navigation sidebar
│   │   └── Topbar.tsx             # Top header bar
│   │
│   └── common/
│       ├── KpiCard.tsx            # Metric summary card
│       ├── Badge.tsx              # Status badge pill
│       ├── Avatar.tsx             # Initials avatar
│       └── PageHeader.tsx         # Page title + action button
│
├── pages/
│   ├── DashboardPage.tsx          # Overview + charts
│   ├── MembersPage.tsx            # Members table + search
│   ├── PaymentsPage.tsx           # Revenue + transactions
│   ├── SubscriptionsPage.tsx      # Plans + subscriptions log
│   └── ClassesPage.tsx            # Classes + trainer roster
│
├── types/
│   └── index.ts                   # All TypeScript interfaces
│
├── constants/
│   └── mockData.ts                # Mock data (replace with API)
│
└── utils/
    └── helpers.ts                 # formatDate, formatCurrency, etc.
```

---

## 🎨 Design System

CSS variables defined in `src/index.css`:

```css
--color-accent:        #E8FF47   /* Lime yellow — primary accent */
--color-bg-base:       #0D0F14   /* Page background */
--color-bg-card:       #10131A   /* Card background */
--color-border:        #1A1E2E   /* Default border */
--color-text-primary:  #FFFFFF
--color-text-secondary:#8A9AB5
--color-text-muted:    #3A4560
--color-success:       #4ADE80
--color-warning:       #FBBF24
--color-danger:        #F87171
```

---

## 🔀 Routes

| Path             | Page              |
|-----------------|-------------------|
| `/dashboard`    | Overview          |
| `/members`      | Members           |
| `/classes`      | Classes           |
| `/payments`     | Payments          |
| `/subscriptions`| Subscriptions     |

---

## 🚀 Next Steps

- [ ] Connect to a real backend (REST API or Supabase)
- [ ] Add Member profile page (`/members/:id`)
- [ ] Add Add/Edit Member modal
- [ ] Add authentication (login page)
- [ ] Add Trainers management page
- [ ] Add Attendance tracking page
- [ ] Add Reports & export PDF
