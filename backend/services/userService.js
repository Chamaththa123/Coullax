const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async ({ useremail, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ useremail, password: hashedPassword });
  return await user.save();
};

const findUserByUseremail = async (useremail) => {
  return await User.findOne({ useremail });
};

module.exports = {
  createUser,
  findUserByUseremail,
};
