// Purpose: Entry point of the application

// Importing the express module
const express = require("express");
const path = require("path");
require("dotenv").config();
const rootRouter = require("./routes/publicRouter");
const newMessageRouter = require("./routes/newMessageRouter");

// Creating an express application, configurations, and routes
const app = express();
const port = process.env.PORT || 3000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


// Middleware function
app.use((req, res, next) => {
  next();
});

app.use("/new", newMessageRouter);
app.use("/", rootRouter);

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
