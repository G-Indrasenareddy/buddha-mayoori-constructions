# PHASE 07 — ADMIN DASHBOARD & AUTHENTICATION SPECIFICATION
**Project Name:** Buddha Mayoori Constructions Website & Management Platform  
**Document Version:** 2.0.0  
**Status:** Implemented & Verified  
**Target Location:** `docs/PHASE-07-ADMIN-AUTH.md`  

---

## 1. EXECUTIVE SUMMARY & OBJECTIVE

Phase 07 introduces a production-ready, secure **Admin Dashboard & Authentication System** for **Buddha Mayoori Constructions**. It enables authorized administrators to securely manage website content (projects, canonical core services, team roster entries) and review incoming customer enquiries without exposing administrative interfaces or private records publicly.

---

## 2. REUSED FOUNDATION & SECURITY MECHANICS

- **User Model (`server/src/models/User.js`):** Extended with `lastLogin` timestamp. Passwords remain hashed via `bcryptjs` with `select: false` on Mongoose queries.
- **JWT Token Authentication:** `POST /api/v1/auth/login` generates signed JWT tokens (`JWT_EXPIRES_IN=8h`).
- **Authorization & Protection Middleware:** `protect` middleware verifies `Authorization: Bearer <token>` header, checks `user.isActive === true`, and attaches user info. `requireRole('admin', 'superadmin')` verifies role authorization.
- **Token Storage Strategy:** In-memory React `AuthContext` state backed by `sessionStorage` (cleared upon browser tab close).
- **Admin Bootstrap CLI:** Executing `npm run bootstrap:admin` in `server/` reads `INITIAL_ADMIN_USERNAME`, `INITIAL_ADMIN_EMAIL`, `INITIAL_ADMIN_PASSWORD` from `.env` and idempotently creates the initial administrator account.

---

## 3. ADMIN API ENDPOINTS MATRIX

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/login` | Public (Rate Limited) | Authenticates admin credentials and returns JWT token |
| `GET` | `/api/v1/auth/me` | Protected (Admin) | Returns active session administrator info |
| `GET` | `/api/v1/admin/dashboard/summary` | Protected (Admin) | Aggregate counter metrics & status counts |
| `GET` | `/api/v1/admin/projects` | Protected (Admin) | List all projects (including drafts) |
| `POST` | `/api/v1/admin/projects` | Protected (Admin) | Create project record |
| `PUT` | `/api/v1/admin/projects/:id` | Protected (Admin) | Update project record |
| `DELETE` | `/api/v1/admin/projects/:id` | Protected (Admin) | Delete project record |
| `GET` | `/api/v1/admin/services` | Protected (Admin) | List 9 canonical services |
| `PUT` | `/api/v1/admin/services/:id` | Protected (Admin) | Update service descriptions/ordering |
| `GET` | `/api/v1/admin/team` | Protected (Admin) | List 10 approved team entries |
| `POST` | `/api/v1/admin/team` | Protected (Admin) | Create team entry |
| `PUT` | `/api/v1/admin/team/:id` | Protected (Admin) | Edit team entry |
| `DELETE` | `/api/v1/admin/team/:id` | Protected (Admin) | Delete team entry |
| `GET` | `/api/v1/admin/enquiries` | Protected (Admin) | List customer enquiries (filterable by status) |
| `GET` | `/api/v1/admin/enquiries/:id` | Protected (Admin) | View full enquiry detail |
| `PATCH` | `/api/v1/admin/enquiries/:id/status` | Protected (Admin) | Update status (`NEW`, `CONTACTED`, `IN_PROGRESS`, `COMPLETED`, `ARCHIVED`) |

---

## 4. FRONTEND ADMIN ARCHITECTURE

- **Nested Route Group (`/admin`)**:
  - `/admin/login` — Standalone unauthenticated login form.
  - `/admin` — Overview dashboard with summary cards and recent enquiries.
  - `/admin/projects` — Projects management table & modal CRUD forms.
  - `/admin/services` — Canonical services management table & edit modal.
  - `/admin/team` — Team roster management table & edit modal.
  - `/admin/enquiries` — Customer enquiries table with filter tabs and 1-click status updates.
- **Route Guard (`ProtectedRoute.jsx`)**: Checks `isAuthenticated` & `isLoading`. Unauthenticated requests redirect to `/admin/login`.
- **Layout (`AdminLayout.jsx`)**: Sidebar navigation, top header displaying admin username/email, and logout trigger.

---

## 5. RECORD PRESERVATION & PUBLIC DATA BOUNDARY

- **Enquiry Preservation**: Customer enquiries represent official business records and cannot be deleted via API. Status transitions to `ARCHIVED` are used for lifecycle management.
- **Public Privacy**: Enquiries are not exposed through public API endpoints and are accessible only through authenticated admin endpoints.
- **Public Uptime Isolation**: Public website pages remain 100% independent of admin authentication state.
