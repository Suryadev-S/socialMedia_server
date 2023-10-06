const { User, Post } = require("../models/model");
const {mongoose} = require("../database/connection")
const jwt = require("jsonwebtoken");

const jwtSecret = 'super-secret';

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

exports.signup = async (req, res) => {
    const { username, email, password, fullname } = req.body;
    const unique = generateRandomString(10);
    const newUser = new User({
        key: unique,
        username: username,
        email: email,
        password: password,
        fullName: fullname
    });
    await newUser.save();
    res.status(200).json({ message: 'Post received successfully you may login now' });
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            // const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1d' });
            // res.cookie('token', user.key, { httpOnly: true });
            res.status(200).json({ token: user.key, message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Wrong credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.posts = async (req, res) => {
    try { 
        const { key } = req.body;
        const user = await User.findOne({ key });
        if (user) {
            const post = await Post.find({ key });
            res.status(200).json({ post: post, message: 'Retrieve successful' });
        } else {
            res.status(401).json({ message: 'Wrong credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.logout = async (req, res) => {
    req.session = null;
    res.status(201).json({ action: true });
}

exports.media = async (req, res) => {
    try {
        const {content, media, key} = req.body;
        console.log(req.body);
        const newPost = new Post({
            content: content, // Post text
            key: key, // Author's user ID
            media: media, // Media URLs
        });        
        await newPost.save();
        res.status(201).json({ message: 'post uploaded' });
    } catch (error) {
        console.error('Error uploading post:', error);
        res.status(500).json({ message: 'Error uploading post' });
    }
}

exports.profile = async (req, res) => {
    console.log('hitted')
    try {
      const {key} = req.body;     
      const user = await User.findOne({key});
  
      if (!user) {
        return res.status(404).json({ message: 'User not found may be you not logged in' });
      }
  
      console.log(user);
      res.status(200).json({user: user});
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  