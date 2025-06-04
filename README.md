# BDA-Project
# EHR Blockchain

A decentralized Electronic Health Records (EHR) management system using Ethereum smart contracts, MongoDB, and a React frontend.

## Features

- Store and retrieve patient health records securely on the blockchain and MongoDB.
- Patient records are indexed by a hashed email for privacy.
- React frontend for adding and viewing records.
- MetaMask integration for blockchain access.
- Download patient records as JSON.

## Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── AddRecord.js
│   │   │   └── ViewRecords.js
│   │   └── ...
│   ├── public/
│   └── package.json
├── models/
│   └── Record.js           # Mongoose model for records
├── scripts/
│   └── saveRecord.js       # Script to save records to DB
├── smart-contract/
│   └── EHRSharing.sol      # Solidity smart contract
├── server.js               # Express backend server
├── db.js                   # MongoDB connection
├── package.json            # Backend dependencies
└── ...
```

## Prerequisites

- Node.js & npm
- MongoDB
- MetaMask extension
- Ganache or Ethereum testnet

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/ehr-blockchain.git
cd ehr-blockchain
```

### 2. Install backend dependencies

```sh
npm install
```

### 3. Install frontend dependencies

```sh
cd client
npm install
```

### 4. Configure Environment Variables

- Create a `.env` file in the root and in `client/` as needed.
- Set MongoDB URI, port, and any blockchain config.

Example `.env`:
```
MONGO_URI=mongodb://localhost:27017/ehr
PORT=5000
```

### 5. Start MongoDB

Make sure MongoDB is running locally or update the URI in `.env`.

### 6. Deploy the Smart Contract

- Compile and deploy `smart-contract/EHRSharing.sol` using Remix, Hardhat, or Truffle.
- Copy the deployed contract address and ABI to the frontend config (`client/src/contract.js`).

### 7. Start the Backend Server

```sh
npm start
```

### 8. Start the Frontend

```sh
cd client
npm start
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Add Record:** Enter patient details and save to blockchain and MongoDB.
- **View Records:** Enter patient email, fetch records from blockchain and MongoDB, and download as JSON.

## Technologies Used

- React
- Express.js
- MongoDB & Mongoose
- Ethereum, Solidity, ethers.js
- js-sha3 (for hashing)
- MetaMask

## License

MIT

---

