const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/genre");

// Get All Genres
router.get("/", async (req, res) => {
  const genres = await Genre.find();

  if (!genre) return res.status(404).send("The Genres are not found");

  res.send(genres);
});

// Get A Course
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.param.id);

  if (!genre) return res.status(404).send("The Genre Id is not found");

  res.send(genre);
});

// Create A New Course
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });
  await genre.save();

  res.send(genre);
});

// Update A Course
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!genre) return res.status(404).send("The Genre Id is not found");

  res.send(genre);
});

// Delete A Course
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.param.id);

  if (!genre) return res.status(404).send("The Genre Id is not found");

  res.send(genre);
});

module.exports = router;
