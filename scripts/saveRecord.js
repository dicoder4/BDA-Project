import dotenv from 'dotenv';
import sha3 from 'js-sha3';
import crypto from 'crypto';
import { connectDB } from '../db.js';
import Record from '../models/Record.js';

const { keccak256 } = sha3;
dotenv.config();

export async function saveRecord(data) {
  try {
    await connectDB();
    console.log("✅ MongoDB connection successful");

    const record = {
      // Hashed patient identity
      patientHash: '0x' + keccak256(data.email.toLowerCase()),

      // These fields remain plain text
      name: data.name,
      gender: data.gender,
      age: data.age,
      test: data.test,
      result: data.result,
      notes: data.notes,

      // Doctor is hashed now
      doctorHash: '0x' + keccak256(data.doctor),

      // Hashed hospital and record identity
      hospitalName: data.hospital,
      recordID: data.recordID
    };

    console.log('📦 Saving record to Mongo:', record);
    await Record.create(record);
    console.log("✅ Record saved to MongoDB");
  } catch (err) {
    console.error("❌ Failed to connect or save record:", err.message);
  }
}
