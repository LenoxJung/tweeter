/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //       },
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //       },
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   },
  //   {
  //     "user": {
  //       "name": "Johann von Goethe",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //       },
  //       "handle": "@johann49"
  //     },
  //     "content": {
  //       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //     },
  //     "created_at": 1461113796368
  //   }
  // ];

  function createTweetElement(tweet) {
    let $tweet = $('<article>').addClass('tweet');
    $tweet.append(
      `<header><img src=${tweet.user.avatars.small}><h2>${tweet.user.name}</h2><span>${tweet.user.handle}</span></header>`
    ).append($("<span>").text(tweet.content.text)).append(`<footer><p>${tweet.created_at}</p></footer>`)
    return $tweet;
  }

  function renderTweets(tweets) {
    tweets.forEach((tweet) => {
      $('.tweets').prepend(createTweetElement(tweet));
    });
  }

  // renderTweets(data);

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
