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
  model: Movie
});

var movie1 = new Movie({title: 'Resident Evil', year: '2002', genre:'Horror', description:'Zombie movie', image:'http://www.verannita.com/wp-content/uploads/2014/08/20130202141013Resident_evil_ver4.jpg'});
var movie2 = new Movie({title:'The Day After Tomorrow', year:'2004', genre:'Climate fiction-disaster', description:'Global warming', image:'http://ecx.images-amazon.com/images/I/51JSE1F1G9L._SY300_.jpg'});

var movieCollection = new Movies([movie1, movie2]);

var MovieView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#movie-list').html()),
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
  }
});


var MoviesView = Backbone.View.extend({
  tagName: 'ul',
  initialize: function(){
    this.collection;
  },
  render: function(){
    var source = $('#movie-list').html();
    var template = Handlebars.compile(source);
    movieCollection.forEach(function(model){
      var data = {movies:[
	  {title: model.get('title'), year: model.get('year'), 
	    genre: model.get('genre'), description: model.get('description'),
	  image: model.get('image')}
      ]};
      $("#content").append(template(data));
    });
  }
});

var moviesView = new MoviesView({collection: movieCollection});
moviesView.render();

$(function(){
  
});