import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  patientHash: String,
  nameHash: String,
  genderHash: String,
  age: Number,
  hospitalName: String,
  test: String,
  result: String,
  doctorHash: String,
  notesHash: String,
  recordID: String
});

export default mongoose.model('records', recordSchema, 'medicalrecords'); 
// 'medicalrecords' is the collection name
