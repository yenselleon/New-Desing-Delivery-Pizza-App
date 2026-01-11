# GEMINI.md - Project Context for AI Assistants

This document provides a comprehensive overview of the Pizza Delivery Dashboard project to give AI assistants the necessary context for effective and consistent collaboration.

## 1. Project Overview

This is a modern, responsive web application for a pizza delivery service. The application provides a user-friendly interface for customers to browse the menu, add items to a cart, and proceed to checkout.

*   **Core Functionality:**
    *   Display a menu of food items (pizzas, pastas, sides).
    *   Allow users to add/remove items from a shopping cart.
    *   Provide a checkout process.
    *   User authentication pages.

*   **Key Technologies:**
    *   **Framework:** React (`v18.3.1`)
    *   **Language:** TypeScript
    *   **Build Tool:** Vite (`v6.3.5`)
    *   **Routing:** `react-router-dom`
    *   **Styling:** Tailwind CSS with a custom theme (`globals.css`) using modern CSS features like `oklch()` color functions.
    *   **UI Components:** The project uses a pre-built component library based on Radix UI, consistent with the structure of **shadcn/ui**. The components and their utilities are located in `src/components/ui`.

*   **Project Structure:**
    *   `src/`: Contains all the application source code.
    *   `src/components/`: Home to all React components.
        *   `src/components/ui/`: Contains the shadcn/ui-like base components (e.g., `button.tsx`, `card.tsx`).
        *   `src/components/*.tsx`: Application-specific components (e.g., `MenuGrid.tsx`, `CartDrawer.tsx`).
    *   `src/styles/`: Contains global styles and Tailwind CSS setup.
    *   `src/App.tsx`: The main component that sets up routing and global state (shopping cart).
    *   `src/main.tsx`: The entry point of the application.

## 2. Building and Running

The following scripts are defined in `package.json` and are the primary commands for development.

*   **Install Dependencies:**
    ```bash
    npm install
    ```

*   **Run Development Server:** Starts a local server with hot-reloading, accessible at `http://localhost:3010`.
    ```bash
    npm run dev
    ```

*   **Build for Production:** Bundles the application for deployment into the `build/` directory.
    ```bash
    npm run build
    ```

## 3. Development Conventions

To ensure code quality and consistency, please adhere to the following conventions.

*   **Component Model:** Follow the existing component-based architecture. Create new components in the `src/components` directory. If a component is a generic, reusable UI element, consider adding it to `src/components/ui`.

*   **Styling:**
    *   Use **Tailwind CSS utility classes** for all styling.
    *   Refer to `tailwind.config.js` (if present) and `src/styles/globals.css` for theme customizations (colors, fonts, radii). The project uses CSS variables for theming, with `oklch()` for color definitions, allowing for easy theme changes (e.g., light/dark modes).
    *   The `cn` utility function (from `src/components/ui/utils.ts`) should be used to conditionally apply classes, as it correctly merges Tailwind classes.

*   **State Management:**
    *   Global state, such as the shopping cart, is currently managed with React's `useState` hook in the `App.tsx` component and passed down via props. For new global state, consider if this pattern is sufficient or if a more robust solution like React Context is needed.

*   **Data:**
    *   The menu items are currently hardcoded in `src/App.tsx`. In a real-world scenario, this data would be fetched from an API.

*   **Routing:**
    *   The application uses `react-router-dom` for navigation. All routes are defined in `src/App.tsx`. Add new page routes here.

*   **Code Quality:**
    *   While not explicitly configured in `package.json`, maintain the existing code style.
    *   Use TypeScript and provide types for all props, state, and function signatures.
