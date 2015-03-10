/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Movie = Backbone.Model.extend({
  default:{
      title:'',
      year:'',
      genre:'',
      description:'',
      image:''
  }
});

var Movies = Backbone.Collection.extend({
  model: Movie,
  localStorage: new Backbone.LocalStorage("movies-backbone")
});

var movieCollection = new Movies([movie1, movie2]);

var MovieView = Backbone.View.extend({
  
  render: function(){ 
    var source = $('#movie-template').html();
    var template = Handlebars.compile(source);
    var html = template(this.model.toJSON());
    this.$el.html(html);
  }
});

var MoviesView = Backbone.View.extend({
  render: function(){
    var source = $('#movie-list-template').html();
    var template = Handlebars.compile(source);
    var html = template(this.collection.toJSON());
    this.$el.html(html);
  },
  initialize: function(){
    this.collection.on('add', this.render, this);
  }
});

var movies = new Movies();

var movie1 = new Movie({title: 'Resident Evil', year: '2002', genre:'Horror', description:'Zombie movie', image:'http://www.verannita.com/wp-content/uploads/2014/08/20130202141013Resident_evil_ver4.jpg'});
var movie2 = new Movie({title:'The Day After Tomorrow', year:'2004', genre:'Climate fiction-disaster', description:'Global warming', image:'http://ecx.images-amazon.com/images/I/51JSE1F1G9L._SY300_.jpg'});

var movieView = new MovieView({model: movie1});
var moviesView = new MoviesView({collection: movies});


$(document).ready(function(){
  moviesView.$el = $('#movie-list');
  movies.add(movie1);
  movies.add(movie2);
});