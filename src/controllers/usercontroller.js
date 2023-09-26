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
    res.cookie("refreshToken", user.refreshtoken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      success: true,
      message: "successfully signin the user",
      err: {},
      data: user.token,
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

const handleRefreshToken = async (req, res) => {
  try {
    const cookie = req.cookies;
    const token = await userservice.handlerefreshtoken(cookie);
    return res.status(201).json({
      success: true,
      message: "successfully find the user",
      err: {},
      accessToken: token,
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

const logout = async (req, res) => {
  try {
    const user = await userservice.logout(req.cookies);
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.status(201).json({
      success: true,
      message: "successfully logout the user",
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

const getuser = async (req, res) => {
  try {
    const user = await userservice.findid(req.params.id);
    return res.status(201).json({
      success: true,
      message: "successfully find the user",
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

const destroy = async (req, res) => {
  try {
    const user = await userservice.delete(req.params.id);
    return res.status(201).json({
      success: true,
      message: "successfully delete the user",
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

const updateUser = async (req, res) => {
  try {
    const user = await userservice.update(req.params.id, req.body);
    return res.status(201).json({
      success: true,
      message: "successfully update the user",
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
  getuser,
  destroy,
  updateUser,
  handleRefreshToken,
  logout,
};
