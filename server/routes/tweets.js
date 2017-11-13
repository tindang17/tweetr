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
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {

    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
      // like: 0
    };


    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.get("/like", function(req, res) {
    DataHelpers.getLike((err, likes) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(likes);
      }
    });
  });


  tweetsRoutes.post("/like", function(req, res) {
    const like = req.body.like;
    DataHelpers.saveLike(like, (err) => {
      if (err) {
        res.status(500).json({ error: err.message});
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post("/like/delete", function(req, res) {
    DataHelpers.deleteLike(like, (err) => {
      if(err) {
        res.status(500).json({ error: err.message});
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

};
