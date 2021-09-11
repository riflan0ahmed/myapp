const mongoose = require("mongoose");
const joi = require("joi");

// Customer Mongoose Model with Schema validation
const Customer = new mongoose.model(
  "Customer",
  mongoose.Schema({
    name: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
    },
    isGold: Boolean,
    phoneNumber: {
      type: String,
      minLength: 5,
      maxLength: 50,
      required: true,
    },
  })
);

// Validation For Customer
function validateCustomer(course) {
  const schema = {
    name: joi.string().min(3).max(50).required(),
    isGold: joi.required(),
    phoneNumber: joi.string().min(5).max(50).required(),
  };

  return joi.validate(course, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
