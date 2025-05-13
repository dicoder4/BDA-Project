import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
  patientHash: String,
  nameHash: String,
  genderHash: String,
  age: Number,
  hospitalName: String,
  test: String,
  result: {
    iv: String,
    content: String
  },
  doctorHash: {
    iv: String,
    content: String
  },
  notesHash: {
    iv: String,
    content: String
  },
  
  recordID: String
});

export default mongoose.model('records', recordSchema, 'medicalrecords'); 
// 'medicalrecords' is the collection name
