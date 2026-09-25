import express from 'express';
import mongoose from 'mongoose';
import Appointment from '../models/Appointment.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();
const fields = ['patientName','providerName','date','time','specialty','reason','visitMode','location','status','notes'];
const clean = body => Object.fromEntries(fields.filter(key => body[key] !== undefined).map(key => [key, typeof body[key] === 'string' ? body[key].trim() : body[key]]));
const invalidId = id => !mongoose.isValidObjectId(id);

router.use(requireAuth);
router.get('/', async (req, res, next) => { try { res.json({ success: true, appointments: await Appointment.find({ ownerId: req.user._id }).sort({ date: 1, time: 1 }) }); } catch (e) { next(e); } });
router.post('/', async (req, res, next) => { try { const appointment = await Appointment.create({ ...clean(req.body), ownerId: req.user._id }); res.status(201).json({ success: true, appointment }); } catch (e) { if (e.name === 'ValidationError') return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: Object.values(e.errors).map(x => x.message).join(', ') } }); next(e); } });
router.put('/:id', async (req, res, next) => { try { if (invalidId(req.params.id)) return res.status(400).json({ success: false, error: { code: 'INVALID_ID', message: 'Appointment ID is invalid.' } }); const item = await Appointment.findById(req.params.id); if (!item) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Appointment not found.' } }); if (!item.ownerId.equals(req.user._id)) return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'You do not own this appointment.' } }); Object.assign(item, clean(req.body)); await item.save(); res.json({ success: true, appointment: item }); } catch (e) { if (e.name === 'ValidationError') return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: Object.values(e.errors).map(x => x.message).join(', ') } }); next(e); } });
router.delete('/:id', async (req, res, next) => { try { if (invalidId(req.params.id)) return res.status(400).json({ success: false, error: { code: 'INVALID_ID', message: 'Appointment ID is invalid.' } }); const item = await Appointment.findById(req.params.id); if (!item) return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Appointment not found.' } }); if (!item.ownerId.equals(req.user._id)) return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'You do not own this appointment.' } }); await item.deleteOne(); res.json({ success: true, deletedId: req.params.id }); } catch (e) { next(e); } });
export default router;
