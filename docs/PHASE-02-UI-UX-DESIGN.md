# PHASE 02 — UI/UX & VISUAL DESIGN SPECIFICATION
**Project Name:** Buddha Mayoori Constructions Website & Management Platform  
**Document Version:** 1.1.0 (Corrected Design & UX Specification)  
**Status:** Finalized for Phase 02  
**Target Location:** `D:\buddha-mayoori-constructions\docs\PHASE-02-UI-UX-DESIGN.md`  

---

## 1. BRAND & VISUAL DIRECTION

### 1.1 Brand Identity & Design Personality
Buddha Mayoori Constructions has been operating **Since 1990** with primary location in Koodal, Pathanamthitta, Kerala `[CONFIRMED FROM PROVIDED MATERIAL]`. The visual design system must communicate seven core pillars:
1. **Trust & Engineering Authority:** Built on 35+ years of working experience across Kerala.
2. **Reliability & Craftsmanship:** Clean, modern, highly legible, and unpretentious layout.
3. **Professionalism:** Crisp structural alignment, generous spacing, and strong visual contrast.
4. **Geographic Grounding:** Rooted in Kerala's architectural context across central and southern districts.
5. **Transparency:** Clear display of canonical services, verified contacts, and estimation workflows.
6. **Accessibility & Clarity:** Fully responsive and readable across all mobile, tablet, and desktop viewports.
7. **No Flashy Gimmicks:** Avoiding noisy consumer-tech animations; focusing instead on solid structural aesthetics.

### 1.2 Color Palette Direction

```
+-------------------------------------------------------------------------+
|  PRIMARY BRAND COLOR: Deep Structural Navy (#0F172A / #1E293B)           |
|  Use: Headers, primary headings, hero background, footer, dark cards    |
+-------------------------------------------------------------------------+
|  ACCENT BRAND COLOR: Construction Amber / Gold (#D97706 / #F59E0B)       |
|  Use: Primary CTAs, key badges, stat highlights, interactive focus rings |
|  [REQUIRES BUSINESS CONFIRMATION for exact Pantone brand code]          |
+-------------------------------------------------------------------------+
|  NEUTRAL BACKGROUNDS: Clean Slate Light (#F8FAFC) & Pure White (#FFFFFF) |
|  Use: Main page backdrop, card backgrounds, alternating sections        |
+-------------------------------------------------------------------------+
|  TEXT COLORS: Slate Dark (#0F172A) & Muted Body (#475569)                |
|  Use: High-contrast body text, section subtitles, metadata text         |
+-------------------------------------------------------------------------+
|  BORDER & DIVIDER: Soft Slate (#E2E8F0)                                  |
|  Use: Card borders, structural section dividers, input field outlines   |
+-------------------------------------------------------------------------+
```

### 1.3 Typography Hierarchy & Styling
- **Primary Font Family:** `Inter` or `Plus Jakarta Sans` (Clean, geometric, sans-serif with high legibility).
- **Heading 1 (Hero Headlines):** `3.0rem / 48px` (Mobile: `2.25rem / 36px`), Font Weight: `700 (Bold)`, Line Height: `1.15`.
- **Heading 2 (Section Headlines):** `2.25rem / 36px` (Mobile: `1.75rem / 28px`), Font Weight: `700 (Bold)`, Line Height: `1.2`.
- **Heading 3 (Card / Sub-Section Titles):** `1.25rem / 20px`, Font Weight: `600 (Semi-Bold)`, Line Height: `1.3`.
- **Heading 4 (Sub-element Labels):** `1.0rem / 16px`, Font Weight: `600 (Semi-Bold)`, Line Height: `1.4`.
- **Body Lead Text:** `1.125rem / 18px`, Font Weight: `400 (Regular)`, Line Height: `1.6`.
- **Body Regular Text:** `1.0rem / 16px`, Font Weight: `400 (Regular)`, Line Height: `1.6`.
- **Small Body / Microcopy:** `0.875rem / 14px`, Font Weight: `400 (Regular)`, Line Height: `1.5`.
- **Badge / Tag Text:** `0.75rem / 12px`, Font Weight: `600 (Semi-Bold)`, Letter Spacing: `0.05em (Uppercase)`.

