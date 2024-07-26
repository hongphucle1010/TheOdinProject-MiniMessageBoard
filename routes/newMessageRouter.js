const express = require("express");
const router = express.Router();
const messages = require("../data/messageData");

router.use((req, res, next) => {
  console.log("This is a middleware function for new routes");
  next();
});

router.post("/", (req, res) => {
  messages.push({
    text: req.body.text,
    user: req.body.user,
    added: new Date(),
  });
  res.redirect("/");
});

module.exports = router;
