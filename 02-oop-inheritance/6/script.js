/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function movieObserver(){
	
}

movieObserver.prototype = {
  play:function(title){
    console.log("Playing " + title);
  },
  stop:function(){
    console.log("Movie stopped");
  }
};

function movie(hashmap, title){
  this.hashmap = hashmap;
  this.title = title;
}

movie.prototype = {
  play:function(){
    movieObserver.play(this.title);
  },
  stop:function(){
    movieObserver.stop();
  },
  set:function(attr, value){
    this[attr] = value;
  },
  get:function(attr){
    return this[attr];
  }
};

var movieObserver = new movieObserver();

var movie1 = new movie("0","Resident Evil");
var movie2 = new movie("1","The Day After Tomorrow");

var terminator = new movie;
terminator.set('title','Terminator');
terminator.play();
terminator.stop();