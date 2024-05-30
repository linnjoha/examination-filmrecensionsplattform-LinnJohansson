const jwt = require("jsonwebtoken");

//create token
const createToken = (userid) => {
  return jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: 2000 });
};

//check if the token is valid
const isTokenValid = (token) => {
  const upDatedToken = token.replace("Bearer ", "");
  console.log("updated", upDatedToken);
  return jwt.verify(upDatedToken, process.env.JWT_SECRET);
};

module.exports = { createToken, isTokenValid };
