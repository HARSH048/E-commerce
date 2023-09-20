const userRepository = require("../repository/userRepsotiory");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

      const token = this.generateToken({ email: user.email, id: user.id });
      return token;
    } catch (error) {
      console.log(error);
      console.log("Something went wrong in service layer");
      throw error;
    }
  }

  async isauthenticate(token) {
    try {
      const response = this.verify(token);
      if (!response) throw { message: "invalid token" };
      console.log(response);

      const user = await this.userrepository.findId(response.id);
      if (!user) throw { message: "no user with corressponsind token" };
      return user;
    } catch (error) {
      console.log("something went wrong in auth process");
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

  verify(token) {
    try {
      const res = jwt.verify(token, "secret");
      return res;
    } catch (error) {
      console.log("Something went wrong in token validation");
      throw error;
    }
  }
}

module.exports = UserService;
