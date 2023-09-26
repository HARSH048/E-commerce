const userRepository = require("../repository/userRepsotiory");
const userrepository = new userRepository();
const jwt = require("jsonwebtoken");

const isAdmin = async (req, res, next) => {
  try {
    const email = req.email;
    const user = await userrepository.find(email);
    if (user.role === "user") {
      return res.json({
        messgae: "you are not admin",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("Something went wrong in check admin");
    throw error;
  }
};

const isisauthenticate = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.json({ message: "send the token" });
    const response = verify(token);
    if (!response) {
      // throw { message: "invalid token" };
      return res.json({ message: "token is invalid" });
    }

    const user = await userrepository.findId(response.id);
    if (!user) throw { message: "no user with corressponsind token" };
    req.email = user.email;
    next();
  } catch (error) {
    console.log("something went wrong in auth process");
    return res.json({ message: "token is invalid" });
  }
};

function verify(token) {
  try {
    const res = jwt.verify(token, "secret");
    return res;
  } catch (error) {
    console.log("Something went wrong in token validation");
    throw error;
  }
}

module.exports = { isAdmin, isisauthenticate };
