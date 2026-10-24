<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Structure & Conventions

### 1. Page Components (`_components`)
- Page-specific UI components must be placed in a `_components` private folder inside `src/app/`, grouped under their respective page name folder:
  - Pattern: `src/app/_components/<page-name>/` (e.g., `src/app/_components/tasks/TaskCard.tsx`, `src/app/_components/dashboard/Overview.tsx`)
  - Alternatively, if using route colocation: `src/app/<page-name>/_components/`
- Always use the underscore prefix (`_components`) so Next.js App Router treats it as a private folder and excludes it from routing.

### 2. Server Actions (`_actions`)
- Server Actions must be placed in a `_actions` private folder inside `src/app/`, organized into folders corresponding to the action/feature name:
  - Pattern: `src/app/_actions/<action-name>/` (e.g., `src/app/_actions/tasks/create-task.ts`, `src/app/_actions/auth/login.ts`)
  - Alternatively, if using route colocation: `src/app/<page-name>/_actions/`
- All Server Action files must include the `'use server';` directive at the top.

### 3. Component-Based Architecture & Granularity
- **Smallest Component Principle (Atomic & Modular)**:
  - Break the UI down into the smallest logical, single-responsibility components (e.g., buttons, badges, individual list items, card headers, form fields).
  - Avoid large monolithic component files or deeply nested JSX blocks.
  - Reusable and standalone elements should be extracted into small, focused sub-components.

### 4. Clean Page Convention (`page.tsx`)
- **Pages must remain clean, lean, and minimal**:
  - `page.tsx` files (including the root `src/app/page.tsx` and all route pages) must act strictly as orchestrators or containers.
  - Do NOT write heavy markup, elaborate layouts, or direct UI implementations directly inside `page.tsx`.
  - Delegate presentation and layout to dedicated components imported from `_components/<page-name>/`.
  - Keep page files readable at a glance (e.g., orchestrating data fetching and composing 2–4 top-level section components).

### 5. Page Loaders & Skeletons (`loading.tsx`)
- **Structure-Mirroring Skeletons**:
  - Every page must have a corresponding loader/skeleton (via Next.js `loading.tsx` or skeleton components placed in `_components/<page-name>/`).
  - **Mirror the Page Layout**: The loader must accurately replicate the exact layout, wireframe, and geometry of the actual page (matching header, grid dimensions, card shapes, sidebars) instead of using generic full-page spinners.
  - **Atomic Skeletons**: Follow the smallest component principle for loaders as well (e.g., compose the page loader using dedicated sub-skeletons like `CardSkeleton.tsx`, `HeaderSkeleton.tsx`) using pulse/shimmer placeholders to eliminate Cumulative Layout Shift (CLS).

### 6. UI Component Strategy (shadcn/ui First)
- **Priority on shadcn/ui**:
  - Always check and prioritize using **shadcn/ui** components first (e.g., `button`, `input`, `dialog`, `skeleton`, `card`, `badge`, `dropdown-menu`, etc.) whenever a matching component exists in the shadcn catalog.
  - Add required components via the CLI (e.g., `npx shadcn@latest add <component>`).
- **Styling & Layout Customization**:
  - Do not leave shadcn components unaligned with the app theme: customize their styles, classes, and variants to seamlessly match the application's overall layout, typography, and design palette.
- **Custom Components as Fallback**:
  - Build custom UI components from scratch only if shadcn/ui lacks an appropriate component or primitive for the required functionality.

### 7. Animation & Motion Design (GSAP & Framer Motion)
- **Animation Tooling**:
  - Use **Framer Motion** for declarative UI transitions, component entrance/exit states, gestures, and layout morphs.
  - Use **GSAP** for advanced timelines, complex choreography, multi-step sequences, and scroll-driven triggers.
- **Text & Card Animation Requirements**:
  - **Text Animations**: Implement fluid reveals (e.g., staggered word/character fades, subtle slide-ups, typography weight transitions) for headers and hero sections.
  - **Card Animations**: Deliver interactive card behaviors (staggered grid reveals, elevation on hover, smooth border highlights, dynamic tilt/lift).
- **Unified Page Choreography**:
  - The entire page must feel synchronized: orchestrate entrance animations cohesively using staggered container timelines so all page sections (nav, hero, text, cards, buttons) cascade smoothly into place as a unified experience rather than disjointed, independent pops.
- **Performance & Client Boundaries**:
  - Keep motion logic inside focused `'use client'` sub-components following the Smallest Component Principle.
  - Respect accessibility (`prefers-reduced-motion`) and avoid layout shifts during hydration.

### 8. Development Workflow: Frontend-First Approach
- **Frontend-First Priority**: Build and finalize the complete frontend UI, responsive layouts, atomic components, loaders, and animations first.
- **No Backend / Server Action Implementation**:
  - Do NOT implement backend execution logic, database calls, or external service integrations at this stage.
  - The agent is permitted to create/scaffold placeholder files and function signatures in `_actions/` to maintain proper structure and typing, but they must remain stubs (or use mock data) without real server action implementations until explicitly instructed.

