const User = require("../models/userModel");
// const http=require("http")
const jwt = require("jsonwebtoken")

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure:true,
    httpOnly: true
  };
  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};


async function signup(req, res, next) {
  const { name, email, password, passwordConfirm, active } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ error: "user Aleardy Exists!" })
    }
    const newUser = new User({ name, email, password, passwordConfirm, active });
    const savedNewUser = await newUser.save();

    createSendToken(savedNewUser, 201, res)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}





async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPass(password, user.password))) {
      return res.status(401).json({ error: "Email or password is not correct" });
    }

    createSendToken(user, 200, res)
  } catch (error) {
    res.status(401).json({ error: "Email or password is not correct" });
  }
}
function logout(req, res) {
  // const user = await User.findOne({ email });
  res.clearCookie("jwt", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.")
};


module.exports = {
  signup, login, logout

}
