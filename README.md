# NovaLend – Mobile Loan App UI

A high-fidelity mobile web application built to match Figma designs pixel-perfect. NovaLend is a fintech product offering wallet management, loan eligibility checks, and identity verification flows — all wrapped in a clean, premium mobile UI.

---

## 🎨 Design System

| Token | Value |
|---|---|
| **Primary Color** | `#022E64` (Deep Navy Blue) |
| **Secondary Color** | `#E0AD0F` (Gold / Amber) |
| **Surface / Background** | `#F6F6F6` (Off-white) |
| **Font** | [Poppins](https://fonts.google.com/specimen/Poppins) (300, 400, 500, 600, 700) |
| **Button Style** | Fully rounded pill (`border-radius: 9999px`), no drop shadows |
| **Mobile Frame Width** | `390px` (iPhone 14/15 Pro standard) |

---

## 📱 Screens Implemented

### 1. Dashboard (Homepage)
- **Available Balance Card** — Deep navy card (`#002D62`) with:
  - Top-right rotated 3D Naira `₦` watermark overlay
  - Centered balance display: **`₦0.00`** (default for new users)
  - Interactive eye toggle (show/hide balance)
  - Account number display
  - `+ Add Money` button (dark navy pill)
  - `Transfer` button (gold pill)
- **Products Grid** — 4 quick-access icons: `NovaWallet`, `NovaSave`, `NovaLend` *(clickable → Eligibility)*, `NovaBiz`
- **Loan Promo Banner** — Wallet background photo with dark overlay:
  - Heading: *"Need extra cash?"*
  - CTA: `Check Eligibility` → navigates to Eligibility Intro
- **Recent Activity** — 3 sample transaction items (Salary, Uber, MTN Airtime)
- **Bottom Navigation Bar** — Visible only on Dashboard (Home, Payments, Profile)

---

### 2. Loan Eligibility Intro
- Requirements card listing eligibility criteria
- CBN security compliance note
- `Get Started` CTA → proceeds to Step 1

---

### 3. Step 1 – Identity Verification (BVN)
- FirstBank advantage banner
- Pre-filled BVN details card
- `Continue` CTA → proceeds to Step 2

---

### 4. Step 2 – Capture ID
- **Live Camera Viewfinder** with gold corner guide brackets
- Click `Capture ID` → triggers scan animation (1.2s)
- **ID Review State**: Scanned ID card preview with:
  - `Looks great! Continue` → Loader (2s) → Step 3 with success toast
  - `Retake` → resets to camera
  - *"Camera not clear? Type ID Number instead"* → Manual ID Entry
- **Error Modal**: *"We couldn't read your ID"* bottom-sheet with `Retake` & `Enter ID Manually`

---

### 5. Step 2 – Manual ID Entry
- **ID Type** dropdown selector
- **ID Number** input field — triggers data fetch only when exactly **11 digits** are entered
- **Fetching Details** spinner animation
- **Auto-populated fields**: Full Name, Date of Birth, Issue Date, Expiry Date
- `Confirm & Continue` → proceeds to Step 3

---

### 6. Step 3 – Take a Selfie
- 3-stage progressive face alignment (gold arc brackets animate: Top → Right → Bottom → Left over 5.6s)
- `Take Selfie` button is **disabled** until all 4 brackets are active
- **Selfie Review State**: Photo preview card with `Looks great! Continue` & `Retake`
- `Looks great! Continue` → Loader (2s) → Verification Approved screen
- **Success Toast**: Swipes in and auto-dismisses after 3.5s

---

### 7. Full-Screen Loader
- Centered gradient spinner ring (gold/teal/green)
- *"Just a moment..."* italic text
- Auto-advances after 2 seconds

---

### 8. ID Error Modal
- Bottom-sheet slide-up popup
- Red warning icon, error title, description
- `Retake` and `Enter ID Manually` action buttons

---

### 9. Poor Connection Error Screen
- Progress checklist showing failed verification steps
- Retry CTA

---

### 10. Verification Approved
- Success screen with navy card and overflowing gold starburst checkmark seal
- Congratulations message and next steps

---

## 🗂️ Project Structure

```
nova-mobile-app/
├── index.html              # All 10 screens (semantic HTML)
├── package.json            # Project metadata
├── .gitignore
├── README.md
└── src/
    ├── style.css           # Full design system & component styles
    ├── main.js             # All navigation logic & interactions
    └── assets/
        └── wallet_bg.jpg   # Promo banner background photo
```

---

## 🚀 Running Locally

No build step required — it's pure HTML, CSS, and JavaScript.

```bash
# Option 1: Python (built-in)
cd nova-mobile-app
python3 -m http.server 8085
# Open http://localhost:8085

# Option 2: VS Code Live Server
# Right-click index.html → Open with Live Server
```

---

## ⚙️ Key Interactions & Behaviors

| Interaction | Behavior |
|---|---|
| Eye icon on balance | Toggles between `₦0.00` and `••••••••` |
| `NovaLend` product icon | Navigates to Eligibility Intro screen |
| `Check Eligibility` button | Navigates to Eligibility Intro screen |
| `Capture ID` button | Starts 1.2s scan animation → shows ID Review |
| ID Review `Continue` | Shows 2s loader → navigates to Step 3 with success toast |
| ID Number field (11 digits) | Triggers 1.4s fetching animation → auto-fills details |
| Face alignment | Progressive 4-bracket arc animation (5.6s total) |
| `Take Selfie` button | Disabled until all 4 face brackets are gold |
| Selfie Review `Continue` | Shows 2s loader → navigates to Verification Approved |
| Bottom nav | Visible **only** on Dashboard screen |

---

## 🧩 Design Constraints (Strictly Enforced)

- ✅ Poppins font only
- ✅ No drop shadows on any button (`box-shadow: none !important`)
- ✅ Fully pill-rounded buttons (`border-radius: 9999px`)
- ✅ Bottom navigation only shown on homepage
- ✅ ID number must be exactly **11 digits** before fetching details
- ✅ Selfie button inactive until face is fully aligned

---

## 📝 Changelog

### v1.3.0 – Homepage Cards Redesign
- Updated balance to `₦0.00` for new users
- Replaced promo banner with custom wallet photo background
- Matched exact card designs from Figma reference images

### v1.2.0 – Interactions & Error States
- Added ID Capture Review confirmation screen
- Added full-screen "Just a moment..." loader between key transitions
- Added "We couldn't read your ID" error bottom-sheet modal
- Tuned all animation timings for realistic human-paced feel

### v1.1.0 – Selfie & Manual ID Flow
- Added 3-stage progressive face alignment with disabled selfie button
- Bottom nav bar restricted to homepage only
- Exact 11-digit validation before ID data fetch

### v1.0.0 – Initial Implementation
- All 10 screens implemented
- Complete navigation flow
- Full design system with Poppins, primary/secondary colors, pill buttons
