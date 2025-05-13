// server.js - Minimal Express backend to support save & fetch APIs

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { saveRecord } from './scripts/saveRecord.js';
import { connectDB } from './db.js';
import Record from './models/Record.js';
import crypto from 'crypto';
import sha3 from 'js-sha3';
const { keccak256 } = sha3;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ENCRYPTION_KEY = crypto.createHash('sha256').update(String(process.env.SECRET_KEY || 'ehr-secret')).digest('base64').substr(0, 32);
const IV_LENGTH = 16;

function decrypt(obj) {
  if (!obj || !obj.iv || !obj.content) {
    console.error('❗ Missing or invalid encrypted object:', obj);
    return '[Invalid encrypted data]';
  }
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(process.env.SECRET_KEY, 'hex');
  const ivBuffer = Buffer.from(obj.iv, 'hex');
  const encryptedText = Buffer.from(obj.content, 'hex');

  const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Save EHR record to Mongo
app.post('/api/saveRecord', async (req, res) => {
  try {
    console.log('📥 Incoming data:', req.body);
    await saveRecord(req.body);
    res.status(200).json({ message: 'Record saved to MongoDB' });
  } catch (err) {
    console.error('❌ Error saving record:', err);
    res.status(500).json({ error: 'MongoDB save failed' });
  }
});

// Get records by recordIDs
app.post('/api/getRecords', async (req, res) => {
  try {
    const { recordIDs, email } = req.body;
    console.log('🔍 Fetching records for:', recordIDs, 'Email:', email);

    const hashedEmail = '0x' + keccak256(email.toLowerCase());

    const records = await Record.find({
      recordID: { $in: recordIDs },
      patientHash: hashedEmail
    });
    const decrypted = records.map(rec => ({
        hospitalName: rec.hospitalName,
        test: rec.test,
        age: rec.age,
        name: rec.nameHash, // hashed, so show as-is or remove
        gender: rec.genderHash, // hashed, so show as-is or remove
        result: rec.result ? decrypt(rec.result) : '[Missing]',
        doctor: rec.doctorHash ? decrypt(rec.doctorHash) : '[Missing]',
        notes: rec.notesHash ? decrypt(rec.notesHash) : '[Missing]',
        recordID: rec.recordID,
        patientHash: rec.patientHash
      }));
      
    res.status(200).json(decrypted);
  } catch (err) {
    console.error('❌ Fetch error:', err);
    res.status(500).json({ error: 'Fetch failed' });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
