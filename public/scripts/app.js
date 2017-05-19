/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  var tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];
    // function that render tweet to createTweetElement

    function renderTweets(tweets){
      $.each(tweets, function(index, tweet) {
        var $tweet = createTweetElement(tweet)
        $("#tweet-display").prepend($tweet);
      });
    }


    // function that creates tweet element
    function createTweetElement(tweet) {
      // todo create header, body and foot element
      var $tweet = $("<article>").addClass("tweet-box");

      // tweet will be composed of header, body and footer
      // header will include avatar, username and handle
        // Header tag about user:
        var $header = $("<header>");
        $("<img>").addClass("avatar").attr("src", tweet.user.avatars.small).appendTo($header);
        $("<span>").addClass("username").text(tweet.user.name).appendTo($header);
        $("<span>").addClass("handle").text(tweet.user.handle).appendTo($header);

        // Tweet body:
        var $tweetContent = $("<p>").addClass("tweet-input").text(tweet.content.text);

        // Tweet footer:
        var $footer = $("<footer>");
        $("<span>").addClass("tweet-time").text(tweet.created_at).appendTo($footer);
        $("<i>").addClass("fa fa-retweet").appendTo($footer);
        $("<i>").addClass("fa fa-flag").appendTo($footer);
        $("<i>").addClass("fa fa-thumbs-up").appendTo($footer);

        // Append header, tweet content and footer to tweet

        $tweet.append($header, $tweetContent, $footer);

        return $tweet;

    }

    renderTweets(tweetData);
// Prevent browser from redirecting when user click submit button
  var $form = $("form");
  var $contentInput = $form.find("textarea[name=text]");

  $form.submit(function(evt) {
    evt.preventDefault();
    var content = $contentInput.val();
    $.post('/tweets', {
      text: content,
    })
    .success(function(tweet) {
      var $tweet = createTweetElement(tweet);
      $("#tweet-display").prepend($tweet);
      console.log('SUCCESS', tweet);
    })
    .error(function(err) {
      console.log('ERROR', err);
    });

  });














});





























