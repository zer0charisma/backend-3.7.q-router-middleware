const { NODE_ENV = "development" } = process.env;
const express = require("express");
const app = express();

// Middleware
const validateNameLength = require("./utils/validateNameLength");

// Routes
app.get(
  "/hello/:name",
  validateNameLength,
  (req, res, next) => {
    res.send(`Hello, ${req.params.name}!`);
});

app.get(
  "/goodbye/:name",
  validateNameLength,
  (req, res, next) => {
  res.send(`Goodbye, ${req.params.name}.`);
});

// Error handling
app.use((req, res, next) => {
  next("That route could not be found!");
});

app.use((err, req, res, next) => {
  err = err || "Internal server error!";
  res.send(err);
});

module.exports = app;