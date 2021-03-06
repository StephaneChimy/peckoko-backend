const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const userCtrl = require("../controllers/user");

// Need to be tested as a middleware
// Can be use with Rate Limit Mongo to store data 
// Limit number of request for login route
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
//

// Limit number of request for signup route
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100, // start blocking after 5 requests
  message:
    "Too many accounts created from this IP, please try again after an hour",
});
//
//

router.post("/signup", createAccountLimiter, userCtrl.signup);
router.post("/login", apiLimiter, userCtrl.login);

module.exports = router;
