# MED13 Foundation Website

## Overview

The MED13 Foundation website is a single-page application built to support families affected by MED13 syndrome, an ultra-rare neurodevelopmental disorder. The platform serves as a central hub for community building, research participation, and information sharing. It enables newsletter subscriptions, showcases the foundation's roadmap and partnerships, and provides clear pathways for families to join research cohorts and get involved with the organization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and API communication

**UI Component System:**
- shadcn/ui components based on Radix UI primitives for accessible, composable UI elements
- Tailwind CSS for utility-first styling with custom design tokens
- Custom design system following medical information architecture patterns (inspired by Dana-Farber, Mayo Clinic Foundation)
- Component variants using class-variance-authority for consistent styling patterns

**Design Philosophy:**
- Medical-focused color palette (Deep Medical Blue #1B4B7E, Soft Teal #2D7A89, Warm Coral #E67E5C)
- Typography hierarchy using Inter for body text and Poppins for headings
- Mobile-first responsive design with accessibility as a priority
- Clear visual hierarchy emphasizing trust, clarity, and accessibility

**State Management:**
- React Query for server state (newsletter subscriptions, data fetching)
- Local component state using React hooks
- Form state managed through react-hook-form with Zod schema validation

### Backend Architecture

**Server Framework:**
- Express.js for HTTP server and API routes
- Node.js runtime with ESM module support
- TypeScript for type safety across the stack

**API Design:**
- RESTful endpoints under `/api` namespace
- JSON request/response format
- Centralized error handling and request logging middleware
- Schema validation using Zod for type-safe data validation

**Current API Endpoints:**
- `POST /api/newsletter/subscribe` - Newsletter subscription with email validation
- `GET /api/newsletter/subscribers` - Retrieve all newsletter subscribers

**Data Storage:**
- In-memory storage implementation (`MemStorage`) for development
- Database schema defined using Drizzle ORM with PostgreSQL dialect
- Schema includes `newsletterSubscribers` table with email uniqueness constraint
- Prepared for migration to PostgreSQL database using Drizzle Kit migrations

**Development Workflow:**
- Vite middleware integration for HMR during development
- Custom logging middleware for API request/response tracking
- Hot module replacement for rapid iteration

### External Dependencies

**Database & ORM:**
- Drizzle ORM configured for PostgreSQL with Neon serverless driver (`@neondatabase/serverless`)
- Migration files stored in `./migrations` directory
- Schema definitions in `shared/schema.ts` for shared types between frontend and backend
- Environment variable `DATABASE_URL` required for database connection

**UI Component Libraries:**
- Radix UI primitives for 20+ accessible component patterns (dialogs, dropdowns, navigation, etc.)
- Tailwind CSS v3 with custom configuration for medical-themed design system
- Lucide React for consistent icon library
- embla-carousel-react for carousel functionality

**Form Handling & Validation:**
- react-hook-form for performant form state management
- @hookform/resolvers for Zod schema integration
- Zod for runtime type validation and schema definition
- drizzle-zod for automatic schema generation from database models

**Third-Party Services (Mentioned in Content):**
- COMBINEDBrain - Biorepository consortium partnership (external integration)
- Rare Village - Fiscal sponsorship for 501(c)(3) tax-deductible donations (pending approval)
- Simons Searchlight - Patient registry enrollment platform (external link)
- Facebook Groups - Private support community (external platform)

**Development Tools:**
- TypeScript for static type checking
- ESBuild for production server bundling
- PostCSS with Autoprefixer for CSS processing
- Replit-specific plugins for development environment integration

**Deployment Configuration:**
- Separate build commands for frontend (Vite) and backend (ESBuild)
- Static assets served from `dist/public` directory
- Production server runs bundled Express app from `dist/index.js`
- Environment-based configuration (NODE_ENV for development/production modes)