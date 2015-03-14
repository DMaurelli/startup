/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = {
  
};

app.Movie = Backbone.Model.extend({
  default:{
      id:'',
      title:'',
      duration:'',
      release:'',
      year:'',
      genre:'',
      description:'',
      director:'',
      image:''
  }
});

app.Movies = Backbone.Collection.extend({
  model: app.Movie,
  localStorage: new Backbone.LocalStorage("movies-backbone")
});

app.MovieView = Backbone.View.extend({
  el: '#app-movies-content',
  render: function(){
    var source = $('#movie-details-template').html();
    var template = Handlebars.compile(source);
    var html = template(this.model.toJSON());
    this.$el.html(html);
  },
  events:{
    'click #backButton' : 'goBack'
  },
  goBack: function(){
    app.Routes.navigate('', {trigger: true});
  }
});

app.MoviesView = Backbone.View.extend({
  el: '#app-movies-content',
  render: function(){
    var source = $('#movie-list-template').html();
    var template = Handlebars.compile(source);
    var html = template(this.collection.toJSON());
    this.$el.html(html);
  }
});

app.CreateMovieView = Backbone.View.extend({
  el: '#app-movies-content',
  render: function(){
    var source = $('#addMovie-template').html();
    var template = Handlebars.compile(source);
    var html = template();
    this.$el.html(html);
  },
  events:{
    'click #back' : 'goBack',
    'submit form' : 'save'
  },
  goBack: function(){
    app.Routes.navigate('', {trigger: true});
  },
  save: function(){
    var movie = new app.Movie({
      title: $(this.$el.find("form")).find("#title").val(),
      duration:$(this.$el.find("form")).find("#duration").val(),
      release:$(this.$el.find("form")).find("#release").val(),
      year:$(this.$el.find("form")).find("#year").val(),
      genre:$(this.$el.find("form")).find("#genre").val(),
      description:$(this.$el.find("form")).find("#description").val(),
      director:$(this.$el.find("form")).find("#director").val(),
      image:$(this.$el.find("form")).find("#image").val()
      
    });
    app.movieCollection.add(movie);
    movie.save();
    console.log(movie);
    app.Routes.navigate('', {trigger: true});
  }
});

app.EditMovieView = Backbone.View.extend({
  el: '#app-movies-content',
  render: function(){
    var source = $('#addMovie-template').html();
    var template = Handlebars.compile(source);
    var html = template(this.model.toJSON()); 
    this.$el.html(html);
  },
  events:{
    'click #back' : 'goBack',
    'click #save' : 'save'
  },
  goBack: function(){
    app.Routes.navigate('', {trigger: true});
  },
  save: function(){
    this.model.set({
      title: $(this.$el.find("form")).find("#title").val(),
      duration:$(this.$el.find("form")).find("#duration").val(),
      release:$(this.$el.find("form")).find("#release").val(),
      year:$(this.$el.find("form")).find("#year").val(),
      genre:$(this.$el.find("form")).find("#genre").val(),
      description:$(this.$el.find("form")).find("#description").val(),
      director:$(this.$el.find("form")).find("#director").val(),
      image:$(this.$el.find("form")).find("#image").val()
    });
    this.model.save();
    app.Routes.navigate('', {trigger: true});
  }
});

app.movieCollection = new app.Movies();
app.movieCollection.fetch();

if(!app.movieCollection.length){
  var movie1 = new app.Movie({title: 'Resident Evil', duration:'100 minutes', 
  release:'March 15, 2002 (United States)', year:'2002', genre:'Horror', 
  description:"A special military unit fights a powerful, out-of-control supercomputer\n\
	       and hundreds of scientists who have mutated into flesh-eating\n\
	       creatures after a laboratory accident.", 
  director:'Paul W. S. Anderson',
  image:'http://www.verannita.com/wp-content/uploads/2014/08/20130202141013Resident_evil_ver4.jpg'});

var movie2 = new app.Movie({title:'The Day After Tomorrow', duration:'124 minutes',
  release:'May 26, 2004 (United States)', year:'2004', genre:'Climate fiction-disaster',
  description:'Jack Hall, paleoclimatologist, must make a daring trek across America\n\
	       to reach his son, trapped in the cross-hairs of a sudden\n\
	       international storm which plunges the planet into a new Ice Age.',
  director:'Roland Emmerich',
  image:'http://ecx.images-amazon.com/images/I/51JSE1F1G9L._SY300_.jpg'});

app.movieCollection.add(movie1);
app.movieCollection.add(movie2);
movie1.save();
movie2.save();
}

app.Route = Backbone.Router.extend({
  routes:{
    '' : 'default',
    'movieDetails/:id': 'movieDetail',
    'addMovie' : 'addMovie',
    'editMovie/:id' : 'editMovie',
    'removeMovie/:id' : 'removeMovie'
  },
  default: function(){
    console.log(app.movieCollection);
    var moviesView = new app.MoviesView({collection: app.movieCollection});
    moviesView.render();
    console.log(app.movieCollection);
  },
  movieDetail: function(id){
    var movie = app.movieCollection.get(id);
    var movieView = new app.MovieView({model: movie});
    movieView.render();
  },
  addMovie: function(){
    var create = new app.CreateMovieView();
    create.render();
  },
  editMovie: function(id){
    var movie = app.movieCollection.get(id);
    console.log(movie);
    var create = new app.EditMovieView({model: movie, collection: app.movieCollection});
    create.render();
  },
  removeMovie: function(id){
    var movie = app.movieCollection.get(id);
    movie.destroy();
    app.movieCollection.remove();
    this.navigate('', true);
  }
});
app.Routes = new app.Route();
Backbone.history.start();