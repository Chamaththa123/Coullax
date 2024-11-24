const userDbService = require("../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register function
const registerUser = async (req, res) => {
  const { useremail, password } = req.body;

  // validate input
  if (!useremail || !password) {
    return res
      .status(400)
      .json({ message: "user email and password are required." });
  }

  try {
    // check if the email is already available
    const existingUser = await userDbService.findUserByUseremail(useremail);
    if (existingUser) {
      return res.status(409).json({ message: "email already used." });
    }

    // create user
    await userDbService.createUser(useremail, password);
    return res.status(201).json({ message: "user registered successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "server error occurred when user registration" });
  }
};

//login function
const loginUser = async (req, res) => {
  const { useremail, password } = req.body;

  // Validate input
  if (!useremail || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    // Check if the user exists
    const user = await userDbService.findUserByUseremail(useremail);
    if (!user) {
      return res.status(401).json({ message: "Invalid email." });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id, useremail: user.useremail },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // remove password from user details
    const { password: _, ...userDetails } = user.toObject();

    // Return user details and token
    return res.status(200).json({
      message: "Login successful.",
      token,
      user: userDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "server error occurred when user login." });
  }
};

module.exports = { registerUser, loginUser };
