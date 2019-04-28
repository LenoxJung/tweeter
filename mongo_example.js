"use strict";

// const MongoClient = require("mongodb").MongoClient;
const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.log(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  // db.collection("tweets").find({}, (err, results) => {
  //
  //   if (err) throw err;
  //
  //   // console.log("find result: ", result);
  //   // console.log("type of find result: ", typeof result);
  //   console.log("for each item yielded by the cursor:");
  //   // results.each((err, item) => console.log(" ", item));
  //   results.toArray((err, resultsArray) => {
  //     if (err) throw err;
  //
  //     console.log("results.toArray:", resultsArray);
  //   });
  //
  //   db.close();
  // });
  // db.collection("tweets").find().toArray((err, results) => {
  //   if (err) throw err;
  //   console.log("results array: ", results);
  //   db.close();
  // });
  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback);
    // db.collection("tweets").find().toArray((err, results) => {
    //   if (err) {
    //     return callback(err);
    //   }
    //   callback(null, tweets);
    // });
  }

  getTweets((err, tweets) => {
    if (err) throw err;
    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });
});
