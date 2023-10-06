const {mongoose} = require('../database/connection');

// Define the Post schema
const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    key: {
      type: String,
      required: true,
    },
    media: [
      {
        type: String, // You can store URLs or file paths to the media
        required: true,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  bio: String,
  profileImage: String,
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  posts: [postSchema], // Embed post documents directly
});

// Create models from the schemas
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = {
  User,
  Post,
};