### 1.4 Component Visual Styling Guidelines
- **Primary Buttons:** Amber background (`#D97706`), Dark Navy text (`#0F172A`), `0.375rem / 6px` rounded corners, bold typography, hover scale transition (`duration-200`).
- **Secondary Buttons:** Transparent background, Deep Navy border (`#0F172A`), Deep Navy text, hover fill transition.
- **Ghost / Link Buttons:** Text with arrow icon (`ArrowRight`), subtle underline hover state.
- **Card Containers:** Pure white background (`#FFFFFF`), `1px` border (`#E2E8F0`), `0.5rem / 8px` border radius, subtle hover elevation shadow (`shadow-md`).
- **Icons:** 24px stroke Lucide icons, styled in Accent Amber or Primary Navy to maintain visual consistency.
- **Dividers:** Subtle 1px lines (`#E2E8F0`) with 48px vertical section margins.

---

## 2. DESIGN SYSTEM TOKENS & SCALES

### 2.1 Spacing Scale (Tailwind 4px Grid Alignment)
- `space-1`: `0.25rem / 4px` (Tight padding inside badges)
- `space-2`: `0.5rem / 8px` (Icon to text gaps, button internal padding)
- `space-3`: `0.75rem / 12px` (Card internal padding small)
- `space-4`: `1.0rem / 16px` (Standard input field padding, gap between small elements)
- `space-6`: `1.5rem / 24px` (Card internal padding standard, mobile section gap)
- `space-8`: `2.0rem / 32px` (Grid gap standard, sub-section spacing)
- `space-12`: `3.0rem / 48px` (Major section vertical padding mobile)
- `space-16`: `4.0rem / 64px` (Major section vertical padding desktop)
- `space-24`: `6.0rem / 96px` (Hero vertical padding desktop)

### 2.2 Border Radius Scale
- `radius-sm`: `0.25rem / 4px` (Inputs, tags, micro-badges)
- `radius-md`: `0.5rem / 8px` (Buttons, service cards, contact cards)
- `radius-lg`: `0.75rem / 12px` (Hero containers, quote modal containers)
- `radius-full`: `9999px` (Pill badges, status indicators, floating CTAs)

### 2.3 Elevation & Shadow Scale
- `elevation-0`: No shadow (`shadow-none`)
- `elevation-1`: Subtle card rest state (`shadow-sm`)
- `elevation-2`: Hover floating state (`shadow-md`)
- `elevation-3`: Modal overlay / Lightbox container (`shadow-xl`)

### 2.4 Layout Container Guidelines
- **Max Page Width:** `1280px` (`max-w-7xl`).
- **Gutters:** `1.0rem / 16px` on Mobile, `1.5rem / 24px` on Tablet, `2.0rem / 32px` on Desktop.
- **Section Padding:** Top/Bottom `4.0rem / 64px` on Desktop, `2.5rem / 40px` on Mobile.

---

## 3. SITE-WIDE NAVIGATION UX

### 3.1 Top Notification Bar (Desktop & Mobile)
- **Content:**
  - Phone links: `9447453220` | `8606390918` | `8075218806`
  - Location tag: *Koodal, Pathanamthitta*
  - Equal Email links: `sarathjayakumar98@gmail.com` | `jayakumarkoodal334@gmail.com`
- **Visual Style:** Dark Navy background (`#0F172A`), white/amber micro-text (`text-xs`), subtle border bottom.

### 3.2 Main Desktop Navigation Bar
- **Positioning:** Sticky header with glassmorphism blur effect (`bg-white/90 backdrop-blur-md border-b border-slate-200`).
- **Layout:**
  - Left: **Buddha Mayoori Constructions** logo and brand title with *"Since 1990"* badge.
  - Center: Horizontal navigation links: `Home`, `About`, `Services`, `Projects`, `Team`, `Contact`.
  - Right: Primary CTA button: **"Request a Building Estimate"** leading to the Building Estimate Request Form.
- **Active Link State:** Amber underline indicator + font weight bold (`text-amber-600 font-semibold`).

