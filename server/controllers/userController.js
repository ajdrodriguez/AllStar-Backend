const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
var { expressjwt: jwt } = require("express-jwt");

// Middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validate the inputs
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required.",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required.",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 characters long.",
      });
    }
    const existingUser = await userModel.findOne({ email });

    //determine if the email is already used
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email is already registered.",
      });
    }

    //hashed password
    const hashedPassword = await hashPassword(password);

    // save account to MongoDB
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    return res.status(201).send({
      success: true,
      message: "Account successfully registered. Please proceed to login.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Registration API",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide your email or password.",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found.",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid username or password.",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    // User Find
    const user = await userModel.findOne({ email });

    // Validation of Password
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 characters long.",
      });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Update User

    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message:
        "Profile updated successfully. Login your accout to save changes.",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in User Update API",
      error,
    });
  }
};

module.exports = {
  requireSignIn,
  registerController,
  loginController,
  updateUserController,
};
