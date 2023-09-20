const express = require("express");
const {
  signup,
  signin,
  authenticate,
} = require("../controllers/usercontroller");
const router = express.Router();

router.post("/register", signup);
router.get("/signin", signin);
router.get("/authenticate", authenticate);

module.exports = router;
