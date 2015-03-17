/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl : 'templates/movieListTemplate.html',
      controller  : 'MainController'
    })
    .when('/movieDetails/:title',{
      templateUrl : 'templates/movieDetails.html',
      controller : 'DetailsController'
    })
    .when('/addMovie',{
      templateUrl: 'templates/addMovieTemplate.html',
      controller : 'AERController'
    })
    .when('/editMovie/:title',{
      templateUrl : 'templates/editTemplate.html',
      controller : 'AERController'
    })
    .when('/removeMovie/:title',{
      templateUrl : '',
      controller : 'AERController'
    })
    .otherwise('/')
    ;
});
  
app.controller('MainController', function($scope){
  $scope.appTitle = "Movies list";
  $scope.saved = localStorage.getItem('movies');
  $scope.movies = (localStorage.getItem('movies')!== '[]') ? JSON.parse($scope.saved) : 
		  [{
		    title: 'Resident Evil', duration:'100 minutes', 
		    release:'March 15, 2002 (United States)', year:'2002', genre:'Horror', 
		    description:"A special military unit fights a powerful, out-of-control supercomputer\n\
				 and hundreds of scientists who have mutated into flesh-eating\n\
				 creatures after a laboratory accident.", 
		    director:'Paul W. S. Anderson',
		    image:'http://www.verannita.com/wp-content/uploads/2014/08/20130202141013Resident_evil_ver4.jpg'
		  },
		  {
		    title: 'Hannibal', duration:'100 minutes',
		    release:'February 23, 2001 (United States)', year: '2001',
		    genre: 'Crime thriller',
		    description:'Living in exile, Hannibal Lecter tries to \n\
				 reconnect with now disgraced FBI agent Clarice \n\
				 Starling and finds himself a target for revenge\n\
				 from a powerful victim.',
		    director:'Ridley Scott',
		    image:'http://upload.wikimedia.org/wikipedia/en/9/9b/Hannibal_movie_poster.jpg'
		  }];
  localStorage.setItem('movies', JSON.stringify($scope.movies));
});

app.controller('DetailsController', function($scope, $routeParams){
  $scope.appTitle = 'details';
  var currentId = $routeParams.title;
  for(var i=0; i<$scope.movies.length; i++){
    if($scope.movies[i].title === currentId){
      $scope.title = $scope.movies[i].title;
      $scope.year = $scope.movies[i].year;
      $scope.duration = $scope.movies[i].duration;
      $scope.genre = $scope.movies[i].genre;
      $scope.release = $scope.movies[i].release;
      $scope.description = $scope.movies[i].description;
      $scope.director = $scope.movies[i].director;
      $scope.image = $scope.movies[i].image;
    }
  };
});

app.controller('AERController', function($scope, $routeParams, $location, $http){
  $scope.appTitle = 'Add/Edit Movie';
  var currentId = $routeParams.title;
  for(var i=0; i<$scope.movies.length; i++){
    if($scope.movies[i].title === currentId){
      $scope.title = $scope.movies[i].title;
      $scope.year = $scope.movies[i].year;
      $scope.duration = $scope.movies[i].duration;
      $scope.genre = $scope.movies[i].genre;
      $scope.release = $scope.movies[i].release;
      $scope.description = $scope.movies[i].description;
      $scope.director = $scope.movies[i].director;
      $scope.image = $scope.movies[i].image;
    }
  };
  
  $scope.addMovie = function(){
    $scope.movies.push({
      title: $scope.title,
      year: $scope.year,
      duration: $scope.duration,
      genre: $scope.genre,
      release: $scope.release,
      description: $scope.description,
      director: $scope.director,
      image: $scope.image
    });
    localStorage.setItem('movies', JSON.stringify($scope.movies));
    $location.path('/');
  };
  
  $scope.editMovie = function(){
    var currentId = $routeParams.title;
    for(var i = 0; i < $scope.movies.length; i++){
      if($scope.movies[i].title === currentId){
	$scope.movies[i].title = $scope.title;
	$scope.movies[i].year = $scope.year;
	$scope.movies[i].duration = $scope.duration;
	$scope.movies[i].genre = $scope.genre;
	$scope.movies[i].release = $scope.release;
	$scope.movies[i].description = $scope.description;
	$scope.movies[i].director = $scope.director;
	$scope.movies[i].image = $scope.image;
	localStorage.setItem('movies', JSON.stringify($scope.movies));
	$location.path('/');
      }
    };
  };
  
  $scope.deleteMovie = function(index){
    var movie = $scope.movies[index];
    $scope.movies.splice(index, 1);
    localStorage.setItem('movies', JSON.stringify($scope.movies));
  };
});