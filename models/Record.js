import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  patientHash: { type: String, required: true },
  name: { type: String, required: true },     
  gender: { type: String, required: true },   
  notes: { type: String },

  age: { type: Number, required: true },
  hospitalName: { type: String, required: true },
  test: { type: String, required: true },
  result: { type: String, required: true },           // ✅ plaintext string now
  doctorHash: { type: String, required: true },       // ✅ hashed string now

  recordID: { type: String, required: true }
});

export default mongoose.model('records', recordSchema, 'medicalrecords');
