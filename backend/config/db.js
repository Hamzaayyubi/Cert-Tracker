const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables. Please add it to Vercel settings.');
    }

    // Set connection options for stability
    const options = {
      bufferCommands: false, // Disable buffering to fail fast if not connected
    };

    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    
    cachedConnection = conn;
    console.log(`MongoDB Connected: ${conn.connection.host || 'Success'}`);
    return conn;
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    // Re-throw so the calling middleware/function knows it failed
    throw error;
  }
};

module.exports = connectDB;
