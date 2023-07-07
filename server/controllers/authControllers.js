const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const UserFence = require("../models/UserFence");
const User = require("../models/UserModel");

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });

    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const securePassword = await bcrypt.hash(password, 10); // 10 is the salt

    const user = await User.create({
      email,
      username,
      password: securePassword,
      connectionKey: { key: "", isValid: false },
      latitude: 0,
      longitude: 0,
      IsLocationValid: false,
    });

    const data = {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    return res.json({ status: true, authToken, username });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({ username });
    if (!user) {
      return res.json({
        status: false,
        msg: "Please login with correct details",
      });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.json({
        status: false,
        msg: "Please login with correct details",
      });
    }

    await User.updateOne(
      { username: user.username },
      {
        $set: {
          IsLocationValid: true,
          connectionKey: { key: "", isValid: false },
        },
      }
    );

    const userFence = UserFence.findOne({ user: user.id });
    if (userFence) {
      await UserFence.updateOne(
        { user: user.id },
        { $set: { fenceLat: [], fenceLon: [], isSafe: true } }
      );
    }

    const data = {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ status: true, authToken, username });
  } catch (error) {
    console.error(error.message);
    res.json({ status: false, msg: "Internal server error occoured" });
  }
};

module.exports.temp = async (req, res, next) => {
  // just to demo a controller using fetchuser middleware
  try {
    res.json({
      username: req.user.username,
      email: req.user.email,
      id: req.user.id,
    });
  } catch (ex) {
    next(ex);
  }
};
