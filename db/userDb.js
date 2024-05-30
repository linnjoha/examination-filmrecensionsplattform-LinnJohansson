const { User } = require("../models/userModel");
//adds user to db

const addNewUser = async (username, password, email, role) => {
  const newUser = new User({
    username: username,
    password: password,
    email: email,
    role: role,
  });
  return await newUser.save(newUser);
};
//search for specific user
const findUser = async (username) => {
  return await User.findOne({ username: username });
};

module.exports = { addNewUser, findUser };
