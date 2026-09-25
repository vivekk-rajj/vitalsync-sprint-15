import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
const port = process.env.PORT || 5000;
try { await mongoose.connect(process.env.MONGODB_URI); app.listen(port, () => console.log(`VitalSync API listening on ${port}`)); } catch (error) { console.error('Unable to connect to MongoDB', error); process.exit(1); }
