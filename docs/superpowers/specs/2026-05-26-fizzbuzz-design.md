# FizzBuzz Feature Design

**Date:** 2026-05-26
**Stack:** React 19 + TypeScript + Vite + Tailwind + DaisyUI / Spring Boot 4 + Java 25 + Spring Modulith + Lombok

---

## Goal

Demonstrate frontend-backend connection in the simplest way using FizzBuzz as the domain. User inputs a number, backend computes the FizzBuzz result, frontend displays it.

---

## Architecture

### Frontend

```
frontend/src/
  pages/
    FizzBuzzPage.tsx      # number input + submit button + result display
  App.tsx                 # landing page with feature links + React Router setup
```

- React Router handles `/` (App.tsx as landing page) and `/fizzbuzz` (FizzBuzzPage).
- Vite dev proxy forwards `/api/*` to `http://localhost:8080` — no CORS configuration needed.

### Backend

```
backend/src/main/java/xyz/tumit/backend/
  fizzbuzz/                        # Spring Modulith module boundary
    FizzBuzz.java                  # functional core: pure static compute(int n)
    FizzBuzzRequest.java           # record { int n }
    FizzBuzzResponse.java          # record { String result }
    FizzBuzzController.java        # imperative shell: POST /api/fizzbuzz
```

Spring Modulith enforces `fizzbuzz` as an isolated module at the package level. Nothing outside this package accesses its internals.

---

## Functional Core / Imperative Shell

**`FizzBuzz.java`** — pure function, zero dependencies, no Spring annotations:
```java
public class FizzBuzz {
    public static String compute(int n) {
        if (n % 15 == 0) return "FizzBuzz";
        if (n % 3 == 0) return "Fizz";
        if (n % 5 == 0) return "Buzz";
        return String.valueOf(n);
    }
}
```

**`FizzBuzzController.java`** — imperative shell, owns all side effects (HTTP in/out):
```java
@RestController
@RequestMapping("/api/fizzbuzz")
class FizzBuzzController {
    @PostMapping
    FizzBuzzResponse compute(@RequestBody @Valid FizzBuzzRequest request) {
        return new FizzBuzzResponse(FizzBuzz.compute(request.n()));
    }
}
```

---

## API Contract

**Endpoint:** `POST /api/fizzbuzz`

**Request:**
```json
{ "n": 15 }
```

**Success Response (200):**
```json
{ "result": "FizzBuzz" }
```

**Error Response (400) — RFC 9457 Problem Details:**
```json
{
  "type": "about:blank",
  "title": "Bad Request",
  "status": 400,
  "detail": "n must be a positive integer",
  "instance": "/api/fizzbuzz"
}
```

Validation: `n` must be a positive integer (`@Positive` constraint on the record).

---

## Data Flow

```
User types number → clicks Submit
  → POST /api/fizzbuzz { "n": 15 }
    → Vite proxy → Spring Boot :8080
      → FizzBuzzController
        → FizzBuzz.compute(15)
          → "FizzBuzz"
        → { "result": "FizzBuzz" }
  → FizzBuzzPage displays "FizzBuzz"

Invalid input (e.g. n = -1):
  → 400 ProblemDetail returned
  → FizzBuzzPage displays detail message
```

---

## Testing Strategy

**Backend dependencies:** JUnit 5 + AssertJ + JsonUnit (add `net.javacrumbs.json-unit:json-unit-assertj` to `build.gradle`).

**Backend:**
- `FizzBuzzTest.java` — plain JUnit 5 + AssertJ. No Spring context. Tests pure `compute()` directly: n=1, n=3, n=5, n=15, edge cases.
- `FizzBuzzControllerTest.java` — `@WebMvcTest` slice + JsonUnit AssertJ assertions. Tests HTTP layer: valid request returns correct JSON shape, invalid request returns RFC 9457 ProblemDetail shape (status, detail fields). JSON strings written as Java text blocks (`"""`). 

**Frontend:**
- `FizzBuzzPage.test.tsx` — Vitest + Testing Library. Tests: renders form, submits and shows result, shows error message on failure.

---

## Vite Proxy Config

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': 'http://localhost:8080'
  }
}
```
