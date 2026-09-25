import test from 'node:test';
import assert from 'node:assert/strict';
import Appointment from '../src/models/Appointment.js';
test('appointment schema requires ownership and core fields', () => { const item = new Appointment({}); const errors = item.validateSync(); assert.ok(errors.errors.ownerId); assert.ok(errors.errors.patientName); assert.ok(errors.errors.providerName); });
