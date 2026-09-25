# VitalSync architecture

The browser authenticates through `/api/auth/register` or `/api/auth/login` and stores the returned JWT. Protected requests send the token in the Authorization header. Express middleware verifies the token, loads the User document, and attaches it to `req.user`.

Appointment controllers always derive ownership from `req.user._id`. Reads use `{ ownerId: req.user._id }`; mutations load the document, compare `appointment.ownerId` with the authenticated ID, and return `403` when they differ. Mongoose validates enums, required fields, and indexes owner/date/status for common dashboard queries.

The React dashboard hydrates appointments after session restoration, mutates local state after create/update, and removes deleted records optimistically with rollback. Recharts receives reduce/map-derived status and date aggregates, so visualizations update with every CRUD operation.
