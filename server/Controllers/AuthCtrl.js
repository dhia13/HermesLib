const User = require("../Models/User");
const generateToken = require("../middleware/jwt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { name, password, email } = req.body;
      // email Validation
      const validate = validateEmail(email);
      if (!validate)
        return res.status(409).json({ msg: "Email Invalid", success: false });
      // Check if email exists
      const user_email = await User.findOne({ email });
      if (user_email)
        return res
          .status(409)
          .json({ msg: "Email Already Taken", success: false });
      // check password Strenght
      if (password.length < 6)
        return res
          .status(422)
          .json({ msg: "password too weak", success: false });
      // Save User
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
      res.status(200).json({
        msg: "Account registered!",
        success: true,
        data: {
          tokens: {
            accessToken: generateToken(
              newUser._id,
              newUser.role,
              process.env.ACCESS_TOKEN_SECRET,
              "15m"
            ),
            refreshToken: generateToken(
              newUser._id,
              newUser.role,
              process.env.REFRESH_TOKEN_SECRET,
              "30d"
            ),
          },
          role: newUser.role,
          name: newUser.name,
          id: newUser._id,
          picture: newUser.picture,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message, success: false });
    }
  },
  checkEmailAvailability: async (req, res) => {
    try {
      const email = req.body.email;
      const validate = validateEmail(email);
      if (!validate)
        return res.status(409).json({ msg: "Email Invalid", success: false });
      else {
        const check = await User.findOne({ email });
        if (check)
          return res
            .status(409)
            .json({ msg: "This email already exists.", success: false });
        else
          return res
            .status(200)
            .json({ msg: "Email available", success: true });
      }
    } catch (error) {
      return res.status(500).json({ msg: err.message, success: false });
    }
  },
  login: async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({ email });
      if (user) {
        const match = await user.matchPassword(password);
        if (match) {
          res.status(200).json({
            msg: "User Logged in!",
            success: true,
            tokens: {
              accessToken: generateToken(
                user._id,
                user.role,
                process.env.ACCESS_TOKEN_SECRET,
                "15m"
              ),
              refreshToken: generateToken(
                user._id,
                user.role,
                process.env.REFRESH_TOKEN_SECRET,
                "30d"
              ),
            },
            role: user.role,
            name: user.name,
            id: user._id,
            picture: user.picture,
          });
        }
      } else {
        res.status(401).json({ success: false, msg: "wrong credentials" });
      }
    } catch (error) {
      res.status(500).json({ success: false, msg: error.messages });
    }
  },
  checkTokens: async (req, res) => {
    try {
      const refreshtoken = req.body.refreshToken;
      const decodedRefreshToken = jwt.verify(
        refreshtoken,
        process.env.REFRESH_TOKEN_SECRET
      );
      if (decodedRefreshToken) {
        const userData = await User.findById(decodedRefreshToken.id);
        res.status(200).json({
          accessToken: generateToken(
            decodedRefreshToken.id,
            decodedRefreshToken.role,
            process.env.ACCESS_TOKEN_SECRET,
            "15m"
          ),
          role: userData.role,
          name: userData.name,
          id: decodedRefreshToken._id,
          picture: userData.picture,
          success: true,
          msg: "refreshToken Valid access Token refreshed",
        });
      } else {
        res.status(200).json({
          success: false,
          msg: "token expired",
        });
      }
    } catch {
      res.status(401).json({ Msg: "Token Expired reLogin ", success: false });
    }
  },
};
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = authCtrl;
