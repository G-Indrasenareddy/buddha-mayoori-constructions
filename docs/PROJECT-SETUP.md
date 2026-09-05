# Project Setup & Architectural Guidelines

## Project Purpose
Buddha Mayoori Constructions is a full-stack digital platform designed to provide a professional web presence and administrative backend for a real construction firm.

## Technology Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Frontend Framework | React | UI component structure |
| Build Tool | Vite | Fast frontend bundler and HMR |
| Routing | React Router | Client-side page navigation |
| Styling | Tailwind CSS | Utility-first responsive styling |
| Icons | Lucide React | Clean, accessible vector icons |
| HTTP Client | Axios | Asynchronous REST API requests |
| Backend Runtime | Node.js | JavaScript server execution |
| Web Framework | Express.js | HTTP server & routing |
| Database | MongoDB & Mongoose | NoSQL persistence & data modeling |
| Authentication | JWT & bcryptjs | Token auth and password hashing |

## Basic Architecture

The repository enforces strict separation of concerns between client and server layers.

`
buddha-mayoori-constructions/
├── client/          # Vite + React Client Application
├── server/          # Express.js REST Backend Application
├── docs/            # Project Specification & Documentation
├── .gitignore       # Root Repository Git Exclusion Rules
├── package.json     # Root Workspace Scripts
└── README.md        # Overview & High-Level Roadmap
`

## Folder Structure

### Client Structure (client/src/)
- ssets/ - Static assets, images, branding media
- components/ - Reusable UI components (buttons, cards, forms)
- pages/ - View components corresponding to router paths
- services/ - Axios API services & endpoint modules
- hooks/ - Custom React hooks
- context/ - Global React context state providers
- utils/ - Helper functions, formatters, constants

### Server Structure (server/src/)
- config/ - Environment configuration, database connection wrappers
- controllers/ - Request handlers and business logic
- models/ - Mongoose schemas and data models
- 
outes/ - Express API route declarations
- middlewares/ - Authentication, error handling, validation middleware
- utils/ - Helper routines and async handler wrappers

## Development Principles

1. **Clean & Readable Code**: Write modular, self-documenting code with clear variable and function names.
2. **Reusable Components**: Keep components single-purpose and DRY.
3. **Separation of Concerns**: Keep business logic decoupled from presentation logic.
4. **Responsive & Accessible Design**: Ensure fully responsive layouts built with accessibility standard compliance.
5. **Secure Backend Practices**: Sanitize inputs, enforce proper authorization, handle errors gracefully, and prevent security vulnerabilities.
6. **Environment Variable Management**: Never hardcode credentials, connection strings, or secrets.
7. **Authentic Data Integrity**: Strictly use authentic business content; no fake statistics, fake testimonials, or invented details.

## Phase Roadmap

1. **PHASE 01** - Requirements & Project Planning
2. **PHASE 02** - UI/UX & Visual Design
3. **PHASE 03** - Project Setup & Frontend Foundation
4. **PHASE 04** - Public Website Development
5. **PHASE 05** - Responsive & Mobile Experience
6. **PHASE 06** - Backend & Database
7. **PHASE 07** - Admin Dashboard
8. **PHASE 08** - Integration, Security & Validation
9. **PHASE 09** - Testing & Performance
10. **PHASE 10** - Deployment & Handover

## Current Project Status
- **Phase**: Project Initialization & Foundation Setup Complete.
- **Status**: Ready for Phase 01 (Requirements & Project Planning).
- **Active Code Base**: Frontend and backend folders configured with clean scalable structure, dependency manifests installed, environment templates established, and docs created. No Phase 01+ features or UI components have been built yet.
