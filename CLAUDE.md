# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

A full-stack learning project with:
- **backend/**: Spring Boot (Java 25) with Spring Modulith architecture
- **frontend/**: React + TypeScript + Vite with TailwindCSS + DaisyUI

## Development

Use mise tasks to run dev servers:

```bash
mise fe              # Start frontend dev server (http://localhost:5173)
mise be              # Start backend dev server (http://localhost:8080)
mise dev             # Start both (foreground tasks, use separate terminals)
```

Or run directly from repository root:

```bash
npm run --prefix "$(git rev-parse --show-toplevel)/frontend" dev    # Start dev server (http://localhost:5173)
npm run --prefix "$(git rev-parse --show-toplevel)/frontend" build  # Build for production
npm run --prefix "$(git rev-parse --show-toplevel)/frontend" lint   # Run ESLint
npm run --prefix "$(git rev-parse --show-toplevel)/frontend" test   # Run Vitest tests

"$(git rev-parse --show-toplevel)/backend/gradlew" bootRun   # Run Spring Boot app
"$(git rev-parse --show-toplevel)/backend/gradlew" test      # Run tests
"$(git rev-parse --show-toplevel)/backend/gradlew" build     # Build the project
```

## Architecture

The frontend proxies `/api` and `/actuator` to the backend at `http://localhost:8080` (see vite.config.ts).

Current features:
- Landing page with backend health status indicator
- FizzBuzz game (planned) - intended to demonstrate "function core, imperative shell" pattern for testable business logic