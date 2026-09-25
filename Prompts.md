# Sprint 15 implementation log

## Prompt

Implement the complete VitalSync Sprint 15 Track B deliverable in a new repository: secure JWT authentication, a MongoDB-backed Appointment resource, ownership-enforced REST CRUD, React client integration, optimistic deletion, and dynamic Recharts analytics.

## Decisions

- Appointments are the primary MVP resource because the product wireframe centers on booking and appointment status.
- `ownerId` is injected from the verified JWT for every create request; list queries are scoped by `ownerId` and update/delete operations check ownership before mutation.
- The client uses a single dashboard form for create/edit to keep the core interaction discoverable and functional.
- Delete is optimistic with rollback on API failure and uses a confirmation prompt.
- Stripe was intentionally deferred because CRUD, ownership, client integration, and analytics are the required feature-complete scope and no payment architecture existed yet.
