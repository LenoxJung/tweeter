"use strict";

const simulateDelay = require("./util/simulate-delay");

module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, function(err) {
        callback(err);
      });
    },

    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection("tweets").find().toArray((err, results) => {
        callback(err, results.sort(sortNewestFirst));
      });
    }

  };
}
