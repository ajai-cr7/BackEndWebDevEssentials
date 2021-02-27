const express = require('express');
const router = express.Router();

//import controller 
//controllers folder is used to separate and maintain code readability

const {signup,activateAccount} = require("../controllers/auth");
router.post('/signup',signup);
router.post('/email-activate',activateAccount);

module.exports = router;
