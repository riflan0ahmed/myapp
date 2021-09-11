const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

// Joi Schema Validation
function validateUser(user) {
  const schema = {
    email: joi.string().email().min(5).max(255).required(true),
    password: joi.string().min(8).max(50).required(true),
  };

  return joi.validate(user, schema);
}

// Create A User
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  res.send(token);
});

module.exports = router;
