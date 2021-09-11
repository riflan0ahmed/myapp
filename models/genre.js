const mongoose = require("mongoose");
const joi = require("joi");

// Genre Mongoose Model with Schema Validation
const Genre = new mongoose.model(
  "Genre",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
  })
);

// Course Validations
function validateGenre(course) {
  const schema = {
    name: joi.string().min(3).required(),
  };

  return joi.validate(course, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;
