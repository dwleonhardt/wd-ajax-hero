(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  var userInput = $('#search').val();
  var input = $('input');
  $('input:text').click(
    function(){
        $(this).val('');
        movies.length = 0;

    });
  var submit = $('button');
  submit.on('click', function(event) {
    var userInput = $('#search').val();
    var $getDat = $.getJSON(`http://www.omdbapi.com/?s=${userInput}`);
    event.preventDefault();
    $getDat.done(function(data){
      var info = data.Search;
      // console.log(data);
      for (var i = 0; i < info.length; i++) {
        // console.log(movie);
        var imdb = info[i].imdbID;
        // console.log(imdb);
        var $getMore = $.getJSON(`http://www.omdbapi.com/?i=${imdb}`);
        $getMore.done(function(more) {
          console.log(more);
          var movie = {
            id : more.imdbID,
            poster : more.Poster,
            title : more.Title,
            year : more.Year,
            plot: more.Plot
          };
          movies.push(movie);
          renderMovies();
        });

      }
    });
  });
})();
