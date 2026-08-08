# LifeStream 🩸

LifeStream is a blood donation platform that connects blood donors with people and organizations in need. It aims to make finding, requesting, and coordinating blood donations simple, fast, and trustworthy.

## Live URL

🔗 [https://lifestream-dfa99.web.app/]

## Purpose

Blood shortages often happen not because donors don't exist, but because donors and recipients can't find each other in time. LifeStream solves this by giving donors a place to register and stay discoverable, and giving requesters a fast way to search for compatible donors and manage donation requests — all in one clean, responsive interface.

## Key Features

- 🩸 **Donor registration & profiles** — users can sign up as donors with blood group, location, and availability status
- 🔍 **Donor search** — find available donors filtered by blood group and location
- 📋 **Donation request management** — create, track, and update blood donation requests
- 🔐 **Authentication** — secure sign-up/login powered by Firebase
- 📊 **Dashboard with data visualization** — charts (via Recharts) showing donation stats and activity
- 🎨 **Polished, responsive UI** — floating pill-style navbar with scroll blur effect, hover-animated nav links, and a footer with an animated ECG "pulse wave"
- 🔔 **Smooth alerts & notifications** — SweetAlert2 for confirmations and feedback
- 📱 **Fully responsive design** — built with Tailwind CSS and DaisyUI
- 🧭 **Client-side routing** — React Router for seamless navigation

## Tech Stack & npm Packages

**Core**

- `react` / `react-dom` — UI library
- `react-router` — client-side routing
- `vite` — build tool & dev server

**Styling**

- `tailwindcss` + `@tailwindcss/vite` — utility-first CSS
- `daisyui` — Tailwind component library

**Data & Forms**

- `@tanstack/react-query` — server state management & data fetching
- `axios` — HTTP client
- `react-hook-form` — form handling & validation

**Backend Services**

- `firebase` — authentication and/or hosting services

**UI/UX Enhancements**

- `lucide-react` / `react-icons` — icon libraries
- `sweetalert2` — styled alert/confirmation modals
- `recharts` — charts and data visualization

**Dev Tools**

- `eslint` + plugins — code linting
- `@vitejs/plugin-react` — React support for Vite
- TypeScript type definitions for React
