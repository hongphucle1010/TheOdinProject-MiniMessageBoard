const express = require("express");
const router = express.Router();
const messages = require("../data/messageData");
const { insertMessage } = require("../controllers/messageController");

router.use((req, res, next) => {
  next();
});

router.post("/", insertMessage);

module.exports = router;
