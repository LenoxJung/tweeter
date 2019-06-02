$(document).ready(function() {

  function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    $tweet.append(`
      <header>
        <img src=${tweet.user.avatars.small}>
        <h2>${tweet.user.name}</h2>
        <span>${tweet.user.handle}</span>
      </header>
      <span>${tweet.content.text}</span>
      <footer>
        <p>${Math.round((Date.now() - tweet.created_at)/86400000)} days ago</p>
        <img class=like data-tweet=${tweet._id} src="../images/like.svg" style=cursor:pointer>
      </footer>
    `);
    $tweet.find('.like').click(function() {
      $tweet.find('.like').css("visibility", "visible").css("filter", "opacity(100%)");
    });
    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach((tweet) => {
      $('.tweets').prepend(createTweetElement(tweet));
    });
  }

  function loadTweets() {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (tweets) {
      renderTweets(tweets);
    });
  }

  $('.new-tweet').find('form').submit(function(event) {
    event.preventDefault();
    if ($(this).find('.counter').text() == 140) {
      $(this).find('.error').text("Tweet Cannot be Empty!");
      $(this).find('.error').css("visibility", "visible");
    }
    else if ($(this).find('.counter').text() < 0) {
      $(this).find('.error').text("Tweet Exceeds Character Limit!");
      $(this).find('.error').css("visibility", "visible");
    }
    else {
      $.post('/tweets', $(this).serialize())
      .then(function (tweet) {
        $('.tweets').prepend(createTweetElement(tweet));
      });
      $(this).find('textarea').val('');
      $(this).find('.error').text('');
      $(this).find('.error').css("visibility", "hidden");
    }
  });

  loadTweets();

  $('#nav-bar').find('.compose').click(function() {
    $('.new-tweet').slideToggle(function() {
      $(this).find('textarea').focus();
    });
  });

  $('#nav-bar').find('.login').click(function() {
    $('#login').css('display', 'block');
  });

  $('#login').find('form').submit(function(event) {
    event.preventDefault();
    $('#login').css('display', 'none');
    $.post('/users', $(this).serialize()).then(function (user) {
      $('.login').css('display', 'none');
      $('.register').css('display', 'none');
      $('.logout').css('display', 'block');
      $('.compose').css('display', 'block');
    });
    event.target.name.value = event.target.password.value = '';
  });

  $('#login').click(function(event) {
    if (event.target == this) $('#login').css('display', 'none');
  });


  $('#nav-bar').find('.register').click(function() {
    $('#register').css('display', 'block');
  });

  $('#register').find('form').submit(function(event) {
    event.preventDefault();
    $('#register').css('display', 'none');
    $.post('/users', $(this).serialize()).then(function (user) {
      $('.login').css('display', 'none');
      $('.register').css('display', 'none');
      $('.logout').css('display', 'block');
      $('.compose').css('display', 'block');
    });
    event.target.name.value = event.target.password.value = event.target.handle.value = '';
  });

  $('#register').click(function(event) {
    if (event.target == this) $('#register').css('display', 'none');
  });

  $('.logout').click(function() {
    $.ajax('/users', { method: 'GET' }).then(function() {
      $('.logout').css('display', 'none');
      $('.compose').css('display', 'none');
      $('.login').css('display', 'block');
      $('.register').css('display', 'block');
      $('.new-tweet').css('display', 'none');
    });
  });

});