### 3.3 Mobile Navigation & Drawer UX
- **Compact Header:** Brand title + Phone call shortcut icon + Mobile Hamburger menu button (`Lucide Menu`).
- **Mobile Drawer Behavior:**
  - Smooth slide-in overlay from right or full-screen backdrop fade.
  - Large touch-friendly vertical link list (minimum touch target height `48px`).
  - Integrated direct call buttons (`9447453220`, `8606390918`, `8075218806`).
  - Integrated direct WhatsApp buttons (`8606390918`, `8075218806`).
  - Equal Email links: `sarathjayakumar98@gmail.com` | `jayakumarkoodal334@gmail.com`.
  - Location card (*Koodal, Pathanamthitta*).
  - Explicit close button (`Lucide X`) at top right.
  - Body scroll-lock applied when drawer is active.

---

## 4. SITEMAP & PAGE UX ARCHITECTURE

```
Buddha Mayoori Constructions Complete UX Sitemap
│
├── 1. Home Page ( / )
│   ├── Top Announcement Bar & Sticky Navbar
│   ├── Hero Section ("Building Excellence Since 1990")
│   ├── Business-provided statistics/claims (35+ Years Experience, 100+ Labours, 250+ Completions [REQUIRES FINAL BUSINESS VERIFICATION])
│   ├── Company History Brief (Established Since 1990, Location Koodal, Pathanamthitta)
│   ├── Canonical 9 Services Grid Preview
│   ├── Leadership Spotlight (Jayakumar Ramachandran & Sarath Jayakumar)
│   ├── Major Branch & Working Sites Card [REQUIRES BUSINESS CONFIRMATION]
│   ├── Building Estimate Request CTA Section
│   └── Multi-Column Footer
│
├── 2. About Us Page ( /about )
│   ├── Page Header Banner
│   ├── Company Background (Established Since 1990, Location Koodal, Pathanamthitta)
│   ├── Leadership Profiles & Department Roster
│   ├── Workforce Highlight (Over 100+ Experienced Labours — business-provided claim)
│   └── Mission / Vision / Core Values Placeholder [REQUIRES BUSINESS CONFIRMATION]
│
├── 3. Services Page ( /services )
│   ├── Page Header Banner
│   ├── Interactive Filter / Quick Jump Navigation
│   ├── Canonical 9 Services Detail Showcase Cards
│   └── Building Estimate Request Trigger
│
├── 4. Projects Page ( /projects ) [REQUIRES BUSINESS CONFIRMATION]
│   ├── Page Header Banner
│   ├── Category Filters (To be determined from real project portfolio supplied by business) [REQUIRES BUSINESS CONFIRMATION]
│   ├── Filterable Project Grid
│   └── Project Detail Lightbox / Drawer Modal Specification
│
├── 5. Team Page ( /team )
│   ├── Executive Leadership Showcase
│   ├── Department Heads & Consultants Roster
│   └── On-Site Workforce Tribute Banner (Over 100+ Experienced Labours)
│
├── 6. Contact Us Page ( /contact )
│   ├── Contact Directory (Phones, WhatsApp, Equal Emails)
│   ├── Primary Office Location Card (Koodal, Pathanamthitta, Kerala)
│   ├── Major Branch & Working Sites Card [REQUIRES BUSINESS CONFIRMATION]
│   ├── Building Estimate Request Form
│   └── Google Maps Placeholder Container [REQUIRES BUSINESS CONFIRMATION]
│
├── 7. Request a Quote / Building Estimate Request Form ( /quote or inline modal )
│   └── Step-by-step Building Estimate Request Workflow
│
└── 8. Admin Portal ( /admin ) [FUTURE SCOPE - CONCEPTUAL DESIGN ONLY]
    ├── Login Screen (/admin/login)
    └── Inquiry & Portfolio Management Dashboard (/admin/dashboard)
```

---

## 5. HOMEPAGE UX BLUEPRINT

