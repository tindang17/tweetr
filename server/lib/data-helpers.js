"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  const tweets = db.collection("tweets");
  return {
    // Saves a tweet to `db`
    saveTweet(newTweet, callback) {
      tweets.insertOne(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets(callback) {
      tweets.find().toArray((err, tweets) => {
        if(err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    }

    // Save tweets likes
  //   saveLike(newLike, callback) {
  //     tweets.update
  //   };
  //
  //   getLike(callback) {
  //
  //   }
  //
  //   deleteLike(like, callback) {
  //
  //   }
  };
};
