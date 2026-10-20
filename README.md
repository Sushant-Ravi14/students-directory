# Student Directory Portal

A modern, high-performance academic directory application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. The portal delivers an intuitive, sleek **dark-themed UI** for browsing students, inspecting academic faculty departments, and viewing specialized curriculum tracks.

---

## 1. UI Analysis & Identified Routes

The user interface was analyzed and decomposed into logical pages and routes adhering to Next.js App Router conventions:

| Route | Type | Description | Rendering Strategy |
| :--- | :--- | :--- | :--- |
| `/` | Static (Redirect) | Redirects visitors to `/students` | Static Prerender |
| `/students` | Static / Client | Student directory with live search, department filtering, and pagination | Static Shell + Client Interactive State |
| `/students/[id]` | Dynamic Route (`[id]`) | Detailed student profile, enrolled subjects, academic standing, and certified validation status | Dynamic Server Component (RSC) |
| `/departments` | Static | Academic faculties overview, active faculty counter, and department listings | Static Prerender (RSC) |
| `/departments/[...slug]` | Catch-All Route (`[...slug]`) | **1 segment (`/[dept]`):** Department overview & all tracks.<br>**2 segments (`/[dept]/[track]`):** Specialization detail, enrollees & lab specs. | Dynamic Server Component (RSC) |
| `/about` | Static | Institutional overview, system architecture, and curriculum mapping | Static Prerender (RSC) |
| `/*` (Unmatched) | Not Found | Custom 404 page with route suggestions matching the design specification | Server Component (`not-found.tsx`) |

### Key Architectural Decisions:
- **Unified Catch-All Route (`/departments/[...slug]`):** Instead of duplicating folder trees, a single catch-all route handles both the department-level view (`/departments/computer-science`) and the track-level view (`/departments/computer-science/web-development`). Any path exceeding 2 segments automatically invokes `notFound()`.
- **Dynamic Route (`/students/[id]`):** Resolves individual student profiles by case-insensitive student ID (e.g. `STU-1042`). Invalid IDs gracefully invoke `notFound()`.
- **Server-First Rendering (RSC):** All data retrieval and metadata generation occur on the server for instant page loads, security, and SEO, while client components (`"use client"`) are restricted to interactive user state (search input, filter dropdowns, active tab indicators, and error boundaries).

---

## 2. Folder Structure

The project strictly follows standard Next.js App Router structure:

```text
students-directory/
├── public/                     # Static assets & icons
├── src/
│   ├── app/                    # Next.js App Router routes & layouts
│   │   ├── about/
│   │   │   └── page.tsx        # /about route
│   │   ├── departments/
│   │   │   ├── [...slug]/
│   │   │   │   └── page.tsx    # /departments/[dept] and /departments/[dept]/[spec]
│   │   │   └── page.tsx        # /departments route
│   │   ├── students/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx    # /students/[id] dynamic profile route
│   │   │   └── page.tsx        # /students directory route
│   │   ├── error.tsx           # App Router error boundary
│   │   ├── globals.css         # Dark theme CSS tokens & styles
│   │   ├── layout.tsx          # Root layout (Navbar, Fonts, Dark Mode)
│   │   ├── loading.tsx         # Dark skeleton loading screens
│   │   ├── not-found.tsx       # Custom 404 Route Not Found page
│   │   └── page.tsx            # Root redirect to /students
│   ├── components/             # Reusable UI components
│   │   ├── Breadcrumbs.tsx     # Reusable breadcrumb navigation
│   │   ├── DepartmentCard.tsx  # Department card with faculty icons & stats
│   │   ├── Navbar.tsx          # Sticky navigation with active tab indicator
│   │   └── StudentCard.tsx     # Dual-variant student card (directory & track view)
│   ├── lib/
│   │   └── data.ts             # Centralized realistic dummy database
│   └── types/
│       └── allTypes.ts         # TypeScript interfaces & types
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. Component Breakdown

To prevent UI duplication and guarantee consistent styling, the interface is broken into atomic, reusable components:

1. **`Navbar` (`src/components/Navbar.tsx`)**:
   - Replaced "Campus Directory" with **"Student Directory"**.
   - Removed the `"Frontend practice"` dummy placeholder.
   - Added academic cap emblem SVG.
   - Uses `usePathname()` to display an active glow indicator below the active section (`Students`, `Departments`, `About`).

2. **`StudentCard` (`src/components/StudentCard.tsx`)**:
   - **Default Variant (Students Directory):** Displays avatar initials in deterministic glowing hues, ID chip (`STU-1042`), name, department tag, year, and "View profile →".
   - **Specialization Variant (Department Track View):** Displays compact horizontal layout with student ID, year badge, specialization role, and profile navigation.

3. **`DepartmentCard` (`src/components/DepartmentCard.tsx`)**:
   - Renders department icons tailored to faculty disciplines (Computer Science, Business, Mathematics, Engineering).
   - Shows active specialization counts and enrolled student metrics.
   - Links directly to the department's tracks.

4. **`Breadcrumbs` (`src/components/Breadcrumbs.tsx`)**:
   - Standardized navigation trail (e.g. `Departments / Computer Science / Web Development`).

---

## 4. Types & Dummy Data

All domain models are strictly typed in `src/types/allTypes.ts`:

```typescript
export type StudentStatus = "Active" | "On Leave" | "Probation" | "Graduated";

export interface Subject {
  code: string;
  name: string;
  credits: number;
}

export interface Student {
  id: string;
  name: string;
  department: string;
  departmentSlug: string;
  year: number;
  email: string;
  enrolled: string;
  specialization: string;
  status: StudentStatus;
  about: string;
  subjects: Subject[];
}

export interface Department {
  name: string;
  slug: string;
  description: string;
  specializations: number;
  enrolledStudents: number;
}

export type Specialization = {
  slug: string;
  name: string;
  departmentSlug: string;
  code: string;
  description: string;
  lead: string;
  lab: string;
  cycle: string;
};
```

Data is stored centrally in `src/lib/data.ts` to ensure consistency across student profiles, department lists, track counts, and subject credits.

---

## 5. Dark-Themed UI System

The application has been tailored with a dark theme:

- **Color Palette:**
  - Base background: `#090d16` (deep obsidian navy)
  - Surface cards: `#101726` with `#1e293b` subtle borders
  - Active / Primary accents: Electric Blue `#3b82f6` with glowing shadows
  - Status indicators: Emerald `#10b981` with subtle pulse animation
  - Typography: Crisp white headers (`#f8fafc`) and readable muted subtitles (`#94a3b8`)
- **Micro-interactions:**
  - Card hover transitions with border color shifts and subtle elevation.
  - Active navigation indicator with blue light glow.
  - Custom dark scrollbar.

---

## 6. Loading, Error & Not Found Handling

- **`loading.tsx`**: Implements dark skeleton pulse components for instantaneous layout feedback during navigation transitions.
- **`not-found.tsx`**: Recreates the design screen with:
  - `404 · Route Not Found` status badge.
  - Direct navigation links (`Return to Students Directory`, `Browse All Departments`).
  - Suggested Starting Points panel listing valid internal routes.
- **`error.tsx`**: Client-side error boundary that logs unhandled errors and allows users to retry or return to safe directory pages.

---

## 7. Getting Started

### Prerequisites
- Node.js 18.17+ or Node.js 20+

### Installation & Run

```bash
# Navigate to project directory
cd students-directory

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.

### Production Build

```bash
npm run build
npm run start
```
