const express = require("express");
const router = express.Router();
const messages = require("../data/messageData");

router.use((req, res) => {
  console.log("This is a middleware function for root routes");
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

module.exports = router;