### Recommended Section Sequence & Rationale
1. **Hero Banner:** Establishes instant brand identity, established year (1990), location (Koodal, Pathanamthitta), and primary actions ("Explore Services", "Request a Building Estimate").
2. **Business-provided statistics/claims Section:** Displays the business-provided claims:
   - *35+ Years Working Experience* — business-provided claim `[CONFIRMED FROM PROVIDED MATERIAL]`
   - *Over 100+ Experienced Labours* — business-provided claim `[CONFIRMED FROM PROVIDED MATERIAL]`
   - *Over 250+ Successful Completion* — `[REQUIRES FINAL BUSINESS VERIFICATION]`
3. **Company Introduction:** Summarizes the company history (Established Since 1990, primary location in Koodal, Pathanamthitta, Kerala) `[CONFIRMED FROM PROVIDED MATERIAL]`.
4. **Canonical 9 Services Grid:** Exposes the full range of official construction and design services.
5. **Leadership & Technical Roster:** Introduces Proprietor / Civil Engineer Jayakumar Ramachandran (Kochukuttan) and Landscape Designer Sarath Jayakumar (Ph.D Scholar).
6. **Major Branch & Working Sites Section:** Displays reach across Koodal (Pathanamthitta), Pathanamthitta, Kollam, Trivandrum, Alappuzha, and Kottayam `[REQUIRES BUSINESS CONFIRMATION]`.
7. **Building Estimate Request CTA:** High-contrast conversion banner inviting users to submit the Building Estimate Request Form.
8. **Footer:** Comprehensive site map, contact directory, and legal details.

---

## 6. SERVICES PAGE UX — CANONICAL 9 SERVICES

The Services page will showcase ONLY the official canonical 9 services from Phase 01:

1. **Structural Designing:** Custom structural designs, load calculations, and safety blueprints.
2. **Building Estimation:** Material cost estimation, Bill of Quantities (BOQ), and budget planning.
3. **Building Construction Works:** End-to-end civil construction execution for residential and commercial structures.
4. **Building Planning:** Architectural spatial planning, Vastu-compliant floor plans, and municipal drawings.
5. **House Renovation:** Modernization, floor extensions, roofing upgrades, and structural alterations.
6. **Interior Design:** Custom modular kitchens, false ceilings, wardrobes, and aesthetic interiors.
7. **Site Supervision:** On-site technical supervision, quality monitoring, and workforce direction.
8. **Plumbing Designing:** Plumbing layout design, drainage line planning, and sanitary utility engineering.
9. **3D Elevation:** Photorealistic 3D exterior architectural visualizations.

### Card UX Pattern
Each service card contains:
- Service Icon (24px Lucide stroke icon in Amber container)
- Canonical Title (H3 font size)
- Short Description
- Key Features Checklist (3-4 bullet points)
- Action Button: **"Request a Building Estimate for this Service"** (pre-selects service in Building Estimate Request Form).

*Note: Detailed service copy is marked `[REQUIRES BUSINESS CONFIRMATION]`.*

---

## 7. PROJECTS & PORTFOLIO UX

### Layout & Portfolio Categories
- **Category Filter Tabs:** Actual project categories/filters will NOT be assumed from service names. They will be determined directly from the real project portfolio supplied by the business `[REQUIRES BUSINESS CONFIRMATION]`.
- **Grid Layout:** Responsive 3-column grid on desktop, 2-column on tablet, 1-column on mobile.
- **Card Content:** Project Thumbnail Image, Category Badge (from real portfolio), Title Placeholder, Location Tag (*e.g., Pathanamthitta*), Scope Tag.

### Strict Data Discipline Rule
- **Zero Fake Data:** No fake client names, fictitious project budgets, or fabricated completion dates.
- **Empty State UX:** If project media is pending, display a clean placeholder card stating:  
  *"Project Showcase Updating — Official completed project photographs are being uploaded by Buddha Mayoori Constructions."*

---

## 8. TEAM PAGE UX

Showcases ONLY confirmed team members and official designations from Phase 01:

### Executive Leadership Section
1. **Jayakumar Ramachandran (Kochukuttan)**  
   *Designation:* Proprietor / Civil Engineer / Managing Director / Director `[CONFIRMED]`  
   *Experience:* 35+ Years Working Experience `[CONFIRMED]`  
   *Focus:* Leading Buddha Mayoori Constructions since 1990 with civil engineering expertise.

