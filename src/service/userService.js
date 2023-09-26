const userRepository = require("../repository/userRepsotiory");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

class UserService {
  constructor() {
    this.userrepository = new userRepository();
  }

  async create(data) {
    try {
      const user = await this.userrepository.create(data);
      return user;
    } catch (error) {
      console.log("something went wrong in service");
      throw error;
    }
  }

  async signin(data) {
    try {
      const user = await this.userrepository.find(data.email);
      if (!user) throw { message: "no user found" };

      const isPasswordValid = this.comparePassword(
        data.password,
        user.password
      );

      if (!isPasswordValid) throw { message: "incorrect password" };

      const refreshtoken = this.generaterefreshToken({
        email: user.email,
        id: user.id,
      });
      const updateToken = await User.findByIdAndUpdate(
        user.id,
        { refreshToken: refreshtoken },
        { new: true }
      );
      const token = this.generateToken({ email: user.email, id: user.id });
      return { token, refreshtoken };
    } catch (error) {
      console.log(error);
      console.log("Something went wrong in service layer");
      throw error;
    }
  }

  async handlerefreshtoken(cookie) {
    if (!cookie.refreshToken)
      throw { message: "no new refresh token in cookie" };

    const refreshtoken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken: refreshtoken });
    if (!user) throw { message: "no refresh token in db or not matched" };
    const user2 = jwt.verify(refreshtoken, "secret");

    if (user.id != user2.id)
      throw { message: "there is something wrong with refresh token" };
    const token = this.generateToken({ email: user.email, id: user.id });
    return token;
  }

  async logout(cookie) {
    try {
      if (!cookie.refreshToken) throw { message: "no refresh token in cookie" };

      const refreshtoken = cookie.refreshToken;
      const user = await User.findOne({ refreshToken: refreshtoken });
      if (!user) return refreshtoken;

      const updatedUser = await User.findByIdAndUpdate(
        user.id,
        { refreshToken: "" },
        { new: true }
      );
      return updatedUser;
    } catch (error) {
      console.log("something went wrong");
      throw error;
    }
  }

  async findid(id) {
    try {
      const response = await this.userrepository.findId(id);
      return response;
    } catch (error) {
      console.log("something went wrong to find user");
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await this.userrepository.delete(id);
      console.log("in service layer");
      return response;
    } catch (error) {
      console.log("something went wrong to delete user");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await this.userrepository.update(id, data.isblocked);
      return response;
    } catch (error) {
      console.log("something went wrong to update user");
      throw error;
    }
  }

  comparePassword(Plainpassword, encryptedpassword) {
    try {
      return bcrypt.compareSync(Plainpassword, encryptedpassword);
    } catch (error) {
      console.log("something went wrong in password comparison");
      throw error;
    }
  }

  generateToken(user) {
    try {
      return jwt.sign(user, "secret", { expiresIn: "1d" });
    } catch (error) {
      console.log("something went wrong in generate token");
      throw error;
    }
  }

  generaterefreshToken(user) {
    try {
      return jwt.sign(user, "secret", { expiresIn: "3d" });
    } catch (error) {
      console.log("something went wrong in generate refresh  token");
      throw error;
    }
  }
}

module.exports = UserService;
