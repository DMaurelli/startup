/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
  var Movie = Backbone.Model.extend({
    default:{
	"title":"",
	"year":"",
	"genre":"",
	"description":"",
	"image":""
    }
  });
  
  var movie1 = new Movie({title: 'Resident Evil', year: '2002', genre:'Horror', description:'Zombie movie', image:''});
  var movie2 = new Movie({title:'The Day After Tomorrow', year:'2004', genre:'Climate fiction-disaster', description:'Global warming', image:''});

  var Movies = Backbone.Collection.extend({
    model: Movie
  });

  var movieCollection = [movie1, movie1];
  var movies = new Movies(movieCollection);

  var MovieListView = Backbone.View.extend({
    el: '.content',
      initialize: function(){
      this.render();
    },
    render: function(){
      var source = $('#movie-list').html();
      var template = Handlebars.compile(source);
      var html = template(movies.toJSON());
      this.$el.html(html);
    }
  });

  var moviesListView = new MovieListView();

  console.log(movieCollection);
});