$(window).bind("styleguide:onRendered", function(e) {
  // popover
  $('.popover a').click(function(event){
    event.preventDefault();
    $(this).parent().addClass('is-open');
  });
  $('.popover__overlay').click(function(event){
    event.preventDefault();
    $(this).parent().removeClass('is-open');
  });
});
