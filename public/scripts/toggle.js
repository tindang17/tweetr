$(document).ready(function() {
  $(".compose-tweet").click(function() {
    $(document).scrollTop(0);
    $(".new-tweet").slideToggle('slow', () => $("textarea").focus());
  });
})