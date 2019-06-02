"use strict";

module.exports = function makeUserHelpers(db) {
  return {

    login: function(user, callback) {
      db.collection("users").findOne({name: user.name, password: user.password}, callback);
    },

    register: function(user, callback) {
      db.collection("users").insertOne(user, callback);
    }

  };
}
