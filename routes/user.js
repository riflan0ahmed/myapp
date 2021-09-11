const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

// Get All Users
router.get("/", async (req, res) => {
  const user = await User.find();

  if (!user) return res.status(404).send("The Users are not found");

  res.send(user);
});

// Get User By Id
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(4004).send("The User Id is not found");

  res.send(user);
});

// Create A User
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("The Email already exists");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

// Update A User
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  );

  res.send(user);
});

// Delete A User
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send("The User Is is not found");

  res.send(user);
});

module.exports = router;
