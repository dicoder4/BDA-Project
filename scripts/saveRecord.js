import dotenv from 'dotenv';
import sha3 from 'js-sha3';
import crypto from 'crypto';
import { connectDB } from '../db.js';
import Record from '../models/Record.js';

const { keccak256 } = sha3;
dotenv.config();

const algorithm = 'aes-256-cbc';
const secretKey = process.env.SECRET_KEY;
const ivLength = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: iv.toString('hex'),
    content: encrypted
  };
}

export async function saveRecord(data) {
  try {
    await connectDB();
    console.log("✅ MongoDB connection successful");

    const record = {
      // Hashed patient identity
      patientHash: '0x' + keccak256(data.email.toLowerCase()),

      // These fields will remain plain text
      name: data.name,
      gender: data.gender,
      age: data.age,
      test: data.test,
      result: data.result,
      notes: data.notes,

      // Hashed or encrypted for privacy
      doctorHash: encrypt(data.doctor),
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
