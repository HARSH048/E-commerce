const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost/EcommerceWebsite");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
