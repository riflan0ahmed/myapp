const express = require("express");
const router = express.Router();

// Test API
router.get("/", (req, res) => {
  // res.send("Api running successfully");
  res.render("index", { title: "Magic", message: "Welcome to world of magic" });
});

module.exports = router;
