const passport = require("passport");
const User = require("../modals/UsersSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var cookieParser = require("cookie-parser");
require("dotenv").config();
exports.signup_get = (req, res) => {
  res.render("signup");
};

exports.signup_post = async (req, res) => {
  let { username, email, psw, isAdmin, googleId } = req.body;
  const saltRounds = 10;
  // generate salt
  const salt = await bcrypt.genSalt(saltRounds);
  // hash password with salt
  const hashedPsw = await bcrypt.hash(req.body.psw, salt);
  // const user = new User({ username, email, psw: hashedPsw, isAdmin, googleId });
  try {
    const user = new User({
      username,
      email,
      psw: hashedPsw,
      isAdmin,
      googleId,
    });
    const response = await User.create({
      username,
      email,
      psw: hashedPsw,
      isAdmin,
      googleId,
    });
    if (response.status === "ok") {
      res.cookie("token", token, {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
      }); // maxAge: 2 hours
    } else {
      res.json(response);
    }
    // return res.send({ status: 200, msg: "Signed up!" });
  } catch (error) {
    console.log(JSON.stringify(error));
    if (error.code === 11000) {
      return res.send({ status: "error", error: "user already exists" });
    }
    throw error;
  }
  // try {
  //   const userRecord = await User.find();
  //   console.log(userRecord);
  //   for (let i = 0; i < userRecord.length; i++) {
  //     console.log(userRecord[i].username);
  //     if (username == userRecord[i].username || email == userRecord[i].email) {
  //       console.log("This account username or email already exists.");
  //       res.status(404).json({
  //         message: "This account username or email already exists.",
  //       });
  //       return;
  //     }
  //   }
  //   await user.save();
  //   // res.redirect("/api/user/login");
  //   res.status(201).json({
  //     success: true,
  //     message: "registered successfully",
  //     user,
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.render("signup", { error });
  // }
};
const verifyUser = async (email, psw) => {
  try {
    const user = await User.findOne({ email }).lean();
    console.log(user.psw, " user psw");
    console.log(psw);
    if (!user) {
      return { status: "error", error: "user not found" };
    }
    if (await bcrypt.compare(psw, user.psw)) {
      token = jwt.sign(
        { id: user._id, username: user.email, type: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );
      user.psw = null;
      return { status: "ok", data: token, user };
    }
    return { status: "error", error: "invalid password" };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "timed out" };
  }
};
exports.login = async (req, res) => {
  try {
    console.log(req.body, " req.body");
    const { email, psw } = req.body;
    // const email = req.body.email;
    // const psw = req.body.password;
    console.log(email, "email in login function");
    console.log(psw, " psw in login funciton");
    const response = await verifyUser(email, psw);
    console.log(response);
    if (response.status == "ok") {
      console.log("generating token");
      res.cookie("token", token, {
        maxAge: 2 * 60 * 60 * 1000,
        httpOnly: true,
      }); // maxAge: 2 hours
      // console.log(res);

      res.status(200).json({
        success: true,
        message: "Logged in",
        response,
      });
    } else {
      res.json(response);
      console.log("not generating token");
    }
  } catch (e) {
    console.log(e.message);
  }

  // return token;
  // try {
  //   const user = await User.findOne({ username: username });
  //   if (!user) {
  //     return res.status(401).json({ message: "Invalid username or password" });
  //   }

  //   const isMatch = await bcrypt.compare(password, user.psw);
  //   if (!isMatch) {
  //     return res.status(401).json({ message: "Invalid username or password" });
  //   }

  //   const token = jwt.sign(
  //     { userId: user._id, username: user.username },
  //     process.env.JWT_SECRET,
  //     { expiresIn: "1h" }
  //   );

  //   res.status(200).json({
  //     success: true,
  //     message: "Logged in successfully",
  //     token,
  //     user: { id: user._id, username: user.username },
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({
  //     message: error,
  //   });
  // }
};
const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (verify.type === "user") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(JSON.stringify(error), "error");
    return false;
  }
};
// exports.loggedIn = async (req, res) => {
//   const { tokens } = req.cookie;
//   console.log(req.cookies);
//   if (verifyToken(tokens)) {
//     res.status(201).json({
//       success: true,
//       message: "logged in",
//     });
//   } else {
//     res.status(404).json({
//       message: "failed!",
//     });
//   }
// };

exports.loggedIn = async (req, res) => {
  const { token } = req.cookies || {}; // Set a default value of an empty object if req.cookies is undefined
  const wrongToken = "I am a wrong token for testing";
  console.log("token from loggedIn function", token);
  if (token && verifyToken(token)) {
    res.status(201).json({
      success: true,
      message: "logged in",
    });
  } else {
    res.status(404).json({
      message: "failed!",
    });
  }
};

// exports.login_get = (req, res) => {
//   res.render("login");
// };

// exports.login_post = passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/login",
// });

exports.google_get = passport.authenticate("google", {
  scope: ["profile", "email"],
});

exports.google_callback = passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login",
});

exports.logout_get = (req, res) => {
  req.logout();
  res.redirect("/");
};
