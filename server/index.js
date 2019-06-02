"use strict";

const cookieSession = require('cookie-session');
const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieSession({
  keys: ['key1']
}));

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) throw err;
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const UserHelpers = require("./lib/user-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  const usersRoutes = require("./routes/users")(UserHelpers);
  app.use("/tweets", tweetsRoutes);
  app.use("/users", usersRoutes);
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
