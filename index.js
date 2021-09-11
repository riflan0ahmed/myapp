const mongoose = require("mongoose");
const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const Joi = require("joi");
const { urlencoded } = require("express");
const helmet = require("helmet");
const port = process.env.port || 5000;
const morgan = require("morgan");
const debug = require("debug")("startupDebugger");
const config = require("config");

const home = require("./routes/home");
const courses = require("./routes/courses");
const genres = require("./routes/genres");
const customer = require("./routes/customer");
const user = require("./routes/user");
const auth = require("./routes/auth");

if (!config.get("jwtPrivateKey")) {
  console.log("JWT is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB.."))
  .catch((error) => console.log("Could not connect to MongoDB..", error));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(logger);

app.use("/", home);
app.use("/api/courses", courses);
app.use("/api/genres", genres);
app.use("/api/customers", customer);
app.use("/api/users", user);
app.use("/api/auth", auth);

app.set("view engine", "pug");
app.set("views", "./views");

console.log("Application Name" + config.get("name"));
console.log("Mail Server Name" + config.get("mail.host"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

app.listen(port, () => console.log("Listening to the port 5000"));
