const express = require("express");
const router = express.Router();
// const messages = require("../data/messageData");
const { getMessages } = require("../controllers/messageController");

router.use(getMessages);

module.exports = router;
