const express = require("express");
const {
  signup,
  signin,
  authenticate,
  getuser,
  destroy,
  updateUser,
  handleRefreshToken,
  logout,
} = require("../controllers/usercontroller");
const { isAdmin, isisauthenticate } = require("../middleware/user-middleware");
const router = express.Router();

router.post("/register", signup);
router.get("/signin", signin);
router.get("/getuser/:id", getuser);
router.get("/delete/:id", isisauthenticate, isAdmin, destroy);
router.put("/block-user/:id", isisauthenticate, isAdmin, updateUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

module.exports = router;
