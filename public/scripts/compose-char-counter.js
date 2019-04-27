$(document).ready(function() {
  $("textarea[name='text']").on('input', function() {
    const counter = $(this).parent().find('.counter')
    counter.text(140 - parseInt($(this).val().length));
    counter.text() < 0 ? counter.css("color", "red") : counter.css("color", "#244751")
  });
});
