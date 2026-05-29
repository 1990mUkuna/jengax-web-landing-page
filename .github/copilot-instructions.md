# Jenga-X Website — Copilot Instructions

## Project Overview

Marketing/landing website for **Jenga-X**, a construction marketplace for the African diaspora. Built with React 18 + Vite. No TypeScript, no test suite, no linter configured.

## Dev Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server (Vite, hot reload)
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

## Architecture

Single-page React app. `App.jsx` renders all sections in order:

```
Navbar → Hero → Stats → HowItWorks → Features → Markets → CTA → Footer
```

Each section is a self-contained component under `src/components/<Name>/` with two files:
- `<Name>.jsx` — component logic and markup
- `<Name>.module.css` — scoped styles via CSS Modules

There is no state management library; components are stateless except `Navbar` (mobile menu toggle). `react-router-dom` is used for `<NavLink>` in the Navbar.

## Key Conventions

**Component structure:** Every component lives in its own folder and uses CSS Modules. Never use global class names; always `import styles from './Component.module.css'` and reference `styles.className`.

**Design tokens:** All colors, spacing references, and typography are defined as CSS custom properties in `src/index.css` under `:root`. Always use these variables (e.g., `var(--color-primary)`, `var(--max-width)`, `var(--nav-height)`) rather than hard-coding values.

```css
--color-primary: #E5383B      /* brand red */
--color-dark: #161616         /* dark section backgrounds */
--color-dark-card: #1e1e1e    /* card backgrounds in dark sections */
--max-width: 1200px           /* page content width */
--nav-height: 68px
```

**Dark vs. light sections:** Hero/light sections use `--color-bg-hero` (#fdf6f6). Stats, HowItWorks, and CTA sections use dark backgrounds (`--color-dark`). Keep this alternating pattern when adding new sections.

**Assets:** Images live in `src/assets/`. Import them directly in JSX (`import img from '../../assets/img.png'`); do not reference them via public paths.

**Font:** Inter loaded via Google Fonts in `index.html`. Use the `--font-family` CSS variable; don't add additional font imports.

**No TypeScript:** Files use `.jsx`. Do not convert to `.tsx` or add TypeScript config without discussion.
