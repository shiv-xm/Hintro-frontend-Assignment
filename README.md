# Hintro Frontend

Hintro Frontend is a modern web application built with [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vitejs.dev/). It leverages [Material UI](https://mui.com/) for styling and [DnD Kit](https://dndkit.com/) for drag-and-drop interactions, likely for task management or dashboard features.

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [npm](https://www.npmjs.com/) (Should be installed with Node.js)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd Hintro-frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

### Development Server

To start the development server with HMR (Hot Module Replacement):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

To locally preview the production build:

```bash
npm run preview
```

### Linting

To lint the codebase and check for code style issues:

```bash
npm run lint
```

### Testing

This project uses [Vitest](https://vitest.dev/) for unit testing. To run tests:

```bash
npm run test
```

## 📦 Tech Stack

-   **Framework**: [React](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI Library**: [Material UI (@mui/material)](https://mui.com/) w/ `@emotion`
-   **Icons**: [Lucide React](https://lucide.dev/) & [MUI Icons](https://mui.com/material-ui/material-icons/)
-   **Drag & Drop**: [DnD Kit](https://dndkit.com/)
-   **Routing**: [React Router](https://reactrouter.com/)
-   **Testing**: [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)
-   **Linting**: [ESLint](https://eslint.org/)

## 📂 Project Structure

```
Hintro-frontend/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Application pages/routes
│   ├── theme/           # Theme configuration (if applicable)
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Entry point
├── .gitignore           # Git ignore file
├── index.html           # HTML entry point
├── package.json         # Project metadata and dependencies
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── vitest.config.ts     # Vitest configuration
```

## 📄 License

This project is licensed under the MIT License.
