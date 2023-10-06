const express = require('express');
const controller = require("../controllers/controllers");
 
const router = express.Router();



router.post('/signup-data',controller.signup);
router.post("/login-data",controller.login);
router.post("/media-post",controller.media);
router.post("/profile",controller.profile);
router.post("/posts",controller.posts);

module.exports = router;