2. **Sarath Jayakumar (Ph.D Scholar)**  
   *Designation:* Landscape Designer / Project Manager `[CONFIRMED]`  
   *Focus:* Landscape design, modern spatial planning, and project coordination.

### Technical & Department Roster Section
- **Brand / Media Manager:** Indrasena Reddy (Andra) `[CONFIRMED]`
- **Brand / Media Manager:** Anoop (Kerala) `[CONFIRMED]`
- **Landscaping Consultant:** Rasika Sarje Ashok (Maharashtra) `[CONFIRMED]`
- **Landscaping Consultant:** Smriti Pathania (Himachal Pradesh) `[CONFIRMED]`
- **Supervisor:** Mahesh `[CONFIRMED]`
- **Head — Painting & Finishing Department:** Bhagan `[CONFIRMED]`
- **Head — Plumbing & Sanitary Department:** Roy (Roy Electricals) `[CONFIRMED]`
- **Head — Electrical Department:** `NAME NOT CONFIRMED` `[REQUIRES BUSINESS CONFIRMATION]`

### Workforce Highlight Banner
- Highlighting **Over 100+ Experienced Labours** (business-provided claim) and site supervisors `[CONFIRMED]`.

---

## 9. CONTACT & QUOTE UX

### Direct Contact Directory Layout
- **Phone Cards:** Direct click-to-call buttons for `9447453220`, `8606390918`, `8075218806`.
- **WhatsApp Cards:** Direct click-to-chat buttons for `8606390918` and `8075218806`.
- **Equal Email Directory:** Equal presentation of both confirmed emails: `sarathjayakumar98@gmail.com` and `jayakumarkoodal334@gmail.com`.
- **Location Card:** *Koodal, Pathanamthitta, Kerala* `[CONFIRMED]`.
- **Major Branch & Working Sites Card:** *Koodal (Pathanamthitta), Pathanamthitta, Kollam, Trivandrum, Alappuzha, Kottayam* `[REQUIRES BUSINESS CONFIRMATION]`.

### Building Estimate Request Form UX
- **Form Fields:**
  1. Full Name (Text input, Required)
  2. Phone Number (Tel input, Required, 10-digit validation)
  3. Email Address (Email input, Optional)
  4. City / District (Text input, Required)
  5. Service Required (Dropdown selecting from the 9 canonical services, Required)
  6. Estimated Budget Range (Dropdown, Optional)
  7. Project Details / Requirements (Textarea, Required)
- **Validation UX:** Real-time inline field validation indicators.
- **Success State:** Green confirmation toast banner with message: *"Thank you! Your building estimate request has been submitted to Buddha Mayoori Constructions. Our team will contact you shortly."*

---

## 10. FOOTER UX

### Column Layout
- **Column 1 (Brand):** Logo, Buddha Mayoori Constructions, *"Established Since 1990 | Location: Koodal, Pathanamthitta, Kerala"*, brief company tagline.
- **Column 2 (Quick Links):** Home, About Us, Services, Projects, Team, Contact Us, Request a Building Estimate.
- **Column 3 (Canonical Services):** Links to all 9 canonical services.
- **Column 4 (Major Branch & Working Sites):** Listing Koodal, Pathanamthitta, Kollam, Trivandrum, Alappuzha, and Kottayam `[REQUIRES BUSINESS CONFIRMATION]`.
- **Column 5 (Direct Contacts):** All 3 phone numbers, 2 WhatsApp numbers, and both equal email addresses (`sarathjayakumar98@gmail.com`, `jayakumarkoodal334@gmail.com`).
- **Bottom Bar:** Copyright © 2026 Buddha Mayoori Constructions. All rights reserved.

---

## 11. RESPONSIVE DESIGN SPECIFICATION

### Breakpoint Strategy
- **Mobile (`< 640px`):** 1-column layouts, full-width buttons, collapsible mobile drawer menu, sticky floating call/WhatsApp bar at viewport bottom.
- **Tablet (`640px - 1024px`):** 2-column grids for services and team profiles, adapted top header bar.
- **Desktop (`> 1024px`):** 3-column service and project grids, sticky navbar with full horizontal link menu.

