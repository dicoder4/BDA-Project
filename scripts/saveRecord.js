import dotenv from 'dotenv';
import sha3 from 'js-sha3';
const { keccak256 } = sha3;

import { connectDB } from '../db.js';
import Record from '../models/Record.js';

dotenv.config();

export async function saveRecord(data) {
  try {
    await connectDB();
    console.log("✅ MongoDB connection successful");

    const record = {
      patientHash: '0x' + keccak256(data.email.toLowerCase()),
      nameHash: '0x' + keccak256(data.name),
      genderHash: '0x' + keccak256(data.gender),
      age: data.age,
      hospitalName: data.hospital,
      test: data.test,
      result: data.result,
      doctorHash: '0x' + keccak256(data.doctor),
      notesHash: '0x' + keccak256(data.notes),
      recordID: data.recordID
    };

    await Record.create(record);
    console.log("✅ Record saved to MongoDB");
  } catch (err) {
    console.error("❌ Failed to connect or save record:", err.message);
  }
}

// Run directly
if (process.argv[1].endsWith('saveRecord.js')) {
  saveRecord({
    email: "test@example.com",
    name: "John Doe",
    gender: "Male",
    age: 35,
    hospital: "Apollo",
    test: "Blood Test",
    result: "Normal",
    doctor: "Dr. Mehta",
    notes: "No further action",
    recordID: "blood-001"
  });
}
