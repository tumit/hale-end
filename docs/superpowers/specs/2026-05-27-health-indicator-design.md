# Health Indicator Design

## Overview
Display backend health status on the landing page footer using Spring Boot Actuator's `/actuator/health` endpoint.

## Components

### Backend Configuration
- Spring Boot Actuator is already configured in `build.gradle` and `application.properties`
- Add a footer section to App.tsx with health status indicator
- Configure Vite proxy in `vite.config.ts` to forward `/actuator/**` requests to backend

### Frontend Changes
- **File**: `frontend/src/App.tsx`
  - Add `useEffect` hook to fetch `/actuator/health` on mount
  - Add state for health status: `"loading"`, `"healthy"`, `"unhealthy"`, or `"error"`
  - Create a footer section with health badge using DaisyUI classes

### Vite Proxy Configuration
- **File**: `frontend/vite.config.ts`
  - Add proxy rule for `/actuator` to `http://localhost:8080`

## Data Flow
1. Page loads
2. App component mounts, triggers health fetch
3. Fetch `/actuator/health` via Vite proxy
4. Parse JSON response (expects `{"status": "UP"}`)
5. Display green badge if UP, red if DOWN or error

## Error Handling
- Network errors display as "Unavailable" (red badge)
- No auto-refresh, no retry button

## Styling
- Use DaisyUI badge component with `badge-success` or `badge-error` classes
- Footer positioned at bottom of page with muted text styling