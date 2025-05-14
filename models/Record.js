import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  patientHash: { type: String, required: true },      // hashed email
  name: { type: String, required: true },             // plaintext
  gender: { type: String, required: true },           // plaintext
  age: { type: Number, required: true },              // plaintext
  test: { type: String, required: true },             // plaintext

  // Encrypted fields
  result: {
    iv: { type: String, required: true },
    content: { type: String, required: true }
  },
  notes: {
    iv: { type: String, required: true },
    content: { type: String, required: true }
  },

  doctorHash: { type: String, required: true },       // hashed
  hospitalHash: { type: String, required: true },     // hashed
  recordID: { type: String, required: true }          // plaintext
});

export default mongoose.model('records', recordSchema, 'medicalrecords');
