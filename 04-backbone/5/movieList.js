/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var Movie = Backbone.Model.extend({
  default:{
      id:'',
      title:'',
      duration:'',
      release:'',
      year:'',
      genre:'',
      description:'',
      director:'',
      actors:[],
      image:''
  }
});

var Movies = Backbone.Collection.extend({
  model: Movie,
  localStorage: new Backbone.LocalStorage("movies-backbone")
});

var MovieView = Backbone.View.extend({
  el: '#movie-details',
  render: function(){
    var source = $('#movie-details-template').html();
    var template = Handlebars.compile(source);
    var html = template(this.model.toJSON());
    this.$el.html(html);
  }
});

var MoviesView = Backbone.View.extend({
  el: '#movie-list',
  render: function(){
    var source = $('#movie-list-template').html();
    var template = Handlebars.compile(source);
    var html = template(this.collection.toJSON());
    this.$el.html(html);
  }
});

var CreateMovieView = Backbone.View.extend({
  el: '#add-movie',
  render: function(){
    var source = $('#addMovie-template').html();
    var template = Handlebars.compile(source);
    var html = template();
    this.$el.html(html);
  },
  events:{
    'submit form' : 'addMovie'
  },
  addMovie: function(){
    var movie = new Movie({
      name: $(this.$el.find('#form')).find('#name').val()
    });
  }
});

var movie1 = new Movie({id:'1', title: 'Resident Evil', duration:'100 minutes', 
  release:'March 15, 2002 (United States)', year:'2002', genre:'Horror', 
  description:"A special military unit fights a powerful, out-of-control supercomputer\n\
	       and hundreds of scientists who have mutated into flesh-eating\n\
	       creatures after a laboratory accident.", 
  director:'Paul W. S. Anderson',
  actors:['Milla Jovovich',' Michelle Rodriguez'],
  image:'http://www.verannita.com/wp-content/uploads/2014/08/20130202141013Resident_evil_ver4.jpg'});

var movie2 = new Movie({id:'2', title:'The Day After Tomorrow', duration:'124 minutes',
  release:'May 26, 2004 (United States)', year:'2004', genre:'Climate fiction-disaster',
  description:'Jack Hall, paleoclimatologist, must make a daring trek across America\n\
	       to reach his son, trapped in the cross-hairs of a sudden\n\
	       international storm which plunges the planet into a new Ice Age.',
  director:'Roland Emmerich',
  actors:['Dennis Quaid',' Jake Gyllenhaal'],
  image:'http://ecx.images-amazon.com/images/I/51JSE1F1G9L._SY300_.jpg'});

var movieCollection = new Movies([movie1, movie2]);

var Route = Backbone.Router.extend({
  routes:{
    '' : 'default',
    'movieDetails/:id': 'movieDetail',
    'addMovie' : 'addMovie',
    'editMovie/:id' : 'editMovie',
    'removeMovie/:id' : 'removeMovie'
  },
  default: function(){
    var moviesView = new MoviesView({collection: movieCollection});
    moviesView.render();
  },
  movieDetail: function(id){
    var movie = movieCollection.get(id);
    var movieView = new MovieView({model: movie});
    movieView.render();
  },
  addMovie: function(){
    var create = new CreateMovieView();
    create.render();
  },
  editMovie: function(id){
    var movie = movieCollection.get(id);
    var create = new CreateMovieView({model: movie});
    create.render();
  },
  removeMovie: function(id){
    var movie = movieCollection.get(id);
    movie.destroy();
    this.navigate('', true);
  }
});
new Route();
Backbone.history.start();