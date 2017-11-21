/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // function that creates tweet element
  function createTweetElement(tweet) {
    var $tweet = $("<article>").addClass("tweet-box");

    // Tweet header:
    var $header = $("<header></header>");
    $("<img>").addClass("avatar").attr("src", tweet.user.avatars.small).appendTo($header);
    $("<span></span>").addClass("username").text(tweet.user.name).appendTo($header).append("<br>");
    $("<span></span>").addClass("handle").text(tweet.user.handle).appendTo($header);
    // Tweet body:
    var $tweetContent = $("<p>").addClass("tweet-input").text(tweet.content.text);

    // Tweet footer:
    var $footer = $("<footer></footer>");
    var $time = moment(tweet.created_at).fromNow();
    $("<span></span>").addClass("tweet-time").text($time).appendTo($footer);
    $("<i></i>").addClass("fa fa-retweet").appendTo($footer);
    $("<i></i>").addClass("fa fa-flag").appendTo($footer);
    $("<i></i>").addClass("fa fa-thumbs-o-up").addClass("like-button").appendTo($footer);

    // Append header, tweet content and footer to tweet
    $tweet.append($header, $tweetContent, $footer);

    return $tweet;
  }

  function renderTweets(tweets){
    $("#tweet-display").empty();
    $.each(tweets, function(index, tweet) {
      var $tweet = createTweetElement(tweet);
      $("#tweet-display").prepend($tweet);
    });
  }

  var $form = $("form");
  var $contentInput = $form.find("textarea[name=text]");
  $form.submit(function(evt) {
// Prevent browser from redirecting when user click submit button
    evt.preventDefault();
    var content = $contentInput.val();
// form validation
    if(content.length === 0) {
      alert("Your box is empty");
    } else if(content.length > 140) {
      alert("You have exceed character limit");
    } else {
      createNewTweet();
    }
  });
  // Ajax POST request
  function createNewTweet() {
    $.ajax({
      data: $form.serialize(),
      url: "/tweets/",
      method: "POST"
    }).done(loadTweets);
    $contentInput.val("");
  }
  // GET request
  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    }).done(function(data) {
      renderTweets(data);
    });
  }
  loadTweets();

  $(".new-tweet").hide();

  $("#tweet-display").on('click', '.like-button', function() {
    alert('clicked');
  });

});
