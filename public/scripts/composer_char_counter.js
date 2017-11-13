$(document).ready(function(){
  $('.container .new-tweet textarea').keyup(function(){
    const inputLength = $(this).val().length;
    const $counter = $('.new-tweet .counter').text(140 - inputLength);
    if(inputLength <= 140) {
      $counter.css('color', 'black');
    } else {
      $counter.css('color', 'red');
    }
  });
});