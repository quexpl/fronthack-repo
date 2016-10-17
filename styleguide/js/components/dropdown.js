$(window).bind("styleguide:onRendered", function(e) {
  // dropdown
  $('.dropdown a').click(function(event){
    event.preventDefault();
    $(this).parent().addClass('is-open');
  });
  $('.dropdown__overlay').click(function(event){
    event.preventDefault();
    $(this).parent().removeClass('is-open');
  });
});
