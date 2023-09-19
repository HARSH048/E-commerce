const express = require("express");
const { signup } = require("../controllers/usercontroller");
const router = express.Router();

router.post("/register", signup);

module.exports = router;
