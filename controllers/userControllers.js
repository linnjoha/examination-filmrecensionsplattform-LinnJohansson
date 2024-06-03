const { addNewUser, findUser } = require("../db/userDb");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { createToken } = require("../utils/jwt");

const addUser = async (req, res) => {
  const { username, password, confirmedPassword, email, role } = req.body;
  try {
    if (password != confirmedPassword) {
      return res
        .status(400)
        .json({ succes: false, message: "not a matching password" });
    }
    const isThereAUser = await findUser(username);
    if (isThereAUser) {
      return res
        .status(400)
        .json({ succes: false, message: "username already taken" });
    }
    //if no existing user by given username =>hash password
    const hashedPassword = await hashPassword(password);

    const newUser = await addNewUser(username, hashedPassword, email, role);
    console.log(newUser);
    return res.status(201).json({ succes: true, user: newUser.username });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  //first se if username and password is valid
  try {
    const user = await findUser(username);
    if (!user) {
      return res
        .status(400)
        .json({ succes: false, message: "no user by given username" });
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ succes: false, message: "wrong password" });
    }
    //if valid user and password correct, create token
    const token = createToken(user._id);
    res
      .status(200)
      .json({ sucess: true, message: "You are now logged in", token: token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = { addUser, loginUser };
