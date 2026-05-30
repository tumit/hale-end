# ADR-002: Adopt Spring Modulith

## Status

Accepted

## Context

The application is expected to grow over time.

We want:

* clear module boundaries
* better code organization
* lower coupling between features
* simpler deployment than microservices

## Decision

Use Spring Modulith to build a modular monolith architecture.

The application will be organized by business modules instead of technical layers.

Modules should communicate through events or public interfaces.

## Consequences

### Positive

* Better maintainability
* Clearer module boundaries
* Easier future refactoring
* Simpler than microservices

### Negative

* Requires discipline between modules
* Team needs to learn Modulith concepts
