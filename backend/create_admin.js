const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
    
    const email = 'admin@certificate.com';
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      console.log('User already exists. Updating password...');
      userExists.password = 'password123';
      await userExists.save();
      console.log('User updated successfully');
    } else {
      await User.create({
        name: 'Admin User',
        email: email,
        password: 'password123'
      });
      console.log('Admin user created successfully');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();
