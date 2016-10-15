$(window).bind("styleguide:onRendered", function(e) {
  // popover
  $('.modal a').click(function(event){
    event.preventDefault();
    $(this).parent().addClass('is-open');
  });
  $('.modal__overlay').click(function(event){
    event.preventDefault();
    $(this).parent().removeClass('is-open');
  });
});
