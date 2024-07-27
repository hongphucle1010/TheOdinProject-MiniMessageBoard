const messageDb = require("../database/messageQueries");
const asyncHandler = require("express-async-handler");

const getMessages = asyncHandler(async (req, res) => {
  const messages = await messageDb.getMessages();
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

const insertMessage = asyncHandler(async (req, res) => {
  const { username, message } = req.body;
  await messageDb.insertMessage(message, username);
  res.redirect("/");
});

module.exports = { getMessages, insertMessage };
