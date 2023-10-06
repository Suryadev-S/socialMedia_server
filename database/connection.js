const mongoose = require('mongoose');


const dbURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/socialDb" ;


mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

module.exports = mongoose;
