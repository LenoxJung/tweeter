"use strict";

const userHelper    = require("../lib/util/user-helper");

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        res.json({tweets: tweets.sort(sortNewestFirst), user: req.session["user"] || {}});
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.session["user"] ? req.session["user"] : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now(),
      likes: {}
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send({tweet: tweet, user: req.session || {} });
      }
    });
  });

  tweetsRoutes.put("/", function(req, res) {
    DataHelpers.likeTweet(req.body.id, req.session["user"], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        console.log(result);
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}
