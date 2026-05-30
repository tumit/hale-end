# ADR-003: Adopt Logbook

## Status

Accepted

## Context

The application needs HTTP request and response logging for:

* debugging
* troubleshooting
* API monitoring

We want a simple solution that integrates well with Spring Boot.

## Decision

Use Logbook for HTTP request and response logging.

Sensitive data such as passwords, tokens, and personal information must be masked or excluded from logs.

## Consequences

### Positive

* Better API visibility
* Easier debugging
* Consistent HTTP logging format
* Good Spring Boot integration

### Negative

* Additional log volume
* Incorrect configuration may expose sensitive data
