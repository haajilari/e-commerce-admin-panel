# E-commerce Logistics Admin Panel

A robust admin panel for an e-commerce website, focusing on logistics operations such as managing product updates, inventory, capacities, user roles, and other critical e-commerce functions. This project is built using modern frontend technologies and best practices, intended as a comprehensive learning project for senior frontend developers.

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Key Features Implemented](#key-features-implemented)
- [Project Structure Overview](#project-structure-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Development Server](#running-the-development-server)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Architectural Principles](#architectural-principles)
- [State Management](#state-management)
- [Styling](#styling)
- [Testing](#testing)
- [Future Enhancements (Examples)](#future-enhancements-examples)
- [Contribution](#contribution)

## Project Description

This admin panel provides a centralized interface for managing the logistics and operational aspects of an e-commerce platform. It aims to deliver a feature-rich, scalable, and maintainable frontend application adhering to modern development standards.

## Tech Stack

- **Core Framework**: React 19 (with functional components and Hooks)
- **Language**: TypeScript (latest version)
- **Build Tool & Dev Server**: Vite
- **Package Manager & Runtime**: Bun
- **UI Component Library**: Material UI (MUI) v5+ (referred to as v7 contextually, using Emotion as the default styling engine)
- **Routing**: React Router DOM v6
- **State Management**: Zustand (with persist middleware)
- **Form Management**: Formik
- **Schema Validation**: Yup
- **Styling**: Sass (SCSS syntax, SCSS Modules) & MUI's styling solutions (`sx` prop, `styled` API)
- **Testing**: Vitest (as a Jest-compatible test runner) & React Testing Library (RTL), `@testing-library/jest-dom`, `@testing-library/user-event`

## Key Features Implemented (So Far)

- **User Authentication**:
  - Login page with form validation (Formik & Yup).
  - Simulated authentication service.
  - JWT-like token handling (mocked).
  - State management for auth status using Zustand (persisted to localStorage).
  - Protected routes for admin sections.
  - Logout functionality.
  - Auth state initialization on app load.
- **Layout**:
  - Main admin layout with a persistent Sidebar, Header (AppBar), and Content Area.
  - Basic sidebar navigation.
- **Product Management**:
  - Forms for adding and editing products using Formik & Yup.
  - Reusable custom form control components integrated with MUI and Formik.
  - Simulated API service for product CRUD operations (Create, Read (by ID), Update).
  - Product listing page with a reusable data table component.
  - Pagination for product list.
  - Delete product functionality with confirmation.
- **Reusable Components**:
  - `ReusableTable` component with pagination and custom cell rendering.
  - `FormikTextField`, `FormikSelectField`, `FormikSwitchField` for consistent form building.
  * `Typography` atom (custom).
  * `PageHeader` molecule.
- **Routing**: Dynamic routing with React Router DOM v6, including nested routes and route parameters.
- **Styling**:
  - Global theme setup for Material UI.
  - Use of Sass for global styles, variables, mixins, and SCSS modules.
- **Testing**:
  - Vitest and React Testing Library setup.
  - Unit tests for utility functions and components.
  - Integration tests for form submissions and component interactions.

## Project Structure Overview

The project follows a feature-first and component-based architecture:

- **`public/`**: Static assets.
- **`src/`**: Main source code.
  - **`assets/`**: Images, fonts, etc.
  - **`components/`**: Globally reusable UI components, organized by Atomic Design principles (atoms, molecules, organisms).
    - `atoms/`
    - `molecules/` (e.g., `formControls/`, `PageHeader/`)
    - `organisms/` (e.g., `ReusableTable/`)
  - **`config/`**: Application-level configurations (e.g., `theme.ts`, API endpoints - if any).
  - **`constants/`**: Application-wide constants.
  - **`features/`**: Self-contained feature modules (e.g., `authentication/`, `products/`). Each feature can have its own `components/`, `services/`, `store/` (if applicable), `types/`, etc.
  - **`hooks/`**: Custom reusable React hooks.
  - **`layouts/`**: Layout components (e.g., `AdminLayout/`).
  - **`lib/`**: Third-party library configurations or wrappers (e.g., Axios instance if used).
  - **`pages/`**: Top-level page components, often assembling organisms and feature-specific components. Organized by feature (e.g., `products/ProductListPage.tsx`).
  - **`providers/`**: Global context providers (if any beyond ThemeProvider and Router).
  - **`routes/`**: Routing configuration (`AppRoutes.tsx`, `ProtectedRoute.tsx`).
  - **`services/`**: Global API service definitions or mock API implementations (though feature-specific services are preferred in `src/features/`).
  - **`store/`**: Global state management setup (e.g., main Zustand store, though feature slices are in `src/features/`).
  - **`styles/`**: Global Sass files (`main.scss`, partials like `_variables.scss`, `_mixins.scss`, `_base.scss`).
  - **`types/`**: Global TypeScript type definitions.
  - **`utils/`**: Utility functions.
  - `App.tsx`: Main application component.
  - `main.tsx`: Application entry point.
  - `setupTests.ts`: Test setup file for Vitest.
- `vite.config.ts`: Vite configuration (including Vitest).
- `tsconfig.json`: TypeScript configuration.
- `package.json`: Project dependencies and scripts.
- `bun.lockb`: Bun lockfile.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended, primarily for npm/npx if not using Bun exclusively)
- [Bun](https://bun.sh/) (as the primary package manager and runtime)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd e-commerce-admin-panel
    ```

2.  **Install dependencies using Bun:**
    ```bash
    bun install
    ```

### Running the Development Server

To start the development server (powered by Vite):

```bash
bun run dev
```
