const mongoose = require('mongoose');

// const dbURL = 'mongodb+srv://somasuryadev6:jfwlDcpzKPbmVNSC@cluster1.cgbepcd.mongodb.net/?retryWrites=true&w=majority';
// const dbURL = "mongodb://127.0.0.1:27017/internDb" || process.env.MONGO_URL;


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

// Export the Mongoose instance to be used in other parts of your application
module.exports = mongoose;
