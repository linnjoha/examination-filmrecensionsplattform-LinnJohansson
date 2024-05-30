const { User } = require("../models/userModel");
const mongoose = require("mongoose");
const { isTokenValid } = require("../utils/jwt");

const { ObjectId } = mongoose.Types;

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

//check to see if user is valid as a loggedin admin
const isUserAuth = async (token) => {
  const validToken = isTokenValid(token);
  if (!validToken) {
    return false;
  }
  const user = await findUser(validToken.id);
  if (!user || user.role === "User") {
    return false;
  }

  return user;
};

module.exports = { addNewUser, findUser, isUserAuth };
