const UserService = require("../service/userService");
const userservice = new UserService();

const signup = async (req, res) => {
  try {
    const user = await userservice.create(req.body);
    return res.status(201).json({
      success: true,
      message: "successfully signup the user",
      err: {},
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      err: error,
      data: {},
    });
  }
};

const signin = async (req, res) => {
  try {
    const user = await userservice.signin(req.body);
    return res.status(201).json({
      success: true,
      message: "successfully signin the user",
      err: {},
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      err: error,
      data: {},
    });
  }
};

const authenticate = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const user = await userservice.isauthenticate(token);
    return res.status(201).json({
      success: true,
      message: "successfully authenticate the user",
      err: {},
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong",
      err: error,
      data: {},
    });
  }
};

module.exports = {
  signup,
  signin,
  authenticate,
};
