const User = require("../models/userModel");

class userRepository {
  async create(data) {
    const user = await User.create(data);
    return user;
  }
}

module.exports = userRepository;