### 9. Content & Copywriting (Intentional & Meaningful Text)
- **Zero Fluff & No Filler**:
  - Never use "Lorem ipsum", generic filler text, or redundant placeholder copy anywhere on the site.
- **Purposeful & Meaningful Copy**:
  - Every heading, subtitle, button label, card description, tooltip, and empty-state message must be deliberate, context-aware, and add clear value for the user.
- **Clarity & Brevity**:
  - Keep UI copy concise, modern, and direct—avoid wordy or repetitive explanations.

### 10. Global UI & Design Consistency
- **Unified Design Tokens**:
  - Strictly adhere to a consistent color palette, typography scale, spacing rhythm, and border-radius system across all pages and subcomponents.
- **Component Uniformity**:
  - Reusable primitives (buttons, inputs, badges, cards, dialogs, dropdowns) must exhibit identical hover states, focus rings, padding scales, and active treatments throughout the site.
- **Shared Layout Standards**:
  - Maintain consistent container widths, padding boundaries, navigation patterns, and background treatments across all routes.
- **Cohesive Motion Language**:
  - Ensure animation durations, easing curves, and hover interactions feel part of the same design family across every page.

### 11. Client Boundaries: Push `'use client'` to the Leaves
- **Server Components by Default**:
  - Keep page files, layouts, and data containers as Server Components (RSC) to minimize client bundle size and optimize initial page load.
- **Interactive Leaves Only**:
  - Only mark small, focused sub-components with `'use client'` when they strictly require browser hooks (`useState`, `useEffect`), Framer Motion / GSAP animations, or client-side event handlers.

### 12. Error Boundaries & Resilience (`error.tsx` & `not-found.tsx`)
- **Localized Error Handling**:
  - Every route segment should provide a tailored `error.tsx` (marked `'use client'`) and `not-found.tsx` to handle failures gracefully without crashing the whole application.
- **Actionable Recovery States**:
  - Error screens must mirror the page theme and provide clear recovery options (e.g., a "Try Again" reset button, fallback navigation, and a concise explanation of what occurred).

### 13. URL-Driven State (Filters, Tabs & Search)
- **Shareable & Bookmarkable State**:
  - Avoid storing query parameters, active tabs, filters, or pagination in isolated local `useState`.
  - Use URL search parameters (`useSearchParams` or Next.js routing) so filters remain shareable, persist across page refreshes, and support browser history (Back/Forward).

### 14. Mobile-First Responsive Design & Safe Viewports
- **Fluid & Breakpoint-Driven**:
  - Build layouts mobile-first using responsive Tailwind utility classes (`sm:`, `md:`, `lg:`, `xl:`).
  - Avoid fixed pixel widths on parent containers; use max-width constraints (`max-w-7xl`, `w-full`) to adapt cleanly across screen sizes.
- **Overflow Prevention & Touch Targets**:
  - Prevent unintended horizontal overflow on mobile viewports (`overflow-x-hidden` where needed).
  - Ensure interactive elements maintain comfortable tap target sizes (minimum 44x44px for touch targets).

### 15. Strict TypeScript & Zod Validation (No `any`)
- **Zero `any` Policy**:
  - Enforce strict typing across the entire codebase. Do not use `any` or untyped props, hooks, or event handlers.
- **Schema Contracts**:
  - Define Zod schemas and derived TypeScript types for form inputs, server action parameters, and domain models inside dedicated schema/type files.

<!-- ### 16. Verification Gate (Typecheck & Lint Before Hand-off)
- **Mandatory Quality Checks**:
  - Before concluding any task, feature implementation, or refactor, the agent must execute TypeScript type checking (`npx tsc --noEmit`) and linter validation (`npm run lint`).
  - Zero tolerance for build errors: all type errors, broken imports, and lint warnings introduced during the session must be resolved before completing the response. -->

### 17. Smooth Scrolling & Kinetic Inertia (Lenis)
- **Global Lenis Integration**:
  - All page scrolling and viewport navigation must be orchestrated using **Lenis** (`lenis/react` / `lenis`) to deliver a unified, premium kinetic scrolling feel across the platform.
  - Wrap the application tree in a dedicated client boundary provider (`SmoothScrollProvider.tsx` in `_components/shared/`).
  - Import and apply `lenis/dist/lenis.css` to manage layout resets and overflow prevention.
- **Tuned Inertia & Kinetic Parameters**:
  - Maintain consistent scroll physics across routes: `lerp: 0.08`, `duration: 1.2`, `smoothWheel: true`, `wheelMultiplier: 1.0`, and `touchMultiplier: 1.5`.
- **Nested Scroll Isolation & Modals**:
  - To prevent scroll hijacking in nested scrollable panels (e.g., code snippets, data tables, modal dialogs, drawer panels), add `data-lenis-prevent` to scrollable sub-containers.
- **Accessibility & Motion Coordination**:
  - Respect `prefers-reduced-motion` to disable kinetic inertia for users who prefer standard instant scrolling.
  - Coordinate with GSAP ScrollTrigger or Framer Motion scroll hooks whenever scroll-driven choreography is introduced.









