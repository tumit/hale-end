File: `adr/ADR-004-use-liquibase-for-database-migration.md`

# ADR-004: Use Liquibase for Database Migration

## Status

Accepted

## Context

The application needs database version control and repeatable schema changes.

The team prefers:

* SQL-based migration files
* simple review process
* developer experience similar to Flyway

## Decision

Use Liquibase for database migration.

Migrations will be written mainly in SQL files instead of XML, YAML, or JSON.

Liquibase changelog files will reference versioned SQL scripts.

## Consequences

### Positive

* Database schema changes are version controlled
* SQL scripts are easy to review
* Familiar workflow similar to Flyway
* Good Spring Boot integration

### Negative

* Liquibase configuration is more complex than Flyway
* Developers must maintain changelog files carefully
