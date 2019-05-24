$(document).ready(function() {

  function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    $tweet.append(
      `<header><img src=${tweet.user.avatars.small}><h2>${tweet.user.name}</h2><span>${tweet.user.handle}</span></header>`
    ).append($("<span>").text(tweet.content.text)).append(`<footer><p>${Math.round((Date.now() - tweet.created_at)/86400000)} days ago</p></footer>`)
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
      .then(function () {
        $('article').replaceWith(loadTweets());
      });
      $(this).find('textarea').val('');
      $(this).find('.error').text('');
      $(this).find('.error').css("visibility", "hidden");
    }
  });

  loadTweets();

  $('#nav-bar').find('button').click(function() {
    $('.new-tweet').slideToggle(function() {
      $(this).find('textarea').focus();
    });
  })

});
