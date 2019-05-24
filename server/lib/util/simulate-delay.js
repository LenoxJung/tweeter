"use strict";

function someMilliseconds() {
  return Math.floor(Math.random() * 400) + 100;
}

module.exports = function simulateDelay(callback) {
  setTimeout(callback, someMilliseconds());
}
