const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const Joi = require("joi");
const { urlencoded } = require("express");
const helmet = require("helmet");
const port = process.env.port || 5000;
const morgan = require("morgan");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(helmet());

app.use(logger);

const courses = [
  { id: 1, name: "Course 01" },
  { id: 2, name: "Course 02" },
  { id: 3, name: "Course 03" },
  { id: 4, name: "Course 04" },
  { id: 5, name: "Course 05" },
];

// Test API
app.get("/", (req, res) => {
  res.send("Api running successfully");
});

// Get All Courses
app.get("/api/courses", (req, res) => {
  res.send(courses);
});

// Get A Course
app.get("/api/course/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The Id is not found");
  res.send(course);
});

// Create A New Course
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

// Update A Course
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The Id is not found");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

// Delete A Course
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The Id is not found");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// Validations
function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

app.listen(port, () => console.log("Listening to the port 5000"));
