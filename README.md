# FreeListing — Multi-API Interface

FreeListing is a production-ready, high-fidelity project listing interface built with React and Tailwind CSS. It aggregates 6 distinct mini-applications powered by [FreeAPI](https://freeapi.app/), featuring a modern Bento Grid dashboard and a unified Vercel-inspired design system.

## 🚀 Features

- **Unified Dashboard**: A clean, responsive Bento Grid landing page with quick-access project cards.
- **6 Integrated Projects**:
  - **Products**: Full-featured product catalog with price, rating, and discount badges.
  - **Quotes**: Elegant quote gallery with global author citations.
  - **Jokes**: Single-joke random viewer with an interactive refresh trigger.
  - **Cats**: Comprehensive breed profiles featuring 12 attributes (stats), 10 behavioral traits, and external resource links.
  - **Meals**: Recipe browser with category and origin metadata.
  - **Users**: High-fidelity personal profile cards with contact, location, and registration details.
- **Modern UI/UX**:
  - **Tailwind CSS v4**: Built with the latest Tailwind features for maximum styling efficiency.
  - **Dark Mode**: Seamless toggle between light and dark themes with system preference persistence.
  - **Aesthetics**: Vercel/shadcn style with dotted borders, glassmorphism, and smooth micro-animations.
  - **Responsive**: Fully optimized for desktop, tablet, and mobile devices.
- **Technical Excellence**:
  - **Centralized API Layer**: Managed via Axios with a consistent request pattern.
  - **Strict-Mode Fix**: Custom hooks and refs to ensure API calls run exactly once, even in development.
  - **Sticky UI**: Fixed navigation and sticky media columns for enhanced browsing.
  - **SEO Optimized**: Semantic HTML and descriptive metadata.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **Data Fetching**: Axios
- **Routing**: React Router Dom v7

## 📦 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

- `/src/api`: Centralized API service using Axios.
- `/src/components`: Reusable UI components (Shell, Loader, Error, Pagination, ThemeToggle).
- `/src/pages`: Feature-specific pages for each API project.
- `/src/context`: Theme and global state management.
- `/src/index.css`: Tailwind v4 configuration and design system tokens.

---

**FreeListing** · Built for the Web Dev Cohort 2026
