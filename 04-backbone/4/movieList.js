/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = {
  
};

app.Movie = Backbone.Model.extend({
  default:{
      title:'',
      duration:'',
      release:'',
      year:'',
      genre:'',
      description:'',
      director:'',
      image:''
  },
  localStorage: new Backbone.LocalStorage("movies-backbone")
});

app.Movies = Backbone.Collection.extend({
  model: app.Movie,
  localStorage: new Backbone.LocalStorage("movies-backbone")
});

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

movie1.save();
movie2.save();
app.movieCollection = new app.Movies();
app.movieCollection.add(movie1);
app.movieCollection.add(movie2);

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

app.Route = Backbone.Router.extend({
  routes:{
    '' : 'default',
    'movieDetails/:id': 'movieDetail',
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
  }
});
app.Routes = new app.Route();
Backbone.history.start();