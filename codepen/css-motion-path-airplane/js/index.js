/* Only in Chrome */


/* Inspiration from https://dribbble.com/shots/2508561-Invitation-Sent */

$('svg').click(function(){
    $('.wrapper').toggleClass('active'); 
    if($('.wrapper').hasClass('active')) {
      $(this).fadeOut(1000);
      $('h2').delay(1000).fadeIn(100);
    }   
});

$('button').click(function(){
    $('svg').fadeIn(300);
  if($('.wrapper').hasClass('active')) {
      $('.wrapper').removeClass('active');
    $('h2').fadeOut(250);
    }   
});