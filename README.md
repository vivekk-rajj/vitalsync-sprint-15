# VitalSync Sprint 15

Feature-complete full-stack healthcare appointment dashboard with JWT authentication, MongoDB ownership enforcement, appointment CRUD, and dynamic analytics.

## Stack

- React + Vite + React Router + Recharts
- Node.js + Express + Mongoose
- bcryptjs password hashing and JWT authentication
- MongoDB/MongoDB Atlas

## Quick start

```bash
npm install
npm run install:all
cp server/.env.example server/.env
cp client/.env.example client/.env
npm run dev
```

The client runs on `http://localhost:5173`; the API runs on `http://localhost:5000`.

## Schema

`User`: `name`, unique normalized `email`, bcrypt `passwordHash`, `role`, timestamps.

`Appointment`: `ownerId` (required User ObjectId), `patientName`, `providerName`, `date` (YYYY-MM-DD), `time`, `specialty`, `reason`, `visitMode` (`in-person` or `telehealth`), `location`, `status` (`Requested`, `Confirmed`, `In Progress`, `Completed`, `Cancelled`), `notes`, timestamps. The API always derives `ownerId` from the JWT and never trusts a client-supplied owner.

## API

- `POST /api/auth/register` — `{ name, email, password }`
- `POST /api/auth/login` — `{ email, password }`
- `GET /api/auth/me` — authenticated session restoration
- `GET /api/appointments` — authenticated user's appointments only
- `POST /api/appointments` — create an owned appointment
- `PUT /api/appointments/:id` — update an owned appointment
- `DELETE /api/appointments/:id` — delete an owned appointment
- `GET /api/health`

Send `Authorization: Bearer <token>` to protected routes. Cross-user update/delete attempts return `403`.

## QA checklist

1. Register and confirm redirect to the dashboard.
2. Refresh and confirm the JWT session is restored.
3. Create an appointment and confirm it appears without reload.
4. Edit an appointment and confirm the updated fields render.
5. Delete an appointment after confirmation and confirm it disappears.
6. Confirm charts update for status and upcoming-day counts.
7. Attempt protected API requests without a token and confirm `401`.
8. Attempt an appointment mutation with another user's token and confirm `403`.
9. Run `npm run build` and `npm test`.

Do not use real patient data. This is demonstration software and is not HIPAA-certified.