### Touch Target Guidelines
- Minimum touch target size: `44px x 44px` for all mobile buttons, icons, and drawer links.

---

## 12. ACCESSIBILITY (WCAG 2.1 LEVEL AA) SPECIFICATION

1. **Color Contrast:** Minimum contrast ratio of `4.5:1` for normal body text and `3:1` for large titles against all backgrounds.
2. **Keyboard Navigation:** Logical `Tab` index ordering across all interactive elements. Visible amber focus outline (`ring-2 ring-amber-500`) on all focused elements.
3. **Form Accessibility:** Explicit `<label>` elements associated via `htmlFor` with matching input `id` attributes.
4. **Screen Reader Support:** ARIA attributes (`aria-expanded`, `aria-label`, `aria-hidden`) on mobile hamburger drawer and interactive service filters.
5. **Reduced Motion:** Respects `prefers-reduced-motion: reduce` by disabling smooth scrolling and transform animations.

---

## 13. UI STATES SPECIFICATION

- **Default State:** Clean, crisp presentation of content.
- **Hover State:** Subtle button color shift, card lift (`translate-y-1`), and border amber highlight.
- **Focus State:** Visible amber outline ring (`ring-2 ring-amber-500 ring-offset-2`).
- **Active State:** Button click scale down (`scale-95`).
- **Loading State:** Skeleton shimmer loaders for project cards and form submission buttons (`animate-pulse bg-slate-200`).
- **Disabled State:** Muted opacity (`opacity-50 cursor-not-allowed`).
- **Empty State:** Friendly placeholder illustration with clear text when zero project records match a selected filter.
- **Error State:** High-contrast red alert box (`bg-red-50 border-red-500 text-red-800`) with actionable instructions.

---

## 14. SEO-AWARE DESIGN ARCHITECTURE

1. **Heading Hierarchy:** Single `<h1>` per page, followed by logical `<h2>` section headings and `<h3>` card titles.
2. **Semantic HTML Elements:** Strict usage of `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`.
3. **Schema.org Structured Data Concept:** `LocalBusiness` / `ConstructionBusiness` JSON-LD schema containing official name, phone numbers (`9447453220`), emails, and primary location (*Koodal, Pathanamthitta, Kerala*).

---

## 15. FUTURE ADMIN DASHBOARD CONCEPTUAL UX (PHASE 07 SCOPE)

*Note: Conceptual design only. Strictly marked for future Phase 07 development.*

```
+-------------------------------------------------------------------------+
|                  ADMIN DASHBOARD CONCEPTUAL LAYOUT                       |
+-------------------------------------------------------------------------+
| Sidebar Navigation | Top Admin Bar: Welcome, Jayakumar R. | Logout      |
|                    +----------------------------------------------------+
| - Overview Stats   | Inquiry Management Table                           |
| - Inquiries (Leads)| - Filter by Status (New, Contacted, In Progress)  |
| - Project Portfolio| - Search by Client Name or Phone Number            |
| - Services Config  | - View Details Modal & Export Leads to CSV         |
| - Team Roster      +----------------------------------------------------+
| - Site Info        | Portfolio Project Upload Form                      |
|                    | - Upload WebP photos, select service tag, publish   |
+-------------------------------------------------------------------------+
```

---

## 16. STRICT DESIGN CONTENT RULES

1. **Zero Invented Statistics:** Display only business-provided claims: *"35+ Years Working Experience"* `[CONFIRMED]`, *"Over 100+ Experienced Labours"* `[CONFIRMED]`, and *"Over 250+ Successful Completion"* `[REQUIRES FINAL BUSINESS VERIFICATION]`.
2. **Zero Invented Team Members:** Er. A. R. Suresh, Er. Rahul Nath, and Er. Syam Kumar must NEVER appear in UI designs.
3. **Zero Invented Client Reviews:** Testimonials must remain empty or marked `[REQUIRES BUSINESS CONFIRMATION]`.
4. **Zero Invented Project Photos:** Stock images must never be labelled as real Buddha Mayoori Constructions projects.

---

## 17. IMAGE & MEDIA DIRECTION

