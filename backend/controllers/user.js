const User = require("../models/user");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  try {
    // before sending password, need to bcrypt it
    // but for now, let's it pass
    let user = await User.find({ email: email, password: password });
    console.log(user);

    // if 0, user not found
    if (user.length == 0) {
      return res.status(400).json({
        message: "login fail",
      });
    }

    // found user
    return res.status(200).json({
      message: "login success",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "servr error",
    });
  }
};
