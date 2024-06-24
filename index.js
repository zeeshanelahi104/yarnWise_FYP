// index.js or server.js

import express from 'express';
import cors from 'cors';
import { connectDB, PORT } from './connectDB.js';

// Initialize Express app
const app = express();

// Apply CORS middleware
app.use(cors());

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
