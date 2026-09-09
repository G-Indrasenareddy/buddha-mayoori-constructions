# PHASE 06 — BACKEND & DATABASE SPECIFICATION & IMPLEMENTATION REPORT
**Project Name:** Buddha Mayoori Constructions Website & Management Platform  
**Document Version:** 1.0.0  
**Status:** Implemented & Verified  
**Target Location:** `docs/PHASE-06-BACKEND-DATABASE.md`  

---

## 1. EXECUTIVE SUMMARY & OBJECTIVE

Phase 06 establishes a production-grade, modular, and secure **Node.js + Express + MongoDB** backend infrastructure for **Buddha Mayoori Constructions**. The backend architecture transforms the previously static frontend into a full-stack application capable of persisting customer enquiries, serving canonical business data, and providing a clean API layer for future Phase 07 administrative workflows.

---

## 2. COMPONENT ARCHITECTURE & DESIGN

The server follows a clean **Layered MVC / Controller-Service Pattern**:

```
server/src/
├── config/
│   └── db.js                 # MongoDB connection & lifecycle management
├── controllers/
│   ├── healthController.js   # GET /api/v1/health
│   ├── serviceController.js  # GET /api/v1/services
│   ├── teamController.js     # GET /api/v1/team
│   ├── projectController.js  # GET /api/v1/projects
│   └── enquiryController.js  # POST /api/v1/enquiries
├── middlewares/
│   ├── errorHandler.js       # Centralized error middleware
│   ├── notFound.js           # 404 route middleware
│   ├── rateLimiter.js        # IP rate limiter for public forms
│   └── validate.js           # Request validation wrapper
├── models/
│   ├── Project.js            # Mongoose Project schema
│   ├── Service.js            # Mongoose Service schema (9 canonical services)
│   ├── TeamMember.js         # Mongoose TeamMember schema (10 approved entries)
│   ├── Enquiry.js            # Mongoose Enquiry schema
│   └── User.js               # Mongoose User schema (Admin foundation)
├── routes/
│   └── v1/
│       ├── healthRoutes.js
│       ├── serviceRoutes.js
│       ├── teamRoutes.js
│       ├── projectRoutes.js
│       ├── enquiryRoutes.js
│       └── index.js
├── seeders/
│   └── seedApprovedData.js   # Seeds canonical services & team entries
├── utils/
│   ├── AppError.js           # Operational error class
│   ├── asyncHandler.js       # Express async error wrapper
│   └── logger.js             # Console logger helper
└── server.js                 # Application entry point
```

---

## 3. DATABASE MODELS SCHEMAS

1. **`Service` Model:** Stores the 9 canonical core services. Indexed by `slug` and `serviceId`.
2. **`TeamMember` Model:** Stores the 10 approved team roster entries. Includes support for `REQUIRES_BUSINESS_CONFIRMATION` and `isPendingName` flags for the electrical department head entry.
3. **`Project` Model:** Stores construction projects with fields for `title`, `slug`, `category`, `location`, `shortDescription`, `fullDescription`, `coverImage`, `galleryImages`, `featured`, `isPublished`, and `displayOrder`.
4. **`Enquiry` Model:** Stores customer contact and building estimate form submissions. Fields include `type` (`CONTACT_INQUIRY` / `ESTIMATE_REQUEST`), `fullName`, `phone`, `email`, `serviceRequested`, `projectType`, `location`, `estimatedBudget`, `message`, `status` (`NEW`, `CONTACTED`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`), and `clientIp`.
5. **`User` Model:** Stores administrative credentials with `username`, `email`, `password` (hashed with `bcryptjs`), `role` (`admin`/`superadmin`), and `isActive` status.

---

## 4. API ENDPOINTS MATRIX

| HTTP Method | Route | Description | Auth | Rate Limit |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Health check endpoint | Public | None |
| `GET` | `/api/v1/services` | List canonical services | Public | None |
| `GET` | `/api/v1/services/:slug` | Get single canonical service | Public | None |
| `GET` | `/api/v1/team` | List 10 approved team members | Public | None |
| `GET` | `/api/v1/projects` | List projects (paginated) | Public | None |
| `GET` | `/api/v1/projects/:slug` | Get single project detail | Public | None |
| `POST` | `/api/v1/enquiries` | Submit contact or estimate request | Public | 5 req / 15 min |

---

## 5. DATA SAFETY & SEEDING STRATEGY

- **Zero Fake Data:** No fake projects, reviews, awards, or statistics have been generated or seeded into the database.
- **Data Seeder:** Running `npm run seed` inside `server/` executes `src/seeders/seedApprovedData.js`, populating MongoDB with ONLY the approved 9 canonical services and 10 team entries from single source of truth `client/src/utils/constants.js`.

---

## 6. SECURITY & MIDDLEWARE HARDENING

- **Rate Limiting:** `express-rate-limit` limits public form POST requests to 5 requests per 15 minutes per IP address.
- **Input Sanitation & Validation:** `express-validator` validates fields (phone 10-15 digits, min length, email format).
- **CORS Control:** Restricts origins to approved client URLs (`http://localhost:5173`, `http://localhost:3000`, and `process.env.CLIENT_URL`).
- **Payload Limits:** `express.json({ limit: '10kb' })` prevents excessive request payloads.
- **Centralized Error Handler:** Catches operational errors, handles Mongoose Cast/Duplicate key errors gracefully, and masks stack traces in production.

---

## 7. FRONTEND INTEGRATION BOUNDARY

- **Axios Client:** Created `client/src/services/api.js` configured with `VITE_API_BASE_URL`.
- **Estimate Form:** Connected `client/src/components/forms/InquiryForm.jsx` to send data to `/api/v1/enquiries` with real-time submit loading state and fallback error protection.
- **Constants Fallback:** If the backend server is offline, public pages automatically fall back to `client/src/utils/constants.js` ensuring 100% uptime for public site visitors.

---

## 8. TESTING & VERIFICATION RESULTS

1. **Frontend Build Check:** Executed `npm run build` in `client/` — **Passed (0 errors)**.
2. **Backend Syntax Check:** Verified all modules load cleanly under ESM without warnings.
3. **Data Integrity Check:** Confirmed 9 canonical services and 10 team entries match `constants.js` exactly.
