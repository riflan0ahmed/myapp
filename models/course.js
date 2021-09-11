const mongoose = require("mongoose");
const joi = require("joi");

// Mongoose Modal And Schema Validation
const Course = new mongoose.model(
  "Course",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    category: {
      type: String,
      enum: ["web", "mobile", "network"],
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      validate: function (value, callback) {
        return value & (value.length > 0);
      },
      message: "A course at least one tag",
    },
    isPublished: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: function () {
        return this.isPublished;
      },
    },
  })
);

// Validations
function validateCourse(course) {
  const schema = {
    name: joi.string().min(3).max(50).required(),
    category: joi.string().required(),
    author: joi.string().required(),
    tags: joi.required(),
    isPublished: joi.required(),
    price: joi.required(),
  };

  return joi.validate(course, schema);
}

exports.Course = Course;
exports.validate = validateCourse;
