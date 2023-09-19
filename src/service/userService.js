const userRepository = require("../repository/userRepsotiory");

class UserService {
  constructor() {
    this.userrepository = new userRepository();
  }

  async create(data) {
    try {
      const user = await this.userrepository.create(data);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserService;
