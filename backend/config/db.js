const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('MONGO_URI is not defined in environment variables');
      return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host || 'Success'}`);
  } catch (error) {
    console.error(`Database Connection Error: ${error.message}`);
    // Do not call process.exit(1) in a serverless environment
  }
};

module.exports = connectDB;
