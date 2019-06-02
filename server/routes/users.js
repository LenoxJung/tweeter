"use strict";

const md5 = require('md5');
const express      = require('express');
const usersRoutes  = express.Router();

module.exports = function(UserHelpers) {

  usersRoutes.post("/", function(req, res) {
    if (req.body.handle) {
      const avatars = {
        small:   `https://vanillicon.com/${md5(req.body.handle)}_50.png`,
        regular: `https://vanillicon.com/${md5(req.body.handle)}.png`,
        large:   `https://vanillicon.com/${md5(req.body.handle)}_200.png`
      };
      const user = { name: req.body.name, handle: req.body.handle, password: req.body.password, avatars: avatars };
      UserHelpers.register(user, (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
        }
        else {
          req.session["user"] = { id: result.insertedId, name: req.body.name, handle: req.body.handle, avatars: avatars };
          res.status(201).send();
        }
      });
    } else {
      const user = { name: req.body.name, password: req.body.password };
      UserHelpers.login(user, (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          req.session["user"] = { id: result._id, name: result.name, handle: result.handle, avatars: result.avatars };
          res.status(200).send();
        }
      });
    }
  });

  usersRoutes.get("/", function(req, res) {
    req.session = null;
    res.status(200).send();
  });

  return usersRoutes;

}
