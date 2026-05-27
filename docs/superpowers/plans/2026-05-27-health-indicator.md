# Health Indicator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Display backend health status from Spring Actuator on the landing page footer.

**Architecture:** Add Vite proxy for `/actuator/**` to backend, fetch health on app mount, display status badge in footer.

**Tech Stack:** Vite, React, TypeScript, Spring Boot Actuator, Tailwind CSS, DaisyUI

---

### Task 1: Configure Vite proxy for actuator endpoint

**Files:**
- Modify: `frontend/vite.config.ts:8-14`

The proxy already has `/api` configured. Add `/actuator` to the same proxy.

- [x] **Step 1: Modify vite.config.ts to add actuator proxy**

```typescript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/actuator': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  // ... rest unchanged
})
```

- [x] **Step 2: Verify development server still starts**

Run: `cd frontend && npm run dev` (Ctrl+C after confirming no errors)

Expected: Server starts on port 5173 without config errors

- [x] **Step 3: Commit Vite proxy change**

```bash
git add frontend/vite.config.ts
git commit -m "chore: add vite proxy for actuator endpoint"
```

---

### Task 2: Add health status to App.tsx

**Files:**
- Modify: `frontend/src/App.tsx:1-123`

- [x] **Step 1: Add health status state and effect**

Replace the import and add state/ effect at top of App function:

```typescript
import { useState, useEffect } from 'react'
// ... other imports unchanged

function App() {
  const [count, setCount] = useState(0)
  const [healthStatus, setHealthStatus] = useState<'loading' | 'up' | 'down' | 'error'>('loading')

  useEffect(() => {
    fetch('/actuator/health')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'UP') {
          setHealthStatus('up')
        } else {
          setHealthStatus('down')
        }
      })
      .catch(() => setHealthStatus('error'))
  }, [])
```

- [x] **Step 2: Add footer section with health badge**

Add after the spacer section (before closing `</>`):

```tsx
      <section id="spacer"></section>

      <footer className="footer">
        <div className="status">
          Backend Status:{' '}
          {healthStatus === 'loading' && <span className="loading loading-spinner loading-xs"></span>}
          {healthStatus === 'up' && <span className="badge badge-success">Healthy</span>}
          {healthStatus === 'down' && <span className="badge badge-error">Unhealthy</span>}
          {healthStatus === 'error' && <span className="badge badge-error">Unavailable</span>}
        </div>
      </footer>
```

- [x] **Step 3: Verify dev server shows footer**

Run: `cd frontend && npm run dev`
Open browser to http://localhost:5173, confirm footer appears at bottom

- [x] **Step 4: Commit frontend changes**

```bash
git add frontend/src/App.tsx
git commit -m "feat: add health status indicator to landing page footer"
```

---

### Task 3: Verify end-to-end functionality

**Files:**
- None (verification only)

- [x] **Step 1: Start backend server**

```bash
cd backend && ./gradlew bootRun
```

Wait for "Started BackendApplication" in output

- [x] **Step 2: Verify backend actuator endpoint works**

Run in separate terminal: `curl http://localhost:8080/actuator/health`
Expected: `{"status":"UP"}`

- [x] **Step 3: Start frontend dev server**

```bash
cd frontend && npm run dev
```

- [x] **Step 4: Verify health indicator in browser**

Open http://localhost:5173
Expected: Footer shows "Backend Status: Healthy" with green badge