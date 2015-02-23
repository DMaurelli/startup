/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function movieObserver(){
  this.movieObserver = [];
}

movieObserver.prototype.add = function(observer){
  return this.movieObserver.push(observer);
};

movieObserver.prototype.count = function(){
  return this.movieObserver.length;
};

movieObserver.prototype.get = function(index){
  if(index > -1 && index < this.movieObserver.length){
    return this.movieObserver[index];
  }
};

movieObserver.prototype.indexOf = function(observer, start){
  var i = start;
  while(i < this.movieObserver.length){
    if(this.movieObserver[i] === observer){
      return i;
    }
    i++;
  }
  return -1;
};

movieObserver.prototype.removeAt = function(index){
  this.movieObserver.splice(index, 1);
};

function movie(hashmap, title){
  this.hashmap = hashmap;
  this.title = title;
  this.movieObservers = new movieObserver();
}

movie.prototype.play = function(){
  
};

movie.prototype.stop = function(){
  
};

movie.prototype.set = function(attr, value){
  this[attr] = value;
};

movie.prototype.get = function(attr){
  return this[attr];
};

movie.prototype.addObserver = function(observer){
  this.movieObservers.add(observer);
};

movie.prototype.removeObserver = function(observer){
  this.movieObservers.removeAt(this.movieObservers.indexOf(observer,0));
};

movie.prototype.notify = function(context){
  var observerCount = this.movieObservers.count();
  for(var i=0; i < observerCount; i++){
    this.movieObservers.get(i).update(context);
  }
};

var movie1 = new movie("0","Resident Evil");
var movie2 = new movie("1","The Day After Tomorrow");

