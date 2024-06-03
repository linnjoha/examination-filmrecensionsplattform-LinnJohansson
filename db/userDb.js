const { User } = require("../models/userModel");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

//adds user to db
const addNewUser = async (username, password, email, role) => {
  const newUser = new User({
    username: username,
    password: password,
    email: email,
    role: role,
  });
  return await newUser.save();
};

//search for specific user with username or id
const findUser = async (user) => {
  let query;
  if (ObjectId.isValid(user)) {
    query = {
      $or: [{ username: user }, { _id: new ObjectId(user) }],
    };
  } else {
    query = { username: user };
  }

  return await User.findOne(query);
};

module.exports = { addNewUser, findUser };
