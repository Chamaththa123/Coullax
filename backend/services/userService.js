const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function createUser(useremail, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ useremail, password: hashedPassword });
  return user.save();
}

async function findUserByUseremail(useremail) {
  return User.findOne({ useremail });
}

module.exports = { createUser, findUserByUseremail };
