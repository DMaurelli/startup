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
  
  var MovieCollection = Backbone.Collection.extend({
    model: Movie
  });
  
  var movie1 = new Movie({title: 'Resident Evil', year: '2002', genre:'Horror', description:'Zombie movie', image:''});
  var movie2 = new Movie({title:'The Day After Tomorrow', year:'2004', genre:'Climate fiction-disaster', description:'Global warming', image:''});

  console.log(new MovieCollection([movie1, movie2]));
});