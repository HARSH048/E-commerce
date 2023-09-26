const User = require("../models/userModel");

class userRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log(error);
      console.log("something went wrong in repository");
      throw error;
    }
  }

  async find(data) {
    try {
      const user = await User.findOne({ email: data });
      return user;
    } catch (error) {
      console.log("something went wrong in repository");
      throw error;
    }
  }

  async findId(id) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      console.log("something went wrong in repo layer");
      throw error;
    }
  }

  async delete(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      console.log("something went wrong in repo layer");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const user = await User.findByIdAndUpdate(
        id,
        {
          isblocked: data,
        },
        { new: true }
      );
      return user;
    } catch (error) {
      console.log("something went wrong in repo layer");
      throw error;
    }
  }
}

module.exports = userRepository;
