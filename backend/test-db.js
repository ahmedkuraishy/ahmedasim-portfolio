require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing connection to:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, { 
  serverSelectionTimeoutMS: 5000 
})
.then(() => {
  console.log('Successfully connected to MongoDB!');
  process.exit(0);
})
.catch(err => {
  console.error('Failed to connect to MongoDB:');
  console.error(err);
  process.exit(1);
});
