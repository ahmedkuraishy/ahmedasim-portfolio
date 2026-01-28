require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const adminData = {
  name: 'Admin User',
  email: 'admin@portfolio.com',
  password: 'adminpassword123',
  role: 'admin'
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for admin seeding...');
    
    await User.deleteMany({ role: 'admin' });
    console.log('Cleared existing admins.');
    
    await User.create(adminData);
    console.log('Seeded admin user successfully!');
    
    process.exit(0);
  } catch (err) {
    console.error('Seeding error message:', err.message);
    if (err.errors) {
      Object.keys(err.errors).forEach(key => {
        console.error(`Validation error for ${key}:`, err.errors[key].message);
      });
    }
    console.error('Stack trace:', err.stack);
    process.exit(1);
  }
}

seed();
