const express = require("express");
const router = express.Router();
const { Course, validate } = require("../models/course");

// Get All Courses
router.get("/", async (req, res) => {
  const courses = await Course.find();

  if (!courses) return res.status(404).send("The Courses are not found");

  res.send(courses);
});

// Get A Course
router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) return res.status(404).send("The Course Id is not found");

  res.send(course);
});

// Create A New Course
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.create({
    name: req.body.name,
    category: req.body.category,
    author: req.body.author,
    tags: req.body.tags,
    isPublished: req.body.isPublished,
    price: req.body.price,
  });

  res.send(course);
});

// Update A Course
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = await Course.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      category: req.body.category,
      author: req.body.author,
      tags: req.body.tags,
      isPublished: req.body.isPublished,
      price: req.body.price,
    },
    { new: true }
  );

  res.send(course);
});

// Delete A Course
router.delete("/:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course) return res.status(404).send("The Course Id is not found");

  res.send(course);
});

module.exports = router;
