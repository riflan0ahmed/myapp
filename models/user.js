const mongoose = require("mongoose");
const joi = require("joi");
const { min } = require("joi/lib/types/array");

// Mongoose Schema With Validation
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  email: {
    type: String,
    minLength: 5,
    maxLength: 255,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 1024,
    required: true,
  },
});

// Initialize Mongoose Model
const User = mongoose.model("User", userSchema);

// Joi Schema Validation
function validateUser(user) {
  const schema = {
    name: joi.string().min(3).max(50).required(true),
    email: joi.string().email().min(5).max(255).required(true),
    password: joi.string().min(8).max(50).required(true),
  };

  return joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
