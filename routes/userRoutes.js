const { Router } = require("express");
const router = Router();
const { addUser, loginUser } = require("../controllers/userControllers.js");

router.post("/register", addUser);

router.post("/login", loginUser);

module.exports = router;
