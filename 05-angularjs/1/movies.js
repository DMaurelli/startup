/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var app = angular.module('app', []);

app.controller('MovieController', function($scope){
  
  $scope.appTitle = "Movies list";
  $scope.saved = localStorage.getItem('movies');
  $scope.movies = (localStorage.getItem('movies')!==null) ? JSON.parse($scope.saved) : 
		  [{
		    title: 'Resident Evil',
		    year: '2001',
		    genre: 'Horror',
		    description: 'A special military unit fights a powerful, \n\
				  out-of-control supercomputer and hundreds of \n\
				  scientists who have mutated into flesh-eating \n\
				  creatures after a laboratory accident.',
		    image: 'http://upload.wikimedia.org/wikipedia/en/archive/a/a1/20130202141013!Resident_evil_ver4.jpg'
		  },
		  {
		    title: 'Hannibal',
		    year: '2001',
		    genre: 'Crime thriller',
		    description:'Living in exile, Hannibal Lecter tries to \n\
				 reconnect with now disgraced FBI agent Clarice \n\
				 Starling and finds himself a target for revenge\n\
				 from a powerful victim.',
		    image:'http://upload.wikimedia.org/wikipedia/en/9/9b/Hannibal_movie_poster.jpg'
		  }];
  localStorage.setItem('movies', JSON.stringify($scope.movies));

});