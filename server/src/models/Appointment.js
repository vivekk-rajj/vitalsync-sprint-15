import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  patientName: { type: String, required: true, trim: true, maxlength: 120 },
  providerName: { type: String, required: true, trim: true, maxlength: 120 },
  date: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  time: { type: String, required: true, match: /^\d{2}:\d{2}$/ },
  specialty: { type: String, required: true, trim: true, maxlength: 100 },
  reason: { type: String, required: true, trim: true, maxlength: 500 },
  visitMode: { type: String, enum: ['in-person', 'telehealth'], default: 'in-person' },
  location: { type: String, trim: true, maxlength: 200 },
  status: { type: String, enum: ['Requested', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'], default: 'Requested' },
  notes: { type: String, trim: true, maxlength: 1000 }
}, { timestamps: true });

appointmentSchema.index({ ownerId: 1, date: 1 });
appointmentSchema.index({ ownerId: 1, status: 1 });
export default mongoose.model('Appointment', appointmentSchema);