- **Aspect Ratios:**
  - Hero Banners: `16:9` ratio (`1920x1080` max).
  - Service & Project Cards: `4:3` ratio (`800x600`).
  - Team Headshots: `1:1` square ratio (`400x400`).
- **Optimization:** WebP image format, lazy loading (`loading="lazy"`), max file size `< 200KB` per image.
- **Placeholders:** Neutral SVG placeholders with camera icon and text: *"Image pending business upload"*.

---

## 18. REUSABLE COMPONENT INVENTORY

| Component Name | Purpose | Key Variants |
| :--- | :--- | :--- |
| **TopContactBar** | Displays phones, equal emails, & location at top of page | Dark Navy |
| **Navbar** | Glassmorphic sticky header with nav links & mobile toggle | Light / Sticky |
| **MobileDrawer** | Slide-out mobile navigation overlay | Right Drawer |
| **HeroContainer** | High-impact page header with background overlay & CTAs | Full / Compact |
| **SectionHeader** | Standardized section title with subtitle badge | Left / Centered |
| **StatCard** | Displays business-provided claims | Amber Accent |
| **ServiceCard** | Showcases one of the canonical 9 services | Default / Featured |
| **TeamCard** | Presents a confirmed leadership or team member | Card / Minimal |
| **ContactCard** | Displays phone, email, or address contact details | Icon Card |
| **InquiryForm** | Building Estimate Request Form | Inline / Modal |
| **WhatsAppCTA** | Floating WhatsApp action button linking to 8606390918 | Fixed Bottom-Right |
| **Footer** | Multi-column sitewide footer | Dark Navy |

---

## 19. PHASE 02 ACCEPTANCE CRITERIA

- [x] **Equal Email Status Applied:** No email is labeled "primary"; both `sarathjayakumar98@gmail.com` and `jayakumarkoodal334@gmail.com` are presented equally.
- [x] **CTA Wording Corrected:** Primary CTA updated to *"Request a Building Estimate"*.
- [x] **Form Name Corrected:** Form updated to *"Building Estimate Request Form"*.
- [x] **Project Categories Clarified:** Stated that actual project categories/filters will be determined from the real project portfolio supplied by the business `[REQUIRES BUSINESS CONFIRMATION]`.
- [x] **Origin Claim Corrected:** Removed claims that company was established in Koodal; correctly formatted as Established Since 1990, Location: Koodal, Pathanamthitta, Kerala.
- [x] **Statistics Claims Clarified:** Classified as business-provided claims (*35+ Years Working Experience*, *Over 100+ Experienced Labours*, and *Over 250+ Successful Completion* `[REQUIRES FINAL BUSINESS VERIFICATION]`).
- [x] **Canonical 9 Services Enforced:** Exactly Structural Designing, Building Estimation, Building Construction Works, Building Planning, House Renovation, Interior Design, Site Supervision, Plumbing Designing, 3D Elevation.
- [x] **Confirmed Team Roster Enforced:** Jayakumar Ramachandran, Sarath Jayakumar, Indrasena Reddy, Anoop, Rasika Sarje Ashok, Smriti Pathania, Mahesh, Bhagan, Roy. Unconfirmed engineering names purged.
- [x] **Confirmed Contacts Enforced:** Phones (`9447453220`, `8606390918`, `8075218806`), WhatsApp (`8606390918`, `8075218806`), Emails (`sarathjayakumar98@gmail.com`, `jayakumarkoodal334@gmail.com`).
- [x] **Zero Code / UI Contamination:** NO React components, page JSX, CSS/Tailwind classes, APIs, or DB schemas implemented.

---

## 20. STRICT PHASE BOUNDARY PROTOCOL

> **IMPORTANT RULE FOR PHASE BOUNDARY:**  
> **Phase 02 (UI/UX Design Specification) is officially COMPLETE and CORRECTED upon the saving of this document.**  
>  
> **DO NOT create React components.**  
> **DO NOT write page JSX.**  
> **DO NOT create CSS or Tailwind classes.**  
> **DO NOT build backend APIs or MongoDB schemas.**  
> **DO NOT start Phase 03.**  
>  
> **The development team must now STOP and wait for explicit user review and approval (Command: `START PHASE 03`) before proceeding to Phase 03.**
