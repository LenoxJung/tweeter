"use strict";

const ObjectId = require('mongodb').ObjectID;
const simulateDelay = require("./util/simulate-delay");

module.exports = function makeDataHelpers(db) {
  return {

    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    likeTweet: function(id, user, callback) {
      db.collection("tweets").findOne({ _id: ObjectId(id) }).then(function(result) {
        if (result.likes[user.name]) delete result.likes[user.name];
        else result.likes[user.name] = true;
        db.collection("tweets").updateOne({ _id: ObjectId(id) }, { $set: { likes: result.likes } }, callback);
      });
    }
  };
}
